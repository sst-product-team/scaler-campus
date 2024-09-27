import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function SideSheet({ show, onHide, children }) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Student Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
