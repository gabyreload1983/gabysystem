const { createContext, useState, useEffect } = require("react");

export const WorkOrdersContext = createContext();

const WorkOrdersContextProvider = ({ children }) => {
  const [pendingPc, setPendingPc] = useState([]);
  const [pendingImp, setPendingImp] = useState([]);
  const [myWorkOrders, setMyWorkOrders] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);

  const codeTechnical = "GABYT"; // get from user

  useEffect(() => {
    const getData = async () => {
      setPendingPc(await getPendingPc());
      setPendingImp(await getPendingImp());
      setMyWorkOrders(await getMyWorkOrders(codeTechnical));
    };

    getData();
  }, []);

  const getPendingPc = async () => {
    const pendingPcRes = await fetch(
      "HTTP://localhost:4444/api/work-orders/pending/PC"
    );
    const pendingPc = await pendingPcRes.json();
    return pendingPc;
  };

  const getPendingImp = async () => {
    const pendingImpRes = await fetch(
      "HTTP://localhost:4444/api/work-orders/pending/IMP"
    );
    const pendingImp = await pendingImpRes.json();
    return pendingImp;
  };

  const getMyWorkOrders = async (codeTechnical) => {
    const myWorkOrdersRes = await fetch(
      `HTTP://localhost:4444/api/work-orders/technical/${codeTechnical}`
    );
    const myWorkOrders = await myWorkOrdersRes.json();
    return myWorkOrders;
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
