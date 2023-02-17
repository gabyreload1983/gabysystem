import React, { useContext, useState } from "react";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { WorkOrdersContext } from "./context/workOrdersContext";
import config from "../config.json";

function AsideMenu() {
  const {
    pendingPc,
    pendingImp,
    myWorkOrders,
    getPendingPc,
    getPendingImp,
    getMyWorkOrders,
    getWorkOrder,
    handleShow,
  } = useContext(WorkOrdersContext);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") searchWorkOrder();
  };

  const searchWorkOrder = async () =>
    handleShow(await getWorkOrder(`${config.prefixWorkOrder}${search}`));

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>ORX0011000</InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Buscar Orden"
          aria-label="Search"
          onChange={handleSearch}
          value={search}
          onKeyUp={handleEnter}
        />
        <Button
          variant="outline-secondary"
          onClick={async () => searchWorkOrder()}
        >
          Buscar
        </Button>
      </InputGroup>

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
            handleShow(await getMyWorkOrders(config.technicalLogin));
          }}
        >
          <span>Mis Ordenes Tomadas</span>
          <Badge bg="primary" pill>
            {myWorkOrders.length}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default AsideMenu;
