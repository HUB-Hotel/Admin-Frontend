import { useState, useEffect } from "react";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import AdminRecentTable from "../../components/admin/dashboard/AdminRecentTable";
import { adminStatsApi } from "../../api/adminStatsApi";
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
  if (error)
    return <ErrorMessage message={error} onRetry={fetchDashboardStats} />;

  return (
    <div className="admin-dashboard-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>대시보드</h2>
      </div>

      <AdminStatsCards stats={stats} />
      <AdminChartArea data={stats?.chartData} />
      <AdminRecentTable
        bookings={stats?.recentBookings || []}
        users={stats?.recentUsers || []}
        reviews={stats?.recentReviews || []}
      />
    </div>
  );
};

export default AdminDashboardPage;
