import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
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
import Swal from "sweetalert2";

function WorkOrderDetail({ workOrder }) {
  const [showModal, setShowModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState(workOrder.diagnostico);
  const [price, setPrice] = useState(workOrder.costo);
  const { getPendingPc, getPendingImp, getMyWorkOrders, handleShow } =
    useContext(WorkOrdersContext);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFree = async (nrocompro) => {
    try {
      const response = await Swal.fire({
        text: `Queres liberar la orden ${nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        icon: "warning",
      });
      if (!response.isConfirmed) return;
      const data = await fetch(
        `${config.apiEndPoint}/work-orders?action=free`,
        {
          method: "PATCH",
          body: JSON.stringify({
            workOrder: {
              nrocompro: `${nrocompro}`,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await data.json();
      if (json.status === "error")
        return Swal.fire({
          text: `${json.message}`,
          icon: "error",
        });

      handleCloseModal();
      handleShow(await getMyWorkOrders(config.technicalLogin));

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Orden liberada",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async (nrocompro, diag) => {
    try {
      const response = await Swal.fire({
        text: `Queres cerrar la orden ${nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        icon: "warning",
      });
      if (!response.isConfirmed) return;
      const data = await fetch(
        `${config.apiEndPoint}/work-orders?action=close`,
        {
          method: "PATCH",
          body: JSON.stringify({
            workOrder: {
              nrocompro: `${nrocompro}`,
              diag,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await data.json();
      if (json.status === "error")
        return Swal.fire({
          text: `${json.message}`,
          icon: "error",
        });

      handleCloseModal();
      handleShow(await getMyWorkOrders(config.technicalLogin));

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Orden cerrada",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (workOrder) => {
    console.log(workOrder.nrocompro, diagnosis, price);

    try {
      const response = await Swal.fire({
        text: `Guardar modificaciones?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        icon: "warning",
      });
      if (!response.isConfirmed) return;
      const data = await fetch(
        `${config.apiEndPoint}/work-orders?action=update`,
        {
          method: "PATCH",
          body: JSON.stringify({
            workOrder: {
              nrocompro: `${workOrder.nrocompro}`,
              diagnostico: diagnosis,
              costo: price,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await data.json();
      if (json.status === "error")
        return Swal.fire({
          text: `${json.message}`,
          icon: "error",
        });

      handleCloseModal();
      handleShow(await getMyWorkOrders(config.technicalLogin));

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Orden actualizada",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleCosto = (e) => {
    setPrice(e.target.value);
  };

  const takeWorkOrder = async (nrocompro) => {
    try {
      const response = await Swal.fire({
        text: `Queres tomar la orden ${nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;
      const data = await fetch(
        `${config.apiEndPoint}/work-orders?action=take`,
        {
          method: "PATCH",
          body: JSON.stringify({
            workOrder: {
              nrocompro: `${nrocompro}`,
              tecnico: `${config.technicalLogin}`,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await data.json();
      if (json.status === "error")
        return Swal.fire({
          text: `${json.message}`,
          icon: "error",
        });
      if (json.status === "success" && workOrder.codiart === ".PC")
        handleShow(await getPendingPc());
      if (json.status === "success" && workOrder.codiart === ".IMP")
        handleShow(await getPendingImp());

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Orden tomada",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr
        key={workOrder.nrocompro}
        className={`${getWorkOrderTierBackground(workOrder.prioridad)}`}
      >
        <td>{moment(workOrder.ingresado).format("DD/MM/YYYY hh:mm a")}</td>
        <td>{workOrder.nrocompro}</td>
        <td>{workOrder.nombre}</td>
        <td>{getWorkOrderTier(workOrder.prioridad)}</td>

        <td
          role="button"
          onClick={handleShowModal}
          className="d-flex justify-content-center align-items-center p-3"
        >
          <FaRegEdit />
        </td>
        <td>
          {workOrder.estado === 21 && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => takeWorkOrder(workOrder.nrocompro)}
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
                {workOrder.estado !== 21 && (
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
                )}
              </Col>
            </Row>

            {workOrder.estado !== 21 && (
              <Row>
                <Col xs={12}>
                  <h3>DETALLE</h3>
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
                        <td className="custom-td text-end">
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>

                            <Form.Control
                              className="text-end"
                              value={price}
                              onChange={handleCosto}
                            />
                          </InputGroup>
                        </td>
                      </tr>
                      {workOrder.products.map((p, index) => {
                        return (
                          <tr key={`${p.nrocompro}${index}`}>
                            <td>{p.codigo}</td>
                            <td>{p.descrip}</td>

                            <td className="custom-td text-end">
                              <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>

                                <Form.Control
                                  className="text-end"
                                  value={p.finalPrice}
                                  disabled
                                />
                              </InputGroup>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2}>Total</td>
                        <td className="custom-td text-end">
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>

                            <Form.Control
                              className="text-end bg-dark text-white"
                              value={workOrder.total}
                              disabled
                            />
                          </InputGroup>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </Col>
              </Row>
            )}
          </Container>
        </Modal.Body>
        {workOrder.estado === 22 &&
          workOrder.tecnico === config.technicalLogin && (
            <Modal.Footer className="justify-content-between">
              <Row>
                <Col>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="primary"
                      onClick={() => handleClose(workOrder.nrocompro, 22)}
                    >
                      Reparado
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleClose(workOrder.nrocompro, 23)}
                    >
                      Sin Reparacion
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="warning"
                      onClick={() => handleFree(workOrder.nrocompro)}
                    >
                      Liberar
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handleUpdate(workOrder)}
                    >
                      Guardar
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Modal.Footer>
          )}
      </Modal>
    </>
  );
}

export default WorkOrderDetail;
