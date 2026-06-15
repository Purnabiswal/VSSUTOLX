import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Loader, Navbar, Sidebar, Toast } from './components';
import { useAuthStore } from './store';
import { adminNav, dashboardNav } from './utils';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const SellerProfile = lazy(() => import('./pages/SellerProfile'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const DashboardPage = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.DashboardHome })));
const MyListings = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.MyListings })));
const CreateListing = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.CreateListing })));
const EditListing = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.EditListing })));
const Wishlist = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Wishlist })));
const ProfileSettings = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.ProfileSettings })));
const Notifications = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Notifications })));
const Logout = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Logout })));

const AdminDashboard = lazy(() => import('./pages/Admin').then((module) => ({ default: module.AdminDashboard })));
const ManageUsers = lazy(() => import('./pages/Admin').then((module) => ({ default: module.ManageUsers })));
const ManageListings = lazy(() => import('./pages/Admin').then((module) => ({ default: module.ManageListings })));
const Reports = lazy(() => import('./pages/Admin').then((module) => ({ default: module.Reports })));
const Analytics = lazy(() => import('./pages/Admin').then((module) => ({ default: module.Analytics })));

function ProtectedRoute({ roles }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if (!token && !user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (roles?.length && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}

function SectionLayout({ title, items }) {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="container-page grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <Sidebar title={title} items={items} />
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}

function AppRoutes() {
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
        <Route path="dashboard" element={<SectionLayout title="Dashboard" items={dashboardNav} />}>
          <Route index element={<DashboardPage />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="listings/new" element={<CreateListing />} />
          <Route path="listings/:id/edit" element={<EditListing />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="admin" element={<SectionLayout title="Admin" items={adminNav} />}>
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

export default function App() {
  const hydrateCurrentUser = useAuthStore((state) => state.hydrateCurrentUser);

  useEffect(() => {
    hydrateCurrentUser();
  }, [hydrateCurrentUser]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader label="Loading VSSUT OLX" />}>
        <AppRoutes />
      </Suspense>
      <Toast />
    </BrowserRouter>
  );
}
