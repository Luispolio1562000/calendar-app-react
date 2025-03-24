import { Button } from "react-bootstrap";

export const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Luis Gustavo
      </span>

      <Button variant="outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </Button>
    </div>
  );
};
