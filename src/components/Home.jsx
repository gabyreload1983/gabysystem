import React from "react";
import { Container, Row } from "react-bootstrap";
import { HashLoader } from "react-spinners";

function Home(props) {
  return (
    <Container>
      <h1 className="text-center mb-5">GabySystem</h1>
      <Row className="justify-content-center align-items-center">
        <HashLoader size={200} color="#36d7b7" />
      </Row>
    </Container>
  );
}

export default Home;
