import { Button } from "react-bootstrap";
import { useAuthStore } from "../../hooks";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const { startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user.name}
      </span>

      <Button onClick={startLogout} variant="outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </Button>
    </div>
  );
};
