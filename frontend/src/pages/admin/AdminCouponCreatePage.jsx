import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import AlertModal from "../../components/common/AlertModal";

const AdminCouponCreatePage = () => {
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "success" });

  const handleSubmit = async (formData) => {
    try {
      // TODO: API 연결
      setAlertModal({
        isOpen: true,
        message: "쿠폰이 생성되었습니다.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/admin/coupons");
      }, 1500);
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "생성에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/admin/coupons");
  };

  return (
    <div className="admin-coupon-create-page">
      <div className="page-header">
        <h1>쿠폰 생성</h1>
      </div>

      <AdminCouponForm onSubmit={handleSubmit} onCancel={handleCancel} />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />
    </div>
  );
};

export default AdminCouponCreatePage;
