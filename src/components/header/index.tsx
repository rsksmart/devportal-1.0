import React from "react";
import Container from "../UI/container";
import {Link} from "gatsby";
import Nav from "react-bootstrap/Nav";
import Menu from "./menu";
import Logo from "../logo";
import OffCanvasMenu from "./offcanvas";
import classnames from "classnames";

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <header className={classnames('header py-4 position-fixed', className)}>
      <Container>
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-3 col-6">
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <div className="col-lg-9 d-none d-lg-flex justify-content-end">
            <Nav className="p-0 navbar navbar-expand-lg">
              <Menu/>
            </Nav>
          </div>
          <div className="col-lg-4 col-6 d-flex justify-content-end d-lg-none">
            <OffCanvasMenu/>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
