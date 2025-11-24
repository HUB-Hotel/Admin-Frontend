import StatusBadge from "../../common/StatusBadge";

const AdminRecentTable = ({ bookings = [] }) => {
  const recentBookings = bookings.length > 0 
    ? bookings 
    : [
        {
          id: "BK001",
          hotelName: "서울 그랜드 호텔",
          customerName: "홍길동",
          status: "확정",
        },
        {
          id: "BK002",
          hotelName: "부산 해변 리조트",
          customerName: "김영희",
          status: "대기",
        },
      ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "확정":
        return "success";
      case "대기":
        return "warning";
      case "완료":
        return "info";
      default:
        return "secondary";
    }
  };
};

export default AdminRecentTable;
