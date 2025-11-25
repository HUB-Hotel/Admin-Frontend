import axiosClient from "./axiosClient";
import { mockBusinessApi } from "./mockApi";

const USE_MOCK = import.meta.env.DEV;

export const adminBusinessApi = {
  getOwners: async (params) => {
    if (USE_MOCK) return mockBusinessApi.getOwners(params);
    return axiosClient.get("/business/owners", { params });
  },

  getOwnerById: async (id) => {
    if (USE_MOCK) return mockBusinessApi.getOwnerById(id);
    return axiosClient.get(`/business/owners/${id}`);
  },

  updateOwnerStatus: async (id, status) => {
    if (USE_MOCK) return mockBusinessApi.updateOwnerStatus(id, status);
    return axiosClient.patch(`/business/owners/${id}/status`, { status });
  },
};

export default adminBusinessApi;

