import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHotelFilter from "../../components/admin/hotels/AdminHotelFilter";
import AdminHotelTable from "../../components/admin/hotels/AdminHotelTable";
import Pagination from "../../components/common/Pagination";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AdminHotelListPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "error" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: "", onConfirm: null });
  const [rejectReason, setRejectReason] = useState({ isOpen: false, hotelId: null, reason: "" });

  useEffect(() => {
    fetchHotels();
  }, [currentPage]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await adminHotelApi.getHotels({
        ...filters,
        page: currentPage,
      });
      setHotels(data.hotels || []);
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
    fetchHotels();
  };

  const handleApprove = async (hotelId) => {
    try {
      await adminHotelApi.approveHotel(hotelId);
      fetchHotels();
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "승인에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleReject = async (hotelId) => {
    setRejectReason({ isOpen: true, hotelId, reason: "" });
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.reason.trim()) {
      setAlertModal({
        isOpen: true,
        message: "거부 사유를 입력해주세요.",
        type: "warning",
      });
      return;
    }

    try {
      await adminHotelApi.rejectHotel(rejectReason.hotelId, rejectReason.reason);
      fetchHotels();
      setRejectReason({ isOpen: false, hotelId: null, reason: "" });
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "거부에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleDelete = async (hotelId) => {
    setConfirmDialog({
      isOpen: true,
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
    try {
      await adminHotelApi.deleteHotel(hotelId);
      fetchHotels();
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
  if (error) return <ErrorMessage message={error} onRetry={fetchHotels} />;

  return (
    <div className="admin-hotel-list-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>호텔 관리</h2>
        <button
          onClick={() => navigate("/admin/hotels/new")}
          className="btn btn-primary"
        >
          호텔 등록
        </button>
        </div>
      </div>

      <AdminHotelFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <AdminHotelTable
        hotels={hotels}
        onApprove={handleApprove}
        onReject={handleReject}
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

      {rejectReason.isOpen && (
        <div className="custom-modal-overlay" onClick={() => setRejectReason({ isOpen: false, hotelId: null, reason: "" })}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="custom-modal-title">거부 사유 입력</h3>
            <textarea
              value={rejectReason.reason}
              onChange={(e) => setRejectReason({ ...rejectReason, reason: e.target.value })}
              placeholder="거부 사유를 입력하세요"
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
                resize: "vertical",
              }}
            />
            <div className="custom-modal-actions">
              <button
                className="custom-modal-button custom-modal-button-outline"
                onClick={() => setRejectReason({ isOpen: false, hotelId: null, reason: "" })}
              >
                취소
              </button>
              <button
                className="custom-modal-button"
                onClick={handleRejectConfirm}
                style={{ backgroundColor: "#7FD8BE" }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHotelListPage;
