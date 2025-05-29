import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../ui/Spinner";

export function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if required
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permission-based access if required
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((perm) => user?.permissions?.includes(perm))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
