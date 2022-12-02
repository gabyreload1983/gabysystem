import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Products from "./components/Products";
import Customers from "./components/Customers";
import WorkOrders from "./components/WorkOrders";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/customers" element={<Customers />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/workorders" element={<WorkOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
