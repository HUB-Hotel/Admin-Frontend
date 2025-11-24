import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminCouponTable from "../../components/admin/coupons/AdminCouponTable";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const AdminCouponListPage = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: "", onConfirm: null });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      // TODO: API 연결
      setCoupons([]);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (couponId) => {
    setConfirmDialog({
      isOpen: true,
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
    try {
      // TODO: API 연결
      fetchCoupons();
          setConfirmDialog({ ...confirmDialog, isOpen: false });
    } catch (err) {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
          setAlertModal({
            isOpen: true,
            message: err.message || "삭제에 실패했습니다.",
            type: "error",
          });
    }
      },
    });
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCoupons} />;

  return (
    <div className="admin-coupon-list-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>쿠폰 관리</h2>
        <button
          onClick={() => navigate("/admin/coupons/new")}
          className="btn btn-primary"
        >
          쿠폰 생성
        </button>
        </div>
      </div>

      <AdminCouponTable coupons={coupons} onDelete={handleDelete} />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="삭제 확인"
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm || (() => {})}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </div>
  );
};

export default AdminCouponListPage;
