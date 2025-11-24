import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminCouponForm from "../../components/admin/coupons/AdminCouponForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";

const AdminCouponEditPage = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "success" });

  useEffect(() => {
    fetchCoupon();
  }, [couponId]);

  const fetchCoupon = async () => {
    try {
      setLoading(true);
      // TODO: API 연결
      setCoupon({});
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      // TODO: API 연결
      setAlertModal({
        isOpen: true,
        message: "쿠폰이 수정되었습니다.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/admin/coupons");
      }, 1500);
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: err.message || "수정에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/admin/coupons");
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCoupon} />;

  return (
    <div className="admin-coupon-edit-page">
      <div className="page-header">
        <h1>쿠폰 수정</h1>
      </div>

      <AdminCouponForm
        coupon={coupon}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />
    </div>
  );
};

export default AdminCouponEditPage;
