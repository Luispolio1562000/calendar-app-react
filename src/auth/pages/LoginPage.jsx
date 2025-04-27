import { useForm } from "../../hooks";
import "./LoginPage.css";

export const LoginPage = () => {
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
      (value) => value.length >= 6,
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
    formState: loginFormState,
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
    console.log(loginFormState);
    // Aquí implementarías la lógica de login
  };
  const registerSubmit = (event) => {
    event.preventDefault();
    console.log(registerFormState);
    // Aquí implementarías la lógica de registro
  };

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
                s
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginChange}
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
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
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
