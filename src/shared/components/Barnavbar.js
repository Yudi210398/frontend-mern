import React, { Fragment } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";
import Logout from "../../auth/logout/Logout";

const Barnavbar = () => {
  const data = useSelector((state) => state.loginShow.Login);

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand className="letak-brand" href="#home">
            YOUR-PLACES
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto letak">
              <NavLink className="nav-link" to="/user">
                all users
              </NavLink>
              {data && (
                <NavLink className="nav-link" to="/places">
                  my places
                </NavLink>
              )}

              {data && (
                <NavLink className="nav-link" to="/place/new">
                  add place
                </NavLink>
              )}

              {!data && (
                <NavDropdown title="Auth" id="nav-dropdown">
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") +
                      " nav-link active activeds"
                    }
                    to="/auth/logout"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/auth/login"
                  >
                    Login
                  </NavLink>
                </NavDropdown>
              )}

              {data && (
                <Logout
                  title="Exit Alert"
                  pesanbody="Yakin untuk keluar ?"
                  keluar="LOGOUT"
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </Fragment>
  );
};

export default Barnavbar;
