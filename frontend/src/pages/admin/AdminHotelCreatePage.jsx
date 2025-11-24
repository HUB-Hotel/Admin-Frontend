import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import { adminHotelApi } from "../../api/adminHotelApi";
import AlertModal from "../../components/common/AlertModal";

const AdminHotelCreatePage = () => {
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "success" });

  const handleSubmit = async (formData) => {
    try {
      await adminHotelApi.createHotel(formData);
      setAlertModal({
        isOpen: true,
        message: "호텔이 등록되었습니다.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/admin/hotels");
      }, 1500);
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "등록에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/admin/hotels");
  };

  return (
    <div className="admin-hotel-create-page">
      <div className="page-header">
        <h1>호텔 등록</h1>
      </div>

      <AdminHotelForm onSubmit={handleSubmit} onCancel={handleCancel} />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />
    </div>
  );
};

export default AdminHotelCreatePage;
