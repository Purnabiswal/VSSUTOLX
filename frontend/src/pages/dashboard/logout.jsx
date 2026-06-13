import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Logout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login', { replace: true });
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center py-20">
      Logging out... 
    </div>
  );
}