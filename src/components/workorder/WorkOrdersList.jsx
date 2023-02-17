import Table from "react-bootstrap/Table";
import WorkOrderDetail from "./WorkOrderDetail";

function WorkOrderList({ workOrders }) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>FECHA</th>
          <th>NRO ORDEN</th>
          <th>CLIENTE</th>
          <th>TIER</th>
          <th>DETALLE</th>
        </tr>
      </thead>
      <tbody>
        {workOrders.length > 0 &&
          workOrders.map((w) => (
            <WorkOrderDetail key={w.nrocompro} workOrder={w} />
          ))}
      </tbody>
    </Table>
  );
}

export default WorkOrderList;
