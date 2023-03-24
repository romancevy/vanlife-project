import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function AuthRequired() {
  const isToken = localStorage.getItem("token");
  const location = useLocation();

  if (!isToken) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first.", from: location.pathname }}
        replace
      />
    );
  }
  return <Outlet />;
}
