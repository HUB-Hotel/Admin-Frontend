import { useState } from "react";
import AdminSystemConfigForm from "../../components/admin/settings/AdminSystemConfigForm";
import AlertModal from "../../components/common/AlertModal";

const AdminSettingsPage = () => {
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "success" });

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
      setAlertModal({
        isOpen: true,
        message: "설정이 저장되었습니다.",
        type: "success",
      });
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "저장에 실패했습니다.",
        type: "error",
      });
    }
  };

  return (
    <div className="admin-settings-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>시스템 설정</h2>
      </div>

      <AdminSystemConfigForm config={config} onSubmit={handleSubmit} />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />
    </div>
  );
};

export default AdminSettingsPage;
