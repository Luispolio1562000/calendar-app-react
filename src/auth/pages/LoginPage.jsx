import { useEffect } from "react";
import { useForm, useAuthStore } from "../../hooks";

import "./LoginPage.css";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const loginFormFields = {
    loginEmail: "",
    loginPassword: "",
  };

  const registerFormFields = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
  };
  const loginFormValidations = {
    loginEmail: [(value) => value.includes("@"), "Email debe tener @"],
    loginPassword: [
      (value) => value.trim().length >= 6,
      "Password debe tener al menos 6 caracteres",
    ],
  };

  const registerFormValidations = {
    registerName: [
      (value) => value.length >= 3,
      "Nombre debe tener al menos 3 caracteres",
    ],
    registerEmail: [(value) => value.includes("@"), "Email debe tener @"],
    registerPassword: [
      (value) => value.length >= 6,
      "Password debe tener al menos 6 caracteres",
    ],
    registerPassword2: [
      (value) => value.length >= 6,
      "Password debe tener al menos 6 caracteres",
    ],
    matchPassword: [
      (value) => value === registerFormFields.registerPassword,
      "Las contraseñas deben ser iguales",
    ],
  };

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginChange,
    isFormValid: isLoginFormValid,
  } = useForm(loginFormFields, loginFormValidations);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterChange,
    formState: registerFormState,
  } = useForm(registerFormFields, registerFormValidations);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin(loginEmail, loginPassword);
  };
  const registerSubmit = (event) => {
    event.preventDefault();
    console.log(!registerFormState.isFormValid);
    if (registerPassword !== registerPassword2) {
      Swal.fire(
        "Error en registro",
        "Las contraseñas deben ser iguales",
        "error"
      );
      return;
    }

    startRegister(registerName, registerEmail, registerPassword);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en login", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginChange}
                autoComplete="username"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginChange}
                autoComplete="current-password"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
                disabled={!isLoginFormValid}
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterChange}
                autoComplete="email"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterChange}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterChange}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
