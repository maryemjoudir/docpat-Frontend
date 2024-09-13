import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  token: string | null; // Token peut être une chaîne ou null
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
