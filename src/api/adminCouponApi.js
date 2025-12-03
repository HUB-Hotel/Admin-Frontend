import axiosClient from "./axiosClient";

// Frontend 데이터를 Backend 형식으로 변환
const transformToBackend = (frontendData) => {
  const backendData = {};
  
  // name → title
  if (frontendData.name !== undefined) {
    backendData.title = frontendData.name;
  }
  
  // code는 그대로
  if (frontendData.code !== undefined) {
    backendData.code = frontendData.code;
  }
  
  // type + value → discountPercentage (percentage 타입일 때만)
  if (frontendData.type === 'percentage' && frontendData.value !== undefined) {
    backendData.discountPercentage = frontendData.value;
  }
  
  // validTo → validUntil
  if (frontendData.validTo !== undefined) {
    backendData.validUntil = frontendData.validTo;
  }
  
  // status → isActive
  if (frontendData.status !== undefined) {
    backendData.isActive = frontendData.status === 'active';
  }
  
  // description은 그대로
  if (frontendData.description !== undefined) {
    backendData.description = frontendData.description;
  }
  
  return backendData;
};

// Backend 데이터를 Frontend 형식으로 변환
const transformFromBackend = (backendData) => {
  if (!backendData) return null;
  
  // validUntil이 Date 객체인 경우 문자열로 변환
  let validTo = backendData.validUntil;
  if (validTo instanceof Date) {
    validTo = validTo.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  } else if (typeof validTo === 'string') {
    // 이미 문자열이면 그대로 사용
    validTo = validTo.split('T')[0]; // ISO 형식에서 날짜 부분만 추출
  }
  
  return {
    id: backendData._id || backendData.id,
    name: backendData.title,
    code: backendData.code,
    type: backendData.discountPercentage !== undefined ? 'percentage' : 'fixed',
    value: backendData.discountPercentage || 0,
    validTo: validTo,
    validFrom: backendData.validFrom || validTo, // Backend에 없으면 validTo와 동일하게 설정
    status: backendData.isActive !== undefined ? (backendData.isActive ? 'active' : 'inactive') : 'active',
    description: backendData.description,
    minAmount: backendData.minAmount || 0,
    maxDiscount: backendData.maxDiscount || 0,
    usageLimit: backendData.usageLimit || '',
    createdAt: backendData.createdAt,
    updatedAt: backendData.updatedAt,
  };
};

export const adminCouponApi = {
  getCoupons: async (params) => {
    try {
      const response = await axiosClient.get("/admin/promotions", { params });
      // axiosClient 인터셉터가 이미 data만 반환하므로 response는 배열 또는 객체
      if (Array.isArray(response)) {
        return {
          coupons: response.map(transformFromBackend),
          totalPages: 1,
          currentPage: 1,
          total: response.length,
        };
      }
      // 객체 형태인 경우 (페이지네이션 정보 포함)
      if (response && Array.isArray(response.data)) {
        return {
          ...response,
          coupons: response.data.map(transformFromBackend),
        };
      }
      // 단순 배열이 아닌 경우
      return response;
    } catch (error) {
      console.error('쿠폰 목록 조회 에러:', error);
      throw error;
    }
  },

  getCouponById: async (id) => {
    try {
      const response = await axiosClient.get(`/admin/promotions/${id}`);
      // axiosClient 인터셉터가 이미 data만 반환하므로 response는 promotion 객체
      return transformFromBackend(response);
    } catch (error) {
      console.error('쿠폰 조회 에러:', error);
      throw error;
    }
  },

  createCoupon: async (data) => {
    const backendData = transformToBackend(data);
    const response = await axiosClient.post("/admin/promotions", backendData);
    return transformFromBackend(response);
  },

  updateCoupon: async (id, data) => {
    const backendData = transformToBackend(data);
    const response = await axiosClient.put(`/admin/promotions/${id}`, backendData);
    return transformFromBackend(response);
  },

  deleteCoupon: async (id) => {
    return axiosClient.delete(`/admin/promotions/${id}`);
  },

  updateCouponStatus: async (id, status) => {
    const response = await axiosClient.patch(`/admin/promotions/${id}/status`, { status });
    return transformFromBackend(response);
  },
};

export default adminCouponApi;

