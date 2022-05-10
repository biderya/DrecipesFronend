import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const MyNavbar = (props) => {
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        className="px-2 bg-gray-800 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <Container className="container flex flex-wrap items-center justify-between mx-aut">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container flex flex-wrap items-center justify-between mx-aut">
              <Nav.Link href="/">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Нүүр
                </a>{" "}
              </Nav.Link>
              <Nav.Link href="/about">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Бидний тухай
                </a>{" "}
              </Nav.Link>
              <Nav.Link href="/category">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Категори{" "}
                </a>
              </Nav.Link>
              <Nav.Link href="/user-foods">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Таны оруулсан хоолнууд
                </a>{" "}
              </Nav.Link>
              <NavDropdown
                title={
                  <span className=" text-blue-700 font-medium">
                    Бүх хоолнууд
                  </span>
                }
                id="basic-nav-dropdown"
                className=""
              >
                <NavDropdown.Item href="/foods">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    Бүх хоолыг харах
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#category1">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    {" "}
                    Категори 1
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Item href="#category2">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    {" "}
                    Категори 2
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Item href="#category3">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    {" "}
                    Категори 3
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Item href="#category4">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    Категори 4
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Item href="#category5">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    Категори 5
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Item href="#category6">
                  <a className="text-blue-700 hover:no-underline font-medium">
                    Категори 6
                  </a>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Nav className="me-auto">
            <NavDropdown
              title={
                <span className=" text-blue-700 font-medium">Хэрэглэгч</span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/register">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Бүртгүүлэх
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/login">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Нэвтрэх
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/userprofile">
                <a className="text-blue-700 hover:no-underline font-medium">
                  {" "}
                  Хувийн мэдээлэл
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <a className="text-blue-700 hover:no-underline font-medium">
                  Тохиргоо
                </a>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={props.onLogout}>
                <a className="text-blue-700 hover:no-underline font-medium">
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
