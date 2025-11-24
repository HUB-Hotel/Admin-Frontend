import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminRecentHotels = ({ hotels = [] }) => {
  const recentHotels = hotels.length > 0 
    ? hotels 
    : [
        {
          id: 1,
          name: "서울 그랜드 호텔",
          region: "서울",
          status: "승인",
          registrationDate: "2025-01-15",
        },
        {
          id: 2,
          name: "부산 해변 리조트",
          region: "부산",
          status: "승인대기",
          registrationDate: "2025-02-20",
        },
        {
          id: 3,
          name: "제주 힐링 펜션",
          region: "제주",
          status: "승인",
          registrationDate: "2025-03-10",
        },
      ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "승인":
        return "success";
      case "승인대기":
        return "warning";
      case "거부":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="recent-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a" }}>최근 호텔</h4>
        <Link to="/admin/hotels" style={{ fontSize: "0.875rem", color: "#7FD8BE", textDecoration: "none" }}>
          전체보기 →
        </Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>호텔명</th>
              <th>지역</th>
              <th>상태</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {recentHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>
                  <Link
                    to={`/admin/hotels/${hotel.id}/edit`}
                    style={{ color: "#7FD8BE", textDecoration: "underline" }}
                  >
                    {hotel.name}
                  </Link>
                </td>
                <td>{hotel.region}</td>
                <td>
                  <StatusBadge status={hotel.status} variant={getStatusVariant(hotel.status)} />
                </td>
                <td>{hotel.registrationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentHotels;

