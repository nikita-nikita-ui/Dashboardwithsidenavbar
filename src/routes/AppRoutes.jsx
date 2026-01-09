import React from 'react';
import { Routes, Route } from "react-router-dom";

// Imports (Dhyan dein: Folder ka naam 'PRODUCT' hai ya 'Products')
import Admin from "../pages/Admin/Admin";
import Dashboard from "../pages/Dashboard/Dashboard";
import ShowProduct from "../pages/Products/showProduct";
import ProductDetails from "../pages/PRODUCT/ProductDetails"; // ✅ Sahi rasta

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<ShowProduct />} />
    </Routes>
  );
};

export default AppRoutes;