import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  const authStatus = status;
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (authStatus === "checking") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BarLoader color="#00000" />
      </div>
    );
  }

  return (
    <Routes>
      {authStatus === "not-authenticated" || authStatus === "checking" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/calendar" />} />
        </>
      )}
    </Routes>
  );
};
