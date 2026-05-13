import React, { useState, useEffect, useCallback } from 'react';
import { basketService } from '../services/api';
import '../styles/Basket.css';

const Basket = ({ items, onUpdateBasket, onClearBasket }) => {
  const [basketId, setBasketId] = useState(localStorage.getItem('basketId') || null);
  const [clientId, setClientId] = useState(localStorage.getItem('clientId') || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    method: 'CREDIT_CARD',
    transactionId: '',
  });

  // useCallback evita a recriação da função e quebra o loop de renderização do componente
  const loadBasket = useCallback(async () => {
    if (!basketId) return;
    try {
      setLoading(true);
      const response = await basketService.getBasketById(basketId);

      const mappedProducts = (response.data.product || []).map(p => ({
        id: p.id,
        title: p.title || p.name,
        price: parseFloat(p.price) || 0,
        quantity: parseInt(p.quantity) || 1
      }));

      onUpdateBasket(mappedProducts);
      setMessage({ type: 'success', text: 'Carrinho carregado com sucesso!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro ao carregar carrinho: ' + err.message });
    } finally {
      setLoading(false);
    }
  }, [basketId, onUpdateBasket]);

  // Executa o carregamento inicial de forma segura apenas ao montar o componente
  useEffect(() => {
    if (basketId) {
      loadBasket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return total + price * quantity;
    }, 0);
  };

  const handleQuantityChange = (index, quantity) => {
    const newQuantity = parseInt(quantity) || 1;
    if (newQuantity > 0) {
      const updatedItems = [...items];
      updatedItems[index].quantity = newQuantity;
      onUpdateBasket(updatedItems);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onUpdateBasket(updatedItems);
  };

  const handleSaveBasket = async () => {
    if (!clientId) {
      setMessage({ type: 'error', text: 'ID do Cliente é obrigatório para salvar!' });
      return;
    }

    try {
      setLoading(true);

      const basketData = {
        clientId: parseInt(clientId) || 0,
        product: items.map(item => ({
          id: parseInt(item.id),
          quantity: parseInt(item.quantity) || 1,
        })),
      };

      if (basketId) {
        await basketService.updateBasket(basketId, basketData);
        setMessage({ type: 'success', text: 'Carrinho atualizado com sucesso!' });
      } else {
        const response = await basketService.createBasket(basketData);
        const newBasketId = response.data.id || response.data;
        setBasketId(newBasketId);
        localStorage.setItem('basketId', newBasketId);
        setMessage({ type: 'success', text: 'Carrinho criado com sucesso!' });
      }
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      const apiError = err.response?.data?.message || err.message;
      setMessage({ type: 'error', text: 'Erro ao salvar carrinho: ' + apiError });
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async () => {
    if (!paymentData.transactionId.trim()) {
      setMessage({ type: 'error', text: 'ID da transação é obrigatório!' });
      return;
    }

    try {
      setLoading(true);
      await basketService.processPayment(basketId, paymentData);
      setMessage({ type: 'success', text: 'Pagamento processado com sucesso!' });
      setShowPaymentModal(false);
      setPaymentData({ method: 'CREDIT_CARD', transactionId: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro ao processar pagamento: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBasket = async () => {
    if (window.confirm('Tem certeza que deseja deletar este carrinho?')) {
      try {
        setLoading(true);
        await basketService.deleteBasket(basketId);
        setBasketId(null);
        localStorage.removeItem('basketId');
        onClearBasket();
        setMessage({ type: 'success', text: 'Carrinho deletado com sucesso!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (err) {
        setMessage({ type: 'error', text: 'Erro ao deletar carrinho: ' + err.message });
      } finally {
        setLoading(false);
      }
    }
  };

  const total = calculateTotal();

  return (
    <div className="basket-container">
      <div className="basket-header">
        <h2 className="basket-title">🛒 Meu Carrinho</h2>
        <span>({items.length} itens)</span>
      </div>

      {message.text && (
        <div className={`${message.type}-message`}>
          {message.text}
        </div>
      )}

      <div className="client-input-group">
        <label htmlFor="clientId">ID do Cliente:</label>
        <input
          id="clientId"
          type="number"
          value={clientId}
          onChange={(e) => {
            setClientId(e.target.value);
            localStorage.setItem('clientId', e.target.value);
          }}
          placeholder="Digite o ID do cliente"
        />
      </div>

      {items.length === 0 ? (
        <div className="basket-empty">
          <p>Seu carrinho está vazio. Adicione produtos para começar!</p>
        </div>
      ) : (
        <>
          <div className="basket-items">
            {items.map((item, index) => (
              <div key={index} className="basket-item">
                <div className="item-info">
                  <div className="item-name">{item.title || item.name}</div>
                  <div className="item-price">
                    R$ {(parseFloat(item.price) || 0).toFixed(2)}
                  </div>
                </div>
                <div className="item-quantity">
                  <label htmlFor={`qty-${index}`}>Qtd:</label>
                  <input
                    id={`qty-${index}`}
                    type="number"
                    min="1"
                    className="quantity-input"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </div>
                <div className="item-total">
                  R$ {((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="basket-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">R$ {total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Imposto (10%):</span>
              <span className="summary-value">R$ {(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span className="summary-label">Total:</span>
              <span className="summary-value">R$ {(total * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="basket-actions">
            <button
              className="action-btn primary"
              onClick={handleSaveBasket}
              disabled={loading || !clientId}
              title={!clientId ? 'Por favor, insira o ID do cliente' : ''}
            >
              {basketId ? 'Atualizar Carrinho' : 'Criar Carrinho'}
            </button>
            {basketId && (
              <>
                <button
                  className="action-btn primary"
                  onClick={() => setShowPaymentModal(true)}
                  disabled={loading}
                >
                  Processar Pagamento
                </button>
                <button
                  className="action-btn secondary"
                  onClick={handleDeleteBasket}
                  disabled={loading}
                >
                  Deletar Carrinho
                </button>
              </>
            )}
          </div>
        </>
      )}

      {showPaymentModal && (
        <div className="modal-backdrop" style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000}}>
          <div className="payment-modal" style={{background:'white', padding:'30px', borderRadius:'8px', width:'400px', boxShadow:'0 4px 6px rgba(0,0,0,0.1)'}}>
            <h3>💳 Detalhes do Pagamento</h3>
            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{display:'block', marginBottom:'5px'}}>Método:</label>
              <select
                value={paymentData.method}
                onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                style={{width:'100%', padding:'8px', borderRadius:'4px'}}
              >
                <option value="CREDIT_CARD">Cartão de Crédito</option>
                <option value="DEBIT_CARD">Cartão de Débito</option>
                <option value="PIX">PIX</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:'20px'}}>
              <label style={{display:'block', marginBottom:'5px'}}>ID da Transação:</label>
              <input
                type="text"
                value={paymentData.transactionId}
                onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
                placeholder="Ex: TXN123456"
                style={{width:'95%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc'}}
              />
            </div>
            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
              <button onClick={() => setShowPaymentModal(false)} style={{padding:'8px 16px', background:'#6c757d', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>Cancelar</button>
              <button onClick={handleProcessPayment} style={{padding:'8px 16px', background:'#28a745', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
