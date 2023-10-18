import React, {useState} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Menu from "./menu";

const OffCanvasMenu = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <>
      <button
        className={`btn d-inline-flex d-lg-none justify-content-end zg-burger ${show ? 'close' : ''}`}
        type="button"
        aria-label="menu toggle"
        onClick={handleToggle}>
      </button>
      <Offcanvas
        className="bg-black"
        show={show}
        backdrop={false}
        placement="end">
        <Offcanvas.Body>
          <Nav className="me-lg-auto">
            <Menu/>
          </Nav>
          <p className="mt-auto mb-0 text-center fs-7 opacity-25">© 2022. Rootstock. All rights reserved</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasMenu;
