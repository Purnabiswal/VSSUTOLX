import api from './api';
import { normalizeProduct } from './productService';
import { normalizeUser } from './userService';

export const adminService = {
  getDashboard: async () => {
    const { data } = await api.get('/admin/analytics');
    return data.analytics;
  },
  getUsers: async () => {
    const { data } = await api.get('/admin/users');
    return data.users.map(normalizeUser);
  },
  getListings: async () => {
    const { data } = await api.get('/admin/products');
    return data.products.map(normalizeProduct);
  },
  getReports: async () => {
    const { data } = await api.get('/admin/reports');
    return data.reports.map((report) => ({ ...report, id: report._id || report.id }));
  },
  banUser: async (id) => {
    const { data } = await api.patch(`/admin/users/${id}/ban`);
    return normalizeUser(data.user);
  },
  deleteListing: async (id) => {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  },
};
