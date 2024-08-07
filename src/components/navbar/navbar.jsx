import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const Navb = () => {
  const navigate = useNavigate();
  const { clearAuthData, isSessionValid } = useAuth();

  const redirect = (pid) => {
    switch (pid) {
      case "1":
        navigate("/profile");
        break;
      case "3":
        navigate("/faq");
        break;
      case "4":
        navigate("/history");
        break;
      case "5":
        navigate("/signin");
        break;
      default:
        navigate("/");
        break;
    }
  };

  // clear session cookie and redirect to home
  const handleLogout = () => {
    clearAuthData();
    alert("Successfully logged out!");
    navigate("/", { replace: true });
  };

  return (
    <Navbar className="navbar" bg="transparent" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img className="mx-3" src={logo} alt="Logo" height={50} />
        GoDine
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav ">
        <Nav className="m-4 h6 text-center ">
          <Nav.Link onClick={() => redirect()} className="tw">
            Home
          </Nav.Link>
          {isSessionValid() ? (
            <Nav.Link onClick={() => redirect("1")} className="tw">
              Profile
            </Nav.Link>
          ) : null}
          <Nav.Link onClick={() => redirect("3")} className="tw">
            FAQ
          </Nav.Link>
          {isSessionValid() ? (
            <Nav.Link onClick={() => redirect("4")} className="tw">
              My Bookings
            </Nav.Link>
          ) : null}
          {!isSessionValid() ? (
            <Nav.Link onClick={() => redirect("5")} className="tw">
              Sign in
            </Nav.Link>
          ) : (
            <Nav.Link onClick={() => handleLogout()} className="tw">
              Log out
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navb;
