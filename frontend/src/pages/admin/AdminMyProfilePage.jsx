import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminProfileForm from "../../components/admin/settings/AdminProfileForm";

const AdminMyProfilePage = () => {
  const { adminInfo } = useAdminAuth();

  const handleSubmit = async (formData) => {
    try {
      // TODO: API 연결
      alert("정보가 수정되었습니다.");
    } catch (err) {
      alert(err.message || "수정에 실패했습니다.");
    }
  };

  return (
    <div className="admin-my-profile-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>관리자 대시보드</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>내 정보</h2>
      </div>

      <AdminProfileForm profile={adminInfo} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminMyProfilePage;
