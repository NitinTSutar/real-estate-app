import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
