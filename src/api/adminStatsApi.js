import axiosClient from "./axiosClient";

export const adminStatsApi = {
  getDashboardStats: async () => {
    return axiosClient.get("/admin/dashboard/stats");
  },

  getStatistics: async (params) => {
    // Backend에 통계 엔드포인트가 하나만 있을 수 있음
    return axiosClient.get("/admin/dashboard/stats", { params });
  },
};

export default adminStatsApi;

