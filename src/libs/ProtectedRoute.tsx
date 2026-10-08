import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Role } from "../models/User";

interface Props {
  children: JSX.Element;
  roles?: Role[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
