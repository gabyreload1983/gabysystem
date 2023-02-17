const { createContext, useState, useEffect } = require("react");
const config = require("../../config.json");

export const WorkOrdersContext = createContext();

const WorkOrdersContextProvider = ({ children }) => {
  const [pendingPc, setPendingPc] = useState([]);
  const [pendingImp, setPendingImp] = useState([]);
  const [myWorkOrders, setMyWorkOrders] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setPendingPc(await getPendingPc());
      setPendingImp(await getPendingImp());
      setMyWorkOrders(await getMyWorkOrders(config.technicalLogin));
    };

    getData();
  }, []);

  const getPendingPc = async () => {
    const data = await fetch(
      `${config.apiEndPoint}/work-orders?status=pending&sector=pc`
    );
    const pendingPc = await data.json();
    return pendingPc.workOrders;
  };

  const getPendingImp = async () => {
    const data = await fetch(
      `${config.apiEndPoint}/work-orders?status=pending&sector=imp`
    );
    const pendingImp = await data.json();
    return pendingImp.workOrders;
  };

  const getMyWorkOrders = async (technical) => {
    const data = await fetch(
      `${config.apiEndPoint}/work-orders?status=myWorkOrders&technical=${technical}`
    );
    const myWorkOrders = await data.json();
    return myWorkOrders.workOrders;
  };

  const getWorkOrder = async (nrocompro) => {
    const data = await fetch(
      `${config.apiEndPoint}/work-orders?numberWorkOrder=${nrocompro}`
    );
    const workOrder = await data.json();
    return workOrder.workOrders;
  };

  const handleShow = (workOrders) => {
    setWorkOrders(workOrders);
  };

  return (
    <WorkOrdersContext.Provider
      value={{
        workOrders,
        pendingPc,
        pendingImp,
        myWorkOrders,
        getPendingPc,
        getPendingImp,
        getMyWorkOrders,
        getWorkOrder,
        handleShow,
      }}
    >
      {children}
    </WorkOrdersContext.Provider>
  );
};

export default WorkOrdersContextProvider;
