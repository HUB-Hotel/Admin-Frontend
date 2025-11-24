import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminBookingTable = ({ bookings = [], onStatusChange, onCancel }) => {
  const defaultBookings = [
    {
      id: "BK001",
      hotelName: "서울 그랜드 호텔",
      customerName: "홍길동",
      checkIn: "2025-12-01",
      checkOut: "2025-12-03",
      amount: 300000,
      status: "확정",
    },
    {
      id: "BK002",
      hotelName: "부산 해변 리조트",
      customerName: "김영희",
      checkIn: "2025-12-05",
      checkOut: "2025-12-07",
      amount: 400000,
      status: "대기",
    },
    {
      id: "BK003",
      hotelName: "제주 힐링 펜션",
      customerName: "박철수",
      checkIn: "2025-11-20",
      checkOut: "2025-11-22",
      amount: 200000,
      status: "완료",
    },
  ];

  const displayBookings = bookings.length > 0 ? bookings : defaultBookings;

  const getStatusVariant = (status) => {
    switch (status) {
      case "확정":
        return "success";
      case "대기":
        return "warning";
      case "완료":
        return "info";
      case "취소":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>예약번호</th>
            <th>호텔명</th>
            <th>고객명</th>
            <th>체크인</th>
            <th>체크아웃</th>
            <th>금액</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {displayBookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <Link
                  to={`/admin/bookings/${booking.id}`}
                  style={{ color: "#2563eb", textDecoration: "underline" }}
                >
                  {booking.id}
                </Link>
              </td>
              <td>{booking.hotelName}</td>
              <td>{booking.customerName}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.amount?.toLocaleString()}원</td>
              <td>
                <StatusBadge status={booking.status} variant={getStatusVariant(booking.status)} />
              </td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <select
                    value={booking.status}
                    onChange={(e) => onStatusChange && onStatusChange(booking.id, e.target.value)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.75rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="확정">확정</option>
                    <option value="대기">대기</option>
                    <option value="완료">완료</option>
                  </select>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                    onClick={() => onCancel && onCancel(booking.id)}
                  >
                    취소
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingTable;
