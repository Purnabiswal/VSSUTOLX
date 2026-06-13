import { mockDelay } from './api';
import { products, reports, users } from '../data/mockData';

export const adminService = {
  getDashboard: async () =>
    mockDelay({
      users: users.length,
      listings: products.length,
      reports: reports.length,
      revenue: 0,
      categories: [
        { label: 'Books', value: 24 },
        { label: 'Electronics', value: 18 },
        { label: 'Cycles', value: 10 },
      ],
    }),
  getUsers: async () => mockDelay(users),
  getListings: async () => mockDelay(products),
  getReports: async () => mockDelay(reports),
};
