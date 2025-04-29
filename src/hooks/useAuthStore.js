import { useDispatch, useSelector } from "react-redux";
import {
  onCheckingCredentials,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../store";
import calendarApi from "../apis/calendarApi";
import { useNavigate } from "react-router";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async (email, password) => {
    dispatch(onCheckingCredentials());

    try {
      const { data } = await calendarApi.post("/auth/login", {
        email,
        password,
      });

      const { token, name, uid } = await data;
      saveToken(token);
      const userAuthenticated = {
        name,
        uid,
        email,
      };

      dispatch(onLogin(userAuthenticated));
    } catch (error) {
      console.error("useAuthStore::startLogin:error:", error);
      dispatch(onLogout(error.response.data?.msg || "Error de login"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async (nameRegistered, email, password) => {
    dispatch(onCheckingCredentials());

    try {
      const { data } = await calendarApi.post("/auth/register", {
        name: nameRegistered,
        email,
        password,
      });

      console.log(data);
      const { token, name, uid } = await data;
      saveToken(token);
      const userAuthenticated = {
        name,
        uid,
        email,
      };

      dispatch(onLogin(userAuthenticated));
    } catch (error) {
      console.error("useAuthStore::startRegister:error:", error);
      dispatch(onLogout(error.response.data?.msg || "Error de registro"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 1000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      const { token, name, uid } = await data;
      saveToken(token);
      const userAuthenticated = {
        name,
        uid,
      };

      dispatch(onLogin(userAuthenticated));
    } catch (error) {
      console.error("useAuthStore::checkAuthToken:error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");
      dispatch(onLogout());
    }
  };

  function saveToken(token) {
    localStorage.setItem("token", token);
    localStorage.setItem("token-init-date", new Date().getTime());
  }
  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    navigate("/auth/login", { replace: true });
    dispatch(onLogout());
  };

  return {
    //? Properties.
    status,
    user,
    errorMessage,
    //? Methods.
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
