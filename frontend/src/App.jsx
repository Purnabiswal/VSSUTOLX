import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import Toast from './components/Toast.jsx';
import Loader from './components/Loader.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader label="Loading VSSUT OLX" />}>
        <AppRoutes />
      </Suspense>
      <Toast />
    </BrowserRouter>
  );
}
