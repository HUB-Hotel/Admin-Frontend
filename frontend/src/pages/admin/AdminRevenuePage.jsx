import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";
import { adminStatsApi } from "../../api/adminStatsApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const PERIOD_OPTIONS = [
  { value: "week", label: "주간" },
  { value: "month", label: "월간" },
  { value: "quarter", label: "분기" },
  { value: "year", label: "연간" },
];

const FALLBACK_CHART = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  revenue: [2000000, 2500000, 2200000, 2800000, 3000000, 3200000],
  bookings: [45, 58, 52, 67, 72, 78],
};

const AdminRevenuePage = () => {
  const [chartData, setChartData] = useState(null);
  const [period, setPeriod] = useState("month");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRevenueData("month");
  }, []);

  const fetchRevenueData = async (nextPeriod) => {
    try {
      if (chartData === null) {
        setLoading(true);
      } else {
        setChartLoading(true);
      }
      setPeriod(nextPeriod);
      const data = await adminStatsApi.getRevenueStats({ period: nextPeriod });
      setChartData(data);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
      setChartLoading(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0,
    }).format(value);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchRevenueData(period)} />;

  const revenueData = chartData || FALLBACK_CHART;
  const labels = revenueData?.labels?.length ? revenueData.labels : FALLBACK_CHART.labels;
  const revenues = revenueData?.revenue?.length ? revenueData.revenue : FALLBACK_CHART.revenue;
  const bookings = revenueData?.bookings?.length ? revenueData.bookings : FALLBACK_CHART.bookings;

  const chartDataFormatted = labels.map((label, index) => ({
    period: label,
    revenue: revenues[index] ?? 0,
    bookings: bookings[index] ?? 0,
  }));

  return (
    <div className="admin-revenue-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>매출 관리</h2>
      </div>

      <div className="chart-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem" }}>매출 추이</h3>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>기간별 매출과 예약 수를 비교해 보세요.</p>
          </div>
          <div className="chart-filter-group" style={{ display: "flex", gap: "0.5rem" }}>
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`chart-filter-btn ${period === option.value ? "active" : ""}`}
                onClick={() => fetchRevenueData(option.value)}
                disabled={chartLoading && period === option.value}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                  background: period === option.value ? "#7FD8BE" : "#ffffff",
                  color: period === option.value ? "#ffffff" : "#64748b",
                  cursor: chartLoading && period === option.value ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  opacity: chartLoading && period === option.value ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (period !== option.value && !chartLoading) {
                    e.currentTarget.style.background = "#f1f5f9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (period !== option.value) {
                    e.currentTarget.style.background = "#ffffff";
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-wrapper" style={{ background: "#ffffff", borderRadius: "8px", padding: "1.5rem", border: "1px solid #e2e8f0", position: "relative" }}>
          {chartLoading && (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255, 255, 255, 0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, borderRadius: "8px" }}>
              <div style={{ width: "24px", height: "24px", border: "3px solid #e2e8f0", borderTopColor: "#7FD8BE", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
            </div>
          )}
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={chartDataFormatted} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" tick={{ fill: "#6b7280" }} />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `${Math.round(value / 10000)}만`}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#6b7280" }} />
              <Tooltip
                formatter={(value, name) =>
                  name === "매출" ? [`${formatCurrency(value)}원`, name] : [`${value}건`, name]
                }
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="매출"
                fill="#7FD8BE"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bookings"
                name="예약 수"
                stroke="#F97316"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenuePage;

