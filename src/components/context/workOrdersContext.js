const { createContext, useState, useEffect } = require("react");

export const WorkOrdersContext = createContext();

const WorkOrdersContextProvider = ({ children }) => {
  const [pendingPc, setPendingPc] = useState([]);
  const [pendingImp, setPendingImp] = useState([]);
  const [myWorkOrders, setMyWorkOrders] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);

  const technical = "GABYT"; // get from user

  useEffect(() => {
    const getData = async () => {
      setPendingPc(await getPendingPc());
      setPendingImp(await getPendingImp());
      setMyWorkOrders(await getMyWorkOrders(technical));
    };

    getData();
  }, []);

  const getPendingPc = async () => {
    const data = await fetch(
      "http://localhost:4444/api/work-orders?status=pending&sector=pc"
    );
    const pendingPc = await data.json();
    return pendingPc.workOrders;
  };

  const getPendingImp = async () => {
    const data = await fetch(
      "http://localhost:4444/api/work-orders?status=pending&sector=imp"
    );
    const pendingImp = await data.json();
    return pendingImp.workOrders;
  };

  const getMyWorkOrders = async (technical) => {
    const data = await fetch(
      `http://localhost:4444/api/work-orders?status=myWorkOrders&technical=${technical}`
    );
    const myWorkOrders = await data.json();
    return myWorkOrders.workOrders;
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
        handleShow,
      }}
    >
      {children}
    </WorkOrdersContext.Provider>
  );
};

export default WorkOrdersContextProvider;
