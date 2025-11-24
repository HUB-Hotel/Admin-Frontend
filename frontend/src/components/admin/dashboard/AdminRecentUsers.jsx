import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminRecentUsers = ({ users = [] }) => {
  const recentUsers = users.length > 0 
    ? users 
    : [
        {
          id: 1,
          name: "홍길동",
          email: "hong@example.com",
          type: "일반",
          status: "활성",
          joinDate: "2025-01-05",
        },
        {
          id: 2,
          name: "김영희",
          email: "kim@example.com",
          type: "일반",
          status: "활성",
          joinDate: "2025-02-10",
        },
        {
          id: 3,
          name: "김사장",
          email: "business@example.com",
          type: "사업자",
          status: "활성",
          joinDate: "2025-01-01",
        },
      ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "활성":
        return "success";
      case "비활성":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="recent-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a" }}>최근 회원</h4>
        <Link to="/admin/users" style={{ fontSize: "0.875rem", color: "#7FD8BE", textDecoration: "none" }}>
          전체보기 →
        </Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>유형</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link
                    to={`/admin/users/${user.id}`}
                    style={{ color: "#7FD8BE", textDecoration: "underline" }}
                  >
                    {user.name}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <StatusBadge status={user.status} variant={getStatusVariant(user.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentUsers;

