const { createContext, useState, useEffect } = require("react");

export const WorkOrdersContext = createContext();

const WorkOrdersContextProvider = ({ children }) => {
  const [pendingPc, setPendingPc] = useState([]);
  const [pendingImp, setPendingImp] = useState([]);
  const [myWorkOrders, setMyWorkOrders] = useState([]);
  const [showWorkOrders, setShowWorkOrders] = useState([]);

  useEffect(() => {
    getPendingPc();
    getPendingImp();
    getMyWorkOrders("GABYT");
  }, []);

  const getPendingPc = async () => {
    const pendingPcRes = await fetch(
      "HTTP://localhost:4444/api/work-orders/pending/PC"
    );
    const pendingPc = await pendingPcRes.json();
    setPendingPc(pendingPc);
    setShowWorkOrders(pendingPc);
  };

  const getPendingImp = async () => {
    const pendingImpRes = await fetch(
      "HTTP://localhost:4444/api/work-orders/pending/IMP"
    );
    const pendingImp = await pendingImpRes.json();
    setPendingImp(pendingImp);
    setShowWorkOrders(pendingImp);
  };

  const getMyWorkOrders = async (codeTechnical) => {
    const myWorkOrdersRes = await fetch(
      `HTTP://localhost:4444/api/work-orders/technical/${codeTechnical}`
    );
    const myWorkOrders = await myWorkOrdersRes.json();
    setMyWorkOrders(myWorkOrders);
    setShowWorkOrders(myWorkOrders);
  };

  return (
    <WorkOrdersContext.Provider
      value={{
        pendingPc,
        pendingImp,
        myWorkOrders,
        getPendingPc,
        getPendingImp,
        getMyWorkOrders,
        showWorkOrders,
      }}
    >
      {children}
    </WorkOrdersContext.Provider>
  );
};

export default WorkOrdersContextProvider;
