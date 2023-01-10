import React from "react";
import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

function AsideMenu({ getOrders }) {
  const codeTechnical = "GABYT";
  return (
    <ListGroup className="mb-3">
      <ListGroup.Item
        className="d-flex justify-content-between align-items-start"
        role="button"
        variant="success"
        onClick={() =>
          getOrders("HTTP://localhost:4444/api/work-orders/pending/PC")
        }
      >
        <span>PC Pendientes</span>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        className="d-flex justify-content-between align-items-start"
        role="button"
        variant="success"
        onClick={() =>
          getOrders("HTTP://localhost:4444/api/work-orders/pending/IMP")
        }
      >
        <span>Impresoras Pendientes</span>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        className="d-flex justify-content-between align-items-start"
        role="button"
        variant="success"
        onClick={() =>
          getOrders(
            `HTTP://localhost:4444/api/work-orders/technical/${codeTechnical}`
          )
        }
      >
        <span>Mis Ordenes Tomadas</span>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default AsideMenu;
