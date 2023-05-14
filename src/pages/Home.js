import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Icon from "../assets/header.png";

const Home = () => {
  return (
      <Container>
        <Row className="d-flex align-items-center justify-content-between home">
          <Col className="col-12 col-lg-5">
          <div className="text-center ">
            <h2>Yuk Qurban</h2>
            <h5>Idhul Adha Semakin dekat</h5>
            <h5>Mari tunaikan Ibadah Qurban sesuai kemampuan</h5>
          </div>
          </Col>
          <Col className="col-12 col-lg-6">
            <img src={Icon} width="100%" />
          </Col>
        </Row>
      </Container>
  );
};

export default Home;
