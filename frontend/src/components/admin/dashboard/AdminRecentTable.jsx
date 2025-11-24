import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminRecentTable = ({ bookings = [] }) => {
  const recentBookings = bookings.length > 0 
    ? bookings 
    : [
        {
          id: "BK001",
          hotelName: "서울 그랜드 호텔",
          customerName: "홍길동",
          status: "확정",
        },
        {
          id: "BK002",
          hotelName: "부산 해변 리조트",
          customerName: "김영희",
          status: "대기",
        },
      ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "확정":
        return "success";
      case "대기":
        return "warning";
      case "완료":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div className="recent-section">
      <h3>최근 활동</h3>
      <h4 style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "1rem", fontWeight: 500 }}>
        최근 예약
      </h4>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>예약번호</th>
              <th>호텔명</th>
              <th>고객명</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <Link
                    to={`/admin/bookings/${booking.id}`}
                    style={{ color: "#7FD8BE", textDecoration: "underline" }}
                  >
                    {booking.id}
                  </Link>
                </td>
                <td>{booking.hotelName}</td>
                <td>{booking.customerName}</td>
                <td>
                  <StatusBadge status={booking.status} variant={getStatusVariant(booking.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentTable;
