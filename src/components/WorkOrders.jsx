import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AsideMenu from "./AsideMenu";
import WorkOrderList from "./workorder/WorkOrdersList";

function WorkOrders(props) {
  const [workOrders, setWorkOrders] = useState([]);

  const getOrders = (url) => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setWorkOrders(json);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={12} lg={3}>
          <AsideMenu getOrders={getOrders} />
        </Col>
        <Col>
          {workOrders.length > 0 ? (
            <WorkOrderList workOrders={workOrders} />
          ) : (
            <p>No hay ordenes</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default WorkOrders;
