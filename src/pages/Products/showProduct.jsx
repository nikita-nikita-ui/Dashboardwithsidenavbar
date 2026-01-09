import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./showProduct.css";
import { getAllProducts, deleteProduct, updateProduct } from "../../API/product";

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Modals State
  const [modalType, setModalType] = useState(null); // 'update' or 'delete'
  const [selectedItem, setSelectedItem] = useState(null);
  const [tempPrice, setTempPrice] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const all = await getAllProducts();
    const deletedIds = JSON.parse(localStorage.getItem("deletedProductIds") || "[]");
    setProducts(all.filter(item => !deletedIds.includes(item.id)));
  };

  // --- Modal Handlers ---
  const openModal = (e, type, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setModalType(type);
    if (type === 'update') setTempPrice(item.price);
  };

  const closeModal = () => { setModalType(null); setSelectedItem(null); };

  const handleUpdateAction = async () => {
    const result = await updateProduct(selectedItem.id, { price: Number(tempPrice) });
    if (result) {
      setProducts(products.map(p => p.id === selectedItem.id ? { ...p, price: result.price } : p));
      closeModal();
    }
  };

  const handleDeleteAction = async () => {
    await deleteProduct(selectedItem.id);
    const deletedIds = JSON.parse(localStorage.getItem("deletedProductIds") || "[]");
    deletedIds.push(selectedItem.id);
    localStorage.setItem("deletedProductIds", JSON.stringify(deletedIds));
    setProducts(products.filter(p => p.id !== selectedItem.id));
    closeModal();
  };
  return (
    <div className="main-container">
      <div className="header-section">
        <h1>Product List</h1>
        {/* Navigation back to LOGIN directly */}
        <button className="back-login-btn" onClick={() => navigate("/")}>⬅ Back to Login</button>
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
            <img src={item.thumbnail} alt={item.title} className="product-img" />
            <div className="card-details">
              <h3 className="product-title">{item.title}</h3>
              <h4 className="product-price">${item.price}</h4>
              <div className="action-btns">
                <button className="update-btn" onClick={(e) => openModal(e, 'update', item)}>Update</button>
                <button className="delete-btn" onClick={(e) => openModal(e, 'delete', item)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- CUSTOM POPUP MODAL --- */}
      {modalType && (
        <div className="modal-overlay">
          <div className={`custom-popup ${modalType === 'delete' ? 'border-red' : 'border-purple'}`}>
            <h3>{modalType === 'update' ? 'Update Price' : 'Confirm Delete'}</h3>
            <p>{modalType === 'update' ? `New price for ${selectedItem?.title}` : `Delete ${selectedItem?.title} permanently?`}</p>
            
            {modalType === 'update' && (
              <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
            )}

            <div className="modal-footer">
              <button className="confirm-btn" onClick={modalType === 'update' ? handleUpdateAction : handleDeleteAction}>
                {modalType === 'update' ? 'Save Changes' : 'Yes, Delete'}
              </button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProduct;