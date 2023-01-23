import React, { useContext } from "react";
import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { WorkOrdersContext } from "./context/workOrdersContext";

function AsideMenu() {
  const {
    pendingPc,
    pendingImp,
    myWorkOrders,
    getPendingPc,
    getPendingImp,
    getMyWorkOrders,
    handleShow,
  } = useContext(WorkOrdersContext);

  const codeTechnical = "GABYT"; // get from user

  return (
    <ListGroup className="mb-3">
      <ListGroup.Item
        className="d-flex justify-content-between align-items-start"
        action
        variant="success"
        onClick={async () => {
          handleShow(await getPendingPc());
        }}
      >
        <span>PC Pendientes</span>
        <Badge bg="primary" pill>
          {pendingPc.length}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        className="d-flex justify-content-between align-items-start"
        action
        variant="success"
        onClick={async () => {
          handleShow(await getPendingImp());
        }}
      >
        <span>Impresoras Pendientes</span>
        <Badge bg="primary" pill>
          {pendingImp.length}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        className="d-flex justify-content-between align-items-start"
        action
        variant="success"
        onClick={async () => {
          handleShow(await getMyWorkOrders(codeTechnical));
        }}
      >
        <span>Mis Ordenes Tomadas</span>
        <Badge bg="primary" pill>
          {myWorkOrders.length}
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default AsideMenu;
