import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHRLoading, setIsHRLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      // Check role directly from user object (stored in localStorage after login)
      setIsAdmin(user?.role === 'ADMIN' || user?.role === 'admin');
      setIsHRLoading(false);
    } else if (!loading && !user) {
      setIsAdmin(false);
      setIsHRLoading(false);
    }
  }, [user, loading]);

  return { isAdmin, isHRLoading };
};

export default useAdmin; 