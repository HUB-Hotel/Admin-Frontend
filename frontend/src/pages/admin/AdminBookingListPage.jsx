import { useState, useEffect } from "react";
import AdminBookingFilter from "../../components/admin/bookings/AdminBookingFilter";
import AdminBookingTable from "../../components/admin/bookings/AdminBookingTable";
import Pagination from "../../components/common/Pagination";
import { adminBookingApi } from "../../api/adminBookingApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminBookingListPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      alert(err.message || "상태 변경에 실패했습니다.");
    }
  };

  const handleCancel = async (bookingId) => {
    const reason = prompt("취소 사유를 입력하세요:");
    if (!reason) return;

    try {
      await adminBookingApi.cancelBooking(bookingId, reason);
      fetchBookings();
    } catch (err) {
      alert(err.message || "취소에 실패했습니다.");
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
    </div>
  );
};

export default AdminBookingListPage;
