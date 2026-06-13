import api from './api';

export const reportService = {
  createReport: async ({ product, reason }) => {
    const { data } = await api.post('/reports', { product, reason });
    return data.report;
  },
};
