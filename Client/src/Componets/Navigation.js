import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../App";
import { Button, Form } from "react-bootstrap";
function Navigation() {
  const navigate = useNavigate();
  const { login, setLoging, setCart, setSearch } = useContext(AllContext);
  const handleLogout = () => {
    setLoging(false);
    setCart([]);
  };
  return (
    <Navbar sticky="top" expand="lg" className="bg-white">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="https://www.findroyalcanin.com/cdn/shop/files/logo.png?v=1684396119"
            className="w-50"
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}>
              <h5>All Category</h5>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/Dog");
              }}>
              <h5>Dog</h5>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/Cat");
              }}>
              <h5>Cat</h5>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 my-3 mr-3"
              aria-label="Search"
              style={{ borderRadius: "5rem" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="m-3 mx-2"
              variant="outline-secondary"
              style={{ borderRadius: "5rem", border: "1px gray solid" }}
              type="submit">
              Search
            </Button>
          </Form>

          {login ? (
            <>
              <Nav.Link
                style={{ fontSize: "1.2rem" }}
                className="m-1"
                onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                style={{ fontSize: "1.2rem" }}
                className="m-1"
                onClick={() => {
                  navigate("/Login");
                }}>
                Login
              </Nav.Link>
            </>
          )}
          <p className="m-1">|</p>
          <Nav.Link
            className="m-1 mx-"
            onClick={() => {
              navigate("/Cart");
            }}>
            <AiOutlineShoppingCart style={{ fontSize: "1.3em" }} />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
