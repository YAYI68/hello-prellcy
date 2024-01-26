import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken } = useAuthContext();
  const { pathname } = useLocation();

  const authUser = !!accessToken;

  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} replace state={{ path: pathname }} />
  );
};

export default ProtectedRoute;
