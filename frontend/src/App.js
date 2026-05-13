import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Basket from './components/Basket';
import './styles/App.css';

function App() {
  // Inicializa o estado lendo do localStorage para evitar perda de dados no refresh
  const [basketItems, setBasketItems] = useState(() => {
    const savedCart = localStorage.getItem('basket_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [activeTab, setActiveTab] = useState('products');

  // Sincroniza as alterações do carrinho com o localStorage automaticamente
  useEffect(() => {
    localStorage.setItem('basket_items', JSON.stringify(basketItems));
  }, [basketItems]);

  const handleAddToCart = (product) => {
    // Segurança: Ignora produtos malformados ou sem ID válido da API
    if (!product || !product.id) {
      alert("Erro: Produto inválido ou indisponível.");
      return;
    }

    const existingItem = basketItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = basketItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: Number(item.quantity || 1) + 1 }
          : item
      );
      setBasketItems(updatedItems);
    } else {
      setBasketItems([...basketItems, { ...product, quantity: 1 }]);
    }

    alert(`${product.title} foi adicionado ao carrinho!`);
  };

  const handleUpdateBasket = (updatedItems) => {
    setBasketItems(updatedItems);
  };

  const handleClearBasket = () => {
    setBasketItems([]);
    localStorage.removeItem('basket_items');
  };

  // Calcula o total de itens físicos adicionados (soma das quantidades)
  const totalQuantity = basketItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1 className="app-title">🛍️ Basket Service</h1>
          <p className="app-subtitle">Gerenciador de Carrinho de Compras</p>
        </div>
        <div className="cart-badge">{totalQuantity}</div>
      </header>

      <div className="app-content">
        <div className="sections-tabs">
          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Produtos
          </button>
          <button
            className={`tab-button ${activeTab === 'basket' ? 'active' : ''}`}
            onClick={() => setActiveTab('basket')}
          >
            🛒 Carrinho ({totalQuantity})
          </button>
        </div>

        <div className="main-layout">
          {activeTab === 'products' && (
            <div className="tab-content active">
              <ProductList onAddToCart={handleAddToCart} />
            </div>
          )}

          {activeTab === 'basket' && (
            <div className="tab-content active">
              <Basket
                items={basketItems}
                onUpdateBasket={handleUpdateBasket}
                onClearBasket={handleClearBasket}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
