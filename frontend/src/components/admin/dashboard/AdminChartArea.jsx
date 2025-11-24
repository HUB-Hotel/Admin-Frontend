const AdminChartArea = ({ data }) => {
  const chartData = data || {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    revenue: [2000000, 2500000, 2200000, 2800000, 3000000, 3200000],
    bookings: [45, 58, 52, 67, 72, 78],
  };

  return (
    <div className="chart-section">
      <h3>매출 추이</h3>
      <div className="chart-placeholder">
        <p>차트 영역 (Chart.js 또는 Recharts 사용)</p>
        <p style={{ fontSize: "0.75rem", marginTop: "0.5rem", opacity: 0.7 }}>
          데이터: {JSON.stringify(chartData)}
        </p>
      </div>
    </div>
  );
};

export default AdminChartArea;
