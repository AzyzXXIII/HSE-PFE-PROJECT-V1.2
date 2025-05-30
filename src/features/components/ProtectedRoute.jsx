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

  if (
    requiredRoles.length > 0 &&
    (!user?.role_name || !requiredRoles.includes(user.role_name))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((perm) => user?.permissions?.includes(perm))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.permissions?.includes("view_dashboard")) {
      return <Navigate to="/dashboard" replace />;
    } else if (user?.permissions?.includes("manage_users")) {
      return <Navigate to="/employees" replace />;
    } else if (user?.permissions?.includes("manage_reports")) {
      return <Navigate to="/reportCategory" replace />;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
