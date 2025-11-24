import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import AlertModal from "../../components/common/AlertModal";

const AdminHotelEditPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "", type: "success" });

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  const fetchHotel = async () => {
    try {
      setLoading(true);
      const data = await adminHotelApi.getHotelById(hotelId);
      setHotel(data);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await adminHotelApi.updateHotel(hotelId, formData);
      setAlertModal({
        isOpen: true,
        message: "호텔 정보가 수정되었습니다.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/admin/hotels");
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
    navigate("/admin/hotels");
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchHotel} />;

  return (
    <div className="admin-hotel-edit-page">
      <div className="page-header">
        <h1>호텔 수정</h1>
      </div>

      <AdminHotelForm
        hotel={hotel}
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

export default AdminHotelEditPage;
