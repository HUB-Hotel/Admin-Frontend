import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminRoomApi } from "../../api/adminRoomApi";
import AdminRoomForm from "../../components/admin/rooms/AdminRoomForm";
import AlertModal from "../../components/common/AlertModal";

const AdminRoomCreatePage = () => {
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "info" });

  const handleSubmit = async (data) => {
    try {
      await adminRoomApi.createRoom(data);
      setAlertModal({ isOpen: true, message: "객실이 등록되었습니다.", type: "success" });
      setTimeout(() => {
        navigate("/business/rooms");
      }, 1000);
    } catch (err) {
      setAlertModal({ isOpen: true, message: "객실 등록에 실패했습니다.", type: "error" });
    }
  };

  const handleCancel = () => {
    navigate("/business/rooms");
  };

  return (
    <div className="business-room-create-page">
      <div className="page-header">
        <h1>객실 등록</h1>
      </div>

      <div className="card">
        <AdminRoomForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ isOpen: false, message: "", type: "info" })}
      />
    </div>
  );
};

export default AdminRoomCreatePage;

