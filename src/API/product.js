const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    
    
    return data.products; 
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};