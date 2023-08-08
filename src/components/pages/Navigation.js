import React from "react";
import { Container, Navbar,Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../ContextStore/AuthContext";
import { useContext } from "react";

const Navigation = () => {
    const { isLoggedIn, logoutHandler } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>

        <Nav.Link as={Link} to='/' >
          Home
        </Nav.Link>
        <Nav.Link as={Link} to='/about' >
          About
        </Nav.Link>
        <Nav.Link as={Link} to='/expenses' >
          Expenses
        </Nav.Link>
        {!isLoggedIn && (
            <Nav.Link
          
             
              to="/auth"
            >
              Login
            </Nav.Link>
          )}

        {isLoggedIn && (
          <button
            className="m-3 authTab text-light text-decoration-none p-2 bg-danger fw-bold "
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
        
      </Container>
    </Navbar>
  );
};

export default Navigation;
