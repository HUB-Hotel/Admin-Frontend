import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { adminInfo, logout } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="header-right">
          <span style={{ marginRight: "1rem", color: "#0f172a" }}>{adminInfo?.name || "관리자"}</span>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: "transparent", 
              border: "none", 
              cursor: "pointer",
              color: "#0f172a",
              fontSize: "0.875rem",
              padding: 0
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
