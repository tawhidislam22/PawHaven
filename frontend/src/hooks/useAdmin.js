import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHRLoading, setIsHRLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const checkHRRole = async () => {
      try {
        if (user?.email) {
          const res = await axiosSecure.get(`/users/role/${user.email}`);
          setIsAdmin(res.data.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setIsHRLoading(false);
      }
    };

    if (!loading) {
      checkHRRole();
    }
  }, [user, loading, axiosSecure]);

  return { isAdmin, isHRLoading };
};

export default useAdmin; 