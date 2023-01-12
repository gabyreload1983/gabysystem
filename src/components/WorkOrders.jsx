import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AsideMenu from "./AsideMenu";
import { WorkOrdersContext } from "./context/workOrdersContext";
import WorkOrderList from "./workorder/WorkOrdersList";

function WorkOrders(props) {
  const { showWorkOrders } = useContext(WorkOrdersContext);

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={12} lg={3}>
          <AsideMenu />
        </Col>
        <Col>
          <WorkOrderList workOrders={showWorkOrders} />
        </Col>
      </Row>
    </Container>
  );
}

export default WorkOrders;
