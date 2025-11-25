import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminHotelTable = ({ hotels = [], onApprove, onReject, onDelete }) => {
  const defaultHotels = [
    {
      id: 1,
      name: "서울 그랜드 호텔",
      region: "seoul",
      operator: "김사장",
      status: "승인",
      registrationDate: "2025-01-15",
    },
    {
      id: 2,
      name: "부산 해변 리조트",
      region: "busan",
      operator: "이사장",
      status: "승인대기",
      registrationDate: "2025-02-20",
    },
    {
      id: 3,
      name: "제주 힐링 펜션",
      region: "jeju",
      operator: "박대표",
      status: "승인",
      registrationDate: "2025-03-10",
    },
  ];

  const displayHotels = hotels.length > 0 ? hotels : defaultHotels;

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
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>호텔명</th>
            <th>지역</th>
            <th>사업자</th>
            <th>상태</th>
            <th>등록일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {displayHotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>
                <Link
                  to={`/admin/hotels/${hotel.id}/edit`}
                  style={{ color: "#7FD8BE", textDecoration: "underline" }}
                >
                  {hotel.name}
                </Link>
              </td>
              <td>{hotel.region}</td>
              <td>{hotel.operator}</td>
              <td>
                <StatusBadge status={hotel.status} variant={getStatusVariant(hotel.status)} />
              </td>
              <td>{hotel.registrationDate}</td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {hotel.status === "승인대기" && (
                    <>
                      <button
                        className="btn btn-primary btn-action"
                        onClick={() => onApprove && onApprove(hotel.id)}
                      >
                        승인
                      </button>
                      <button
                        className="btn btn-outline btn-action"
                        onClick={() => onReject && onReject(hotel.id)}
                      >
                        거부
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-danger btn-action"
                    onClick={() => onDelete && onDelete(hotel.id)}
                  >
                    삭제
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

export default AdminHotelTable;
