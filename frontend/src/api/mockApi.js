import { mockAdminUser, mockDashboardStats } from "./mockData";

// API 지연 시뮬레이션
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API 응답 생성
const createResponse = (data) => {
  return Promise.resolve(data);
};

// Mock 인증 API
export const mockAuthApi = {
  login: async (credentials) => {
    await delay();

    if (
      credentials.email === "admin@hotel.com" &&
      credentials.password === "admin1234"
    ) {
      return createResponse({
        token: "mock-jwt-token-" + Date.now(),
        admin: mockAdminUser,
      });
    }

    throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
  },

  logout: async () => {
    await delay(200);
    return createResponse({ message: "Logged out successfully" });
  },

  getMyInfo: async () => {
    await delay();
    return createResponse(mockAdminUser);
  },

  changePassword: async (data) => {
    await delay();
    return createResponse({ message: "Password changed successfully" });
  },

  forgotPassword: async (email) => {
    await delay();
    return createResponse({ message: "Reset email sent" });
  },
};

// Mock 호텔 API - 기본 골격만
export const mockHotelApi = {
  getHotels: async (params = {}) => {
    await delay();
    return createResponse({ hotels: [], totalPages: 1, currentPage: 1 });
  },
  getHotelById: async (hotelId) => {
    await delay();
    return createResponse({});
  },
  createHotel: async (data) => {
    await delay();
    return createResponse({ message: "Hotel created" });
  },
  updateHotel: async (hotelId, data) => {
    await delay();
    return createResponse({ message: "Hotel updated" });
  },
  deleteHotel: async (hotelId) => {
    await delay();
    return createResponse({ message: "Hotel deleted" });
  },
  approveHotel: async (hotelId) => {
    await delay();
    return createResponse({ message: "Hotel approved" });
  },
  rejectHotel: async (hotelId, reason) => {
    await delay();
    return createResponse({ message: "Hotel rejected" });
  },
};

// Mock 예약 API - 기본 골격만
export const mockBookingApi = {
  getBookings: async (params = {}) => {
    await delay();
    return createResponse({ bookings: [], totalPages: 1, currentPage: 1 });
  },
  getBookingById: async (bookingId) => {
    await delay();
    return createResponse({});
  },
  updateBookingStatus: async (bookingId, status) => {
    await delay();
    return createResponse({ message: "Status updated" });
  },
  cancelBooking: async (bookingId, reason) => {
    await delay();
    return createResponse({ message: "Booking cancelled" });
  },
  deleteBooking: async (bookingId) => {
    await delay();
    return createResponse({ message: "Booking deleted" });
  },
};

// Mock 사용자 API - 기본 골격만
export const mockUserApi = {
  getUsers: async (params = {}) => {
    await delay();
    return createResponse({ users: [], totalPages: 1, currentPage: 1 });
  },
  getUserById: async (userId) => {
    await delay();
    return createResponse({});
  },
  updateUser: async (userId, data) => {
    await delay();
    return createResponse({ message: "User updated" });
  },
  deleteUser: async (userId) => {
    await delay();
    return createResponse({ message: "User deleted" });
  },
  updateUserStatus: async (userId, status) => {
    await delay();
    return createResponse({ message: "Status updated" });
  },
  getBusinessUsers: async (params = {}) => {
    await delay();
    return createResponse({ users: [], totalPages: 1, currentPage: 1 });
  },
};

// Mock 리뷰 API - 기본 골격만
export const mockReviewApi = {
  getReviews: async (params = {}) => {
    await delay();
    return createResponse({ reviews: [], totalPages: 1, currentPage: 1 });
  },
  getReviewById: async (reviewId) => {
    await delay();
    return createResponse({});
  },
  deleteReview: async (reviewId) => {
    await delay();
    return createResponse({ message: "Review deleted" });
  },
  getReportedReviews: async (params = {}) => {
    await delay();
    return createResponse({ reviews: [], totalPages: 1, currentPage: 1 });
  },
  handleReport: async (reviewId, action) => {
    await delay();
    return createResponse({ message: "Report handled" });
  },
};

// Mock 통계 API
export const mockStatsApi = {
  getDashboardStats: async () => {
    await delay();
    return createResponse(mockDashboardStats);
  },
  getRevenueStats: async (params = {}) => {
    await delay();
    
    const period = params?.period || params || "month";
    
    const revenueTrendDatasets = {
      week: {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        revenue: [5200000, 6100000, 5800000, 6400000, 7200000, 7800000, 6900000],
        bookings: [65, 72, 68, 75, 88, 92, 81],
      },
      month: {
        labels: ["1주차", "2주차", "3주차", "4주차"],
        revenue: [14500000, 16800000, 18900000, 21000000],
        bookings: [180, 195, 210, 230],
      },
      quarter: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        revenue: [70000000, 88000000, 92000000, 86000000],
        bookings: [520, 610, 640, 590],
      },
      year: {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        revenue: [32000000, 28000000, 26000000, 31000000, 34000000, 36000000, 38000000, 42000000, 40000000, 39000000, 37000000, 41000000],
        bookings: [78, 72, 70, 80, 85, 88, 90, 95, 92, 89, 85, 91],
      },
    };
    
    const data = revenueTrendDatasets[period] || revenueTrendDatasets.month;
    
    return createResponse(data);
  },
  getBookingStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, monthly: [] });
  },
  getUserStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, new: 0, active: 0 });
  },
  getHotelStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, active: 0, pending: 0 });
  },
};
