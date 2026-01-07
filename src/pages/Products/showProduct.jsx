import React, { useEffect, useState } from "react";
import "./showProduct.css"; // CSS file import ki
import { getAllProducts } from "../../API/product";
const ProductShow = () => {
  const [products, setProducts] = useState([]); // Data store karne ke liye

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAllProducts(); // API se data mangwaya
    setProducts(data); // State me save kiya
  };

  return (
    <div className="main-container">
      <h1>Our Products</h1>
      
      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            {/* Image */}
           <img src={item.thumbnail} alt={item.title} className="product-img" />
            {/* Details */}
            <div className="card-details">
              <h3 className="product-title">{item.title.slice(0, 20)}...</h3>
              <p className="product-category">{item.category}</p>
              <h4 className="product-price">${item.price}</h4>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShow;