const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data.products;
};

export const getSingleProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return await response.json();
};

export const updateProduct = async (id, newData) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  });
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
  return await response.json();
};