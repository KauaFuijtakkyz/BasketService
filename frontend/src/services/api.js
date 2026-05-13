import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Produto Service
export const productService = {
  getAllProducts: () => apiClient.get('/product'),
  getProductById: (id) => apiClient.get(`/product/${id}`),
};

// Basket Service
export const basketService = {
  createBasket: (basketData) => apiClient.post('/basket', basketData),
  getBasketById: (id) => apiClient.get(`/basket/${id}`),
  updateBasket: (id, basketData) => apiClient.put(`/basket/${id}`, basketData),
  deleteBasket: (id) => apiClient.delete(`/basket/${id}/delete`),
  processPayment: (id, paymentData) => apiClient.put(`/basket/${id}/payment`, paymentData),
};

