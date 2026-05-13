import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import '../styles/ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos: ' + err.message);
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-loading">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="product-error">{error}</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {product.images && product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/280x200?text=Sem+Imagem';
              }}
            />
          )}
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            {product.category && (
              <p className="product-category">{product.category.name}</p>
            )}
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
              <span className="product-price">R$ {product.price.toFixed(2)}</span>
              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

