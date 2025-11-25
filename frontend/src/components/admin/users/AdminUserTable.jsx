import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const AdminUserTable = ({ users = [], onStatusChange, onDelete }) => {
  const defaultUsers = [
    {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      type: "일반",
      status: "비활성",
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

  const displayUsers = users.length > 0 ? users : defaultUsers;

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
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>유형</th>
            <th>상태</th>
            <th>가입일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
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
              <td>{user.joinDate}</td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <select
                    className="select-action"
                    value={user.status}
                    onChange={(e) => onStatusChange && onStatusChange(user.id, e.target.value)}
                  >
                    <option value="활성">활성</option>
                    <option value="비활성">비활성</option>
                  </select>
                  <button
                    className="btn btn-danger btn-action"
                    onClick={() => onDelete && onDelete(user.id)}
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

export default AdminUserTable;
