import { useState, useEffect } from "react";
import AdminUserFilter from "../../components/admin/users/AdminUserFilter";
import AdminUserTable from "../../components/admin/users/AdminUserTable";
import Pagination from "../../components/common/Pagination";
import { adminUserApi } from "../../api/adminUserApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "error" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: "", onConfirm: null });

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminUserApi.getUsers({
        ...filters,
        page: currentPage,
      });
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers();
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await adminUserApi.updateUserStatus(userId, status);
      fetchUsers();
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "상태 변경에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleDelete = async (userId) => {
    setConfirmDialog({
      isOpen: true,
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
    try {
      await adminUserApi.deleteUser(userId);
      fetchUsers();
          setConfirmDialog({ ...confirmDialog, isOpen: false });
    } catch (err) {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
          setAlertModal({
            isOpen: true,
            message: err.message || "삭제에 실패했습니다.",
            type: "error",
          });
    }
      },
    });
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

  return (
    <div className="admin-user-list-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>회원 관리</h2>
      </div>

      <AdminUserFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <AdminUserTable
        users={users}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="삭제 확인"
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm || (() => {})}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </div>
  );
};

export default AdminUserListPage;
