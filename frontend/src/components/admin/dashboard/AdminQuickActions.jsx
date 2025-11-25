import { Link } from "react-router-dom";
import { HotelIcon, CouponIcon, SettingsIcon } from "../../layout/AdminSidebar";

const AdminQuickActions = () => {
  const quickActions = [
    {
      title: "호텔 관리",
      description: "호텔을 등록하고 관리합니다",
      link: "/admin/hotels",
      icon: <HotelIcon />,
      color: "#7FD8BE",
    },
    {
      title: "쿠폰 관리",
      description: "쿠폰을 생성하고 관리합니다",
      link: "/admin/coupons",
      icon: <CouponIcon />,
      color: "#f59e0b",
    },
    {
      title: "시스템 설정",
      description: "시스템 설정을 관리합니다",
      link: "/admin/settings",
      icon: <SettingsIcon />,
      color: "#64748b",
    },
  ];

  return (
    <div className="quick-actions">
      <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem", color: "#0f172a" }}>
        빠른 작업
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="action-card"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "1.5rem",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <div
                className="action-icon"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: `${action.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: action.color,
                }}
              >
                {action.icon}
              </div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", margin: 0 }}>
                {action.title}
              </h4>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminQuickActions;

