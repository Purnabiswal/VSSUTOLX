import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import Toast from './components/Toast.jsx';
import Loader from './components/Loader.jsx';
import { useAuthStore } from './store/authStore.js';

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
