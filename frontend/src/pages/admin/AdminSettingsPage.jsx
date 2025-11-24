import AdminSystemConfigForm from "../../components/admin/settings/AdminSystemConfigForm";

const AdminSettingsPage = () => {
  const config = {
    siteName: "Hotel Booking",
    siteEmail: "admin@hotel.com",
    maintenanceMode: false,
    bookingEnabled: true,
    reviewEnabled: true,
  };

  const handleSubmit = async (formData) => {
    try {
      // TODO: API 연결
      alert("설정이 저장되었습니다.");
    } catch (err) {
      alert(err.message || "저장에 실패했습니다.");
    }
  };

  return (
    <div className="admin-settings-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>시스템 설정</h2>
      </div>

      <AdminSystemConfigForm config={config} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminSettingsPage;
