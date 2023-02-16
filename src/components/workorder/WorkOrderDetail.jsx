import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FloatingLabel, Form } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import {
  getWorkOrderDiagnosis,
  getWorkOrderState,
  getWorkOrderTier,
  getWorkOrderTierBackground,
  getWorkOrderUbication,
} from "../../utils";
import moment from "moment";
import config from "../../config.json";
import { useContext } from "react";
import { WorkOrdersContext } from "./../context/workOrdersContext";

const technical = "GABYT"; //get from login data

function WorkOrderDetail({ workOrder }) {
  const [showModal, setShowModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState(workOrder.diagnostico);
  const [price, setPrice] = useState(workOrder.costo);
  const { getPendingPc, getPendingImp, handleShow } =
    useContext(WorkOrdersContext);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleBreakFree = (id) => {
    console.log(id);
  };

  const handleSave = (workOrder) => {
    console.log(workOrder, diagnosis);
  };

  const handleClose = (id) => {
    console.log(id);
  };

  const handleDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleCosto = (e) => {
    setPrice(e.target.value);
  };

  const takeWOrkOrder = async (nrocompro) => {
    const response = await fetch(
      `${config.apiEndPoint}/work-orders?action=take`,
      {
        method: "PATCH",
        body: JSON.stringify({
          workOrder: {
            nrocompro: `${nrocompro}`,
            tecnico: `${technical}`,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      if (workOrder.codiart === ".PC") {
        handleShow(await getPendingPc());
        console.log(data, "PC");
      }
      if (workOrder.codiart === ".IMP") {
        handleShow(await getPendingImp());
        console.log(data, "IMP");
      }
    }
  };

  return (
    <>
      <tr
        key={workOrder.nrocompro}
        className={getWorkOrderTierBackground(workOrder.prioridad)}
      >
        <td>{moment(workOrder.ingresado).format("DD/MM/YYYY hh:mm a")}</td>
        <td>{workOrder.nrocompro}</td>
        <td>{workOrder.nombre}</td>
        <td>{getWorkOrderTier(workOrder.prioridad)}</td>
        {workOrder.estado !== 21 ? (
          <td role="button" onClick={handleShowModal}>
            <FaRegEdit />
          </td>
        ) : (
          <td></td>
        )}
        <td>
          {workOrder.estado === 21 && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => takeWOrkOrder(workOrder.nrocompro)}
            >
              TOMAR
            </Button>
          )}
        </td>
      </tr>
      <Modal size="xl" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {workOrder.nrocompro} - {workOrder.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6}>
                <p>ESTADO: {getWorkOrderState(workOrder.estado)}</p>
                <p>DIAGNOSTICO: {getWorkOrderDiagnosis(workOrder.diag)}</p>
                <p>UBICACION: {getWorkOrderUbication(workOrder.ubicacion)}</p>
                <p>
                  FECHA INGRESO:{" "}
                  {moment(workOrder.ingresado).format("DD/MM/YYYY hh:mm a")}
                </p>
                <p>PRIORIDAD: {getWorkOrderTier(workOrder.prioridad)}</p>
              </Col>
              <Col xs={6}>
                <p>TELEFONO: {workOrder.telefono}</p>
                <p>ARTICULO: {workOrder.descart}</p>
                <p>FALLA: {workOrder.falla}</p>
                <p>ACCESORIOS: {workOrder.accesorios}</p>
                <p>TECNICO: {workOrder.tecnico}</p>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Diagnositoc Tecnico"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Diagnositoc Tecnico"
                    style={{ height: "100px" }}
                    defaultValue={diagnosis}
                    onChange={handleDiagnosis}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <h3>Articulos</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Descripcion</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>.ST</td>
                      <td>Mano de Obra</td>
                      <td>
                        $
                        <Form.Control value={price} onChange={handleCosto} />
                      </td>
                    </tr>
                    {workOrder.products.map((p, index) => {
                      return (
                        <tr key={`${p.nrocompro}${index}`}>
                          <td>{p.codart}</td>
                          <td>{p.descrip}</td>
                          <td>$ {p.finalPrice}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>Total</td>
                      <td>$ {workOrder.total}</td>
                    </tr>
                  </tfoot>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="warning"
              onClick={() => handleBreakFree(workOrder.nrocompro)}
            >
              Liberar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleClose(workOrder.nrocompro)}
            >
              Cerrar
            </Button>
            <Button variant="info" onClick={() => handleSave(workOrder)}>
              Guardar
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WorkOrderDetail;
