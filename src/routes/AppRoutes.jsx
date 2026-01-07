import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
// import Dashboard...
import Dashboard from "../pages/Dashboard/Dashboard";
// 1. Import karo
import ProductShow from "../pages/Products/showProduct";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/products" element={<ProductShow />} />
      
    </Routes>
  );
};

export default AppRoutes;