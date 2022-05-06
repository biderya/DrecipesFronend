import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default ({ children }) => {
  return (
    <Container>
      <div className="blog-detail-page">
        <div className={`page-wrapper`}>{children}</div>
      </div>
    </Container>
  );
};
