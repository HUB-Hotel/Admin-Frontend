import { useState } from "react";

const AdminSystemConfigForm = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({
    siteName: config?.siteName || "Hotel Booking",
    siteEmail: config?.siteEmail || "admin@hotel.com",
    maintenanceMode: config?.maintenanceMode || false,
    bookingEnabled: config?.bookingEnabled !== undefined ? config.bookingEnabled : true,
    reviewEnabled: config?.reviewEnabled !== undefined ? config.reviewEnabled : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: "1.5rem" }}>시스템 설정</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>사이트명</label>
          <input
            type="text"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>사이트 이메일</label>
          <input
            type="email"
            name="siteEmail"
            value={formData.siteEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={formData.maintenanceMode}
              onChange={handleChange}
            />
            유지보수 모드
          </label>
        </div>
        <div className="form-group">
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="bookingEnabled"
              checked={formData.bookingEnabled}
              onChange={handleChange}
            />
            예약 기능 활성화
          </label>
        </div>
        <div className="form-group">
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="reviewEnabled"
              checked={formData.reviewEnabled}
              onChange={handleChange}
            />
            리뷰 기능 활성화
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
          <button type="submit" className="btn btn-primary">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSystemConfigForm;
