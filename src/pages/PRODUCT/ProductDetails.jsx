import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts, getSingleProduct } from "../../API/product";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // URL se '6' ya '18' nikal lega
  const [product, setProduct] = useState(null);
 
  const navigate = useNavigate();
  useEffect(() => {
    // API call karke data lana
    getSingleProduct(id).then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (

    <div>
       <h1>{product.title}</h1>
       <img src={product.thumbnail} alt={product.title} />
       <p>{product.description}</p>
       <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};
export default ProductDetails;