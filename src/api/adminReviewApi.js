import axiosClient from "./axiosClient";

export const adminReviewApi = {
  getReviews: async (params) => {
    return axiosClient.get("/admin/reviews", { params });
  },

  reportReview: async (id, reason) => {
    return axiosClient.post(`/admin/reviews/${id}/report`, { reason });
  },

  approveReport: async (id) => {
    // 신고 승인 = 리뷰 삭제
    return axiosClient.delete(`/admin/reviews/${id}`);
  },

  rejectReport: async (id) => {
    // 신고 거부 = 리뷰 공개 처리
    return axiosClient.patch(`/admin/reviews/${id}/visibility`, { visible: true });
  },
};

export default adminReviewApi;

