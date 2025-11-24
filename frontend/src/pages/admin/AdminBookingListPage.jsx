import { useState, useEffect } from "react";
import AdminBookingFilter from "../../components/admin/bookings/AdminBookingFilter";
import AdminBookingTable from "../../components/admin/bookings/AdminBookingTable";
import Pagination from "../../components/common/Pagination";
import { adminBookingApi } from "../../api/adminBookingApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";

const AdminBookingListPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "error" });
  const [cancelReason, setCancelReason] = useState({ isOpen: false, bookingId: null, reason: "" });

  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await adminBookingApi.getBookings({
        ...filters,
        page: currentPage,
      });
      setBookings(data.bookings || []);
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
    fetchBookings();
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      await adminBookingApi.updateBookingStatus(bookingId, status);
      fetchBookings();
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "상태 변경에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleCancel = async (bookingId) => {
    setCancelReason({ isOpen: true, bookingId, reason: "" });
  };

  const handleCancelConfirm = async () => {
    if (!cancelReason.reason.trim()) {
      setAlertModal({
        isOpen: true,
        message: "취소 사유를 입력해주세요.",
        type: "warning",
      });
      return;
    }

    try {
      await adminBookingApi.cancelBooking(cancelReason.bookingId, cancelReason.reason);
      fetchBookings();
      setCancelReason({ isOpen: false, bookingId: null, reason: "" });
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "취소에 실패했습니다.",
        type: "error",
      });
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchBookings} />;

  return (
    <div className="admin-booking-list-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>예약 관리</h2>
      </div>

      <AdminBookingFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <AdminBookingTable
        bookings={bookings}
        onStatusChange={handleStatusChange}
        onCancel={handleCancel}
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

      {cancelReason.isOpen && (
        <div className="custom-modal-overlay" onClick={() => setCancelReason({ isOpen: false, bookingId: null, reason: "" })}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="custom-modal-title">취소 사유 입력</h3>
            <textarea
              value={cancelReason.reason}
              onChange={(e) => setCancelReason({ ...cancelReason, reason: e.target.value })}
              placeholder="취소 사유를 입력하세요"
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
                onClick={() => setCancelReason({ isOpen: false, bookingId: null, reason: "" })}
              >
                취소
              </button>
              <button
                className="custom-modal-button"
                onClick={handleCancelConfirm}
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

export default AdminBookingListPage;
