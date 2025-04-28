import { useDispatch, useSelector } from "react-redux";
import {
  onCheckingCredentials,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../store";
import calendarApi from "../apis/calendarApi";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email, password) => {
    dispatch(onCheckingCredentials());
    console.log(email, password);

    try {
      const { data } = await calendarApi.post("/auth/login", {
        email,
        password,
      });

      const { token, name, uid } = await data;
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
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

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //? Properties.
    status,
    user,
    errorMessage,
    //? Methods.
    startLogin,
    startLogout,
  };
};
