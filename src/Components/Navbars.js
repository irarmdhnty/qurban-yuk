import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Login from "./Auth/Login";
import Register from "./Auth/Regist";
import { UserContext } from "../Usercontext/Usercontext";
import Profile from "../assets/profile.jpg";

const Navbars = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (!state.user?.role)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: JSON.parse(localStorage.getItem("user")),
      });
  }, []);

  const handleDeleteToken = () => {
    dispatch({ type: "LOGOUT" });
     navigate("/")
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <Navbar className="px-5">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} width="150" onClick={() => navigate("/")} />
          </Navbar.Brand>
        </Container>
        {/* <Nav className="me-auto px-5" hidden={!state.user?.role}>
          <Link
            to="/category"
            className="fs-4 text-color fw"
            hidden={state.user?.role !== "user"}
          >
            Category ||
          </Link>
          <Nav.Link
            href="/category-list"
            className="fs-4 text-color fw"
            hidden={state.user?.role !== "admin"}
          >
            Category List ||
          </Nav.Link>
          <Nav.Link href="/profile" className="fs-4 text-color fw">
            {state.user?.fullName}
          </Nav.Link>
        </Nav> */}

        <div className="d-flex">
          <Button
            className="btn-color"
            onClick={() => setShowLogin(true)}
            hidden={state.user?.role}
          >
            Login
          </Button>
          <Button
            className="btn-color ms-2"
            onClick={() => setShowRegister(true)}
            hidden={state.user?.role}
          >
            Register
          </Button>

          <Dropdown hidden={!state.user?.role}>
            <Dropdown.Toggle className="btn-color mx-5" id="dropdown-basic">
              <img
                src={Profile}
                width={40}
                height={40}
                className="rounded-circle"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/profile" className="fs-4 text-color px-3">
                  {state.user?.fullName}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/category"
                  className="fs-5 text-color px-3"
                  hidden={state.user?.role !== "user"}
                >
                  Category
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/category-list"
                  className="fs-5 text-color px-3"
                  hidden={state.user?.role !== "admin"}
                >
                  Category List
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/add-category"
                  className="fs-5 text-color px-3 "
                  hidden={state.user?.role !== "admin"}
                >
                  Add Category
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  className="btn-color ms-2"
                  onClick={handleDeleteToken}
                  hidden={!state.user?.role}
                >
                  logout
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>

      <Login
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </div>
  );
};

export default Navbars;
