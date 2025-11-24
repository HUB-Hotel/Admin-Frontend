const AdminStatsCards = ({ stats }) => {
  const statCards = [
    {
      title: "오늘 예약",
      value: stats?.todayBookings || 15,
      change: "+12% 전일 대비",
      changeType: "positive",
      icon: "📅",
      iconColor: "#3b82f6",
    },
    {
      title: "총 매출",
      value: `${(stats?.totalRevenue || 12500000).toLocaleString()}원`,
      change: "+8% 전일 대비",
      changeType: "positive",
      icon: "💰",
      iconColor: "#10b981",
    },
    {
      title: "활성 호텔",
      value: stats?.activeHotels || 45,
      change: "+2 전일 대비",
      changeType: "positive",
      icon: "🏨",
      iconColor: "#8b5cf6",
    },
    {
      title: "신규 회원",
      value: stats?.newMembers || 8,
      change: "+15% 전일 대비",
      changeType: "positive",
      icon: "👥",
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
              style={{ backgroundColor: `${card.iconColor}20` }}
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
