import Table from "react-bootstrap/Table";
import WorkOrderDetail from "./WorkOrderDetail";

function WorkOrderList({ workOrders }) {
  console.log(workOrders.length);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>FECHA</th>
          <th>NRO ORDEN</th>
          <th>CLIENTE</th>
          <th>TIER</th>
          <th>EDITAR</th>
          <th></th>
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
