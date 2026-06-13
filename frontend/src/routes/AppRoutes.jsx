import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const SellerProfile = lazy(() => import('../pages/SellerProfile'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));
const NotFound = lazy(() => import('../pages/NotFound'));

const DashboardHome = lazy(() => import('../pages/dashboard/DashboardHome'));
const MyListings = lazy(() => import('../pages/dashboard/MyListings'));
const CreateListing = lazy(() => import('../pages/dashboard/CreateListing'));
const EditListing = lazy(() => import('../pages/dashboard/EditListing'));
const Wishlist = lazy(() => import('../pages/dashboard/Wishlist'));
const ProfileSettings = lazy(() => import('../pages/dashboard/ProfileSettings'));
const Messages = lazy(() => import('../pages/dashboard/Messages'));
const ChatRoom = lazy(() => import('../pages/dashboard/ChatRoom'));
const Notifications = lazy(() => import('../pages/dashboard/Notifications'));

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ManageUsers = lazy(() => import('../pages/admin/ManageUsers'));
const ManageListings = lazy(() => import('../pages/admin/ManageListings'));
const Reports = lazy(() => import('../pages/admin/Reports'));
const Analytics = lazy(() => import('../pages/admin/Analytics'));

const Logout = lazy(() => import('../pages/dashboard/Logout'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="sellers/:id" element={<SellerProfile />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="listings/new" element={<CreateListing />} />
          <Route path="listings/:id/edit" element={<EditListing />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:id" element={<ChatRoom />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="listings" element={<ManageListings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="/dashboard/profile" element={<Navigate to="/dashboard/settings" replace />} />
      <Route path="*" element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
