import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
const MyNavbar = (props) => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("categories")
      .then((result) => {
        setLoading(false);
        setCategories(result.data.data);
      })
      .catch((err) => {
        setLoading(true);
        setError(err.message);
      });
  }, []);
  const filteredCategories = categories.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.content.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div>
      <Navbar className=" bg-[#4e4e6b] border-gray-200">
        <Container className="mx-36 container flex flex-wrap items-center justify-between mx-aut">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container flex flex-wrap items-center justify-between mx-aut">
              <Nav.Link href="/">
                <a className="text-white hover:no-underline font-medium">
                  Нүүр
                </a>{" "}
              </Nav.Link>
              <Nav.Link href="/about">
                <a className="text-white hover:no-underline font-medium">
                  Бидний тухай
                </a>{" "}
              </Nav.Link>
              <Nav.Link href="/category">
                <a className="text-white hover:no-underline font-medium">
                  Категори{" "}
                </a>
              </Nav.Link>
              <Nav.Link href="/user-foods">
                <a className="text-white hover:no-underline font-medium">
                  Таны оруулсан хоолнууд
                </a>{" "}
              </Nav.Link>
              <NavDropdown
                title={
                  <span className=" text-white font-medium">Бүх хоолнууд</span>
                }
                id="basic-nav-dropdown"
                className=""
              >
                <NavDropdown.Item href="/foods">
                  <a className="text-blue-800 hover:no-underline font-medium">
                    Бүх хоолыг харах
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {filteredCategories.map((el, index) => (
                  <NavDropdown.Item key="index">
                    <Link to={`/categories/${el._id}/foods`}>
                      <a className="text-blue-800 hover:no-underline font-medium">
                        {el.name}
                      </a>
                    </Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Nav className="me-auto">
            <NavDropdown
              title={<span className=" text-white font-medium">Хэрэглэгч</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/register">
                <a className="text-blue-800 hover:no-underline hover:bg-white font-medium">
                  Бүртгүүлэх
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/login">
                <a className="text-blue-800 hover:no-underline hover:bg-white font-medium">
                  Нэвтрэх
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/userprofile">
                <a className="text-blue-800 hover:no-underline hover:bg-white font-medium">
                  {" "}
                  Хувийн мэдээлэл
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/mycart">
                <a className="text-blue-800 hover:no-underline hover:bg-white font-medium">
                   Хэрэглэгчийн сагс
                </a>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                <a className="text-blue-800 hover:no-underline hover:bg-white font-medium">
                  Тохиргоо
                </a>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={props.onLogout}>
                <a className="text-blue-800 hover:no-underline hover:bg-white font-medium">
                  {" "}
                  Системээс гарах
                </a>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
