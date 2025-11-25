import { RevenueIcon, HotelIcon, UserIcon } from "../../layout/AdminSidebar";

const AdminStatsCards = ({ stats }) => {
  const statCards = [
    {
      title: "총 매출",
      value: `${(stats?.totalRevenue || 12500000).toLocaleString()}원`,
      change: "+8% 전일 대비",
      changeType: "positive",
      icon: <RevenueIcon />,
      iconColor: "#10b981",
    },
    {
      title: "등록된 호텔",
      value: stats?.totalHotels || stats?.activeHotels || 45,
      change: "+2 전일 대비",
      changeType: "positive",
      icon: <HotelIcon />,
      iconColor: "#8b5cf6",
    },
    {
      title: "전체 회원",
      value: stats?.totalUsers || stats?.newMembers || 8,
      change: "+15% 전일 대비",
      changeType: "positive",
      icon: <UserIcon />,
      iconColor: "#f59e0b",
    },
  ];

  return (
    <div className="stats-cards">
      {statCards.map((card, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-title">{card.title}</span>
            <div
              className="stat-icon"
              style={{ backgroundColor: `${card.iconColor}20`, color: card.iconColor }}
            >
              {card.icon}
            </div>
          </div>
          <div className="stat-value">{card.value}</div>
          <div className={`stat-change ${card.changeType}`}>
            {card.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
