import { useState, useEffect } from "react";
import { adminStatsApi } from "../../api/adminStatsApi";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import AdminRecentTable from "../../components/admin/dashboard/AdminRecentTable";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminStatsApi.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboardStats} />;

  return (
    <div className="business-dashboard-page">
      <h1 className="page-title">대시보드</h1>

      <AdminStatsCards stats={stats} />
      <AdminChartArea data={stats?.chartData} />

      <div className="recent-activity">
        <h2>최근 활동</h2>
        <AdminRecentTable bookings={stats?.recentBookings || []} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;

