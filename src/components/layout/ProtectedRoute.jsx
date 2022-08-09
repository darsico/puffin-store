import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  console.log(user);
  const router = useRouter();
  useEffect(() => {
    if (!user & (isLoading === false)) {
      router.push('/account/login');
    }
  }, [user, router]);
  return <>{user && children}</>;
};

export default ProtectedRoute;
