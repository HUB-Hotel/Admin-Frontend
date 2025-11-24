import { useState, useEffect } from "react";
import AdminReviewFilter from "../../components/admin/reviews/AdminReviewFilter";
import AdminReviewTable from "../../components/admin/reviews/AdminReviewTable";
import Pagination from "../../components/common/Pagination";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AdminReviewListPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "error" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: "", onConfirm: null });

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await adminReviewApi.getReviews({
        ...filters,
        page: currentPage,
      });
      setReviews(data.reviews || []);
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
    fetchReviews();
  };

  const handleDelete = async (reviewId) => {
    setConfirmDialog({
      isOpen: true,
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
    try {
      await adminReviewApi.deleteReview(reviewId);
      fetchReviews();
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
  if (error) return <ErrorMessage message={error} onRetry={fetchReviews} />;

  return (
    <div className="admin-review-list-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>리뷰 관리</h2>
      </div>

      <AdminReviewFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <AdminReviewTable reviews={reviews} onDelete={handleDelete} />

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

export default AdminReviewListPage;
