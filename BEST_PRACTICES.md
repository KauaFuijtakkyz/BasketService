# 🎓 Guia de Boas Práticas e Desenvolvimento

## 📚 Índice
1. [Estrutura de Código](#estrutura-de-código)
2. [Convenções de Nomenclatura](#convenções-de-nomenclatura)
3. [Boas Práticas React](#boas-práticas-react)
4. [Padrões de API](#padrões-de-api)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Performance](#performance)
7. [Segurança](#segurança)
8. [Testes](#testes)

## 📁 Estrutura de Código

### Frontend Structure

```
src/
├── components/          # Componentes React
│   ├── ProductList.js   # Componentes de exibição
│   └── Basket.js
├── services/            # Lógica de negócio/API
│   └── api.js
├── styles/              # Folhas de estilo
│   ├── App.css
│   ├── ProductList.css
│   └── Basket.css
├── hooks/               # Custom Hooks (futuro)
├── utils/               # Funções utilitárias (futuro)
└── App.js               # Componente raiz
```

### Backend Structure (Java)

```
src/main/java/dev/java/ecommerce/basketservice/
├── controller/          # REST controllers
├── service/             # Lógica de negócio
├── entity/              # Modelos JPA
├── repository/          # Acesso a dados
├── dto/                 # Data Transfer Objects
├── exception/           # Exceções customizadas
└── config/              # Configurações
```

## 🏷️ Convenções de Nomenclatura

### JavaScript/React

```javascript
// Componentes: PascalCase
function ProductList() { }
function BasketItem() { }

// Variáveis e funções: camelCase
const basketItems = [];
const handleAddToCart = () => {};
const calculateTotal = () => {};

// Constantes: UPPER_SNAKE_CASE
const MAX_QUANTITY = 100;
const API_URL = 'http://localhost:8080';

// Props patterns
interface Props {
  items: Product[];
  onUpdate: (items: Product[]) => void;
  loading?: boolean;
}

// Hook naming: useCamelCase
function useBasketData() {}
function useFetchProducts() {}
```

### Java

```java
// Classes: PascalCase
public class BasketService {}
public class ProductDTO {}

// Métodos: camelCase
public Basket createBasket(BasketRequest request) {}
public void updateQuantity(String id, int quantity) {}

// Constantes: UPPER_SNAKE_CASE
private static final int MAX_RETRY = 3;
private static final String API_BASE_URL = "...";

// Atributos: camelCase
private Long clientId;
private BigDecimal totalPrice;
```

## ⚛️ Boas Práticas React

### 1. Componentes Funcionais

```javascript
// ✅ BOM
function ProductList({ items, onAddToCart }) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // lógica
  }, []);
  
  return <div>...</div>;
}

// ❌ RUIM - Componentes de classe
class ProductList extends Component {
  // ...
}
```

### 2. Hooks Corretos

```javascript
// ✅ BOM - Hooks no topo
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {}, []);
  
  return <div>...</div>;
}

// ❌ RUIM - Hooks dentro de condicionais
if (condition) {
  const [items, setItems] = useState([]); // Errado!
}
```

### 3. Event Handlers

```javascript
// ✅ BOM
const handleClick = () => {
  // lógica
};

return <button onClick={handleClick}>Click</button>;

// ✅ BOM COM ARGUMENTO
const handleQuantityChange = (index, value) => {
  // lógica
};

return (
  <input 
    onChange={(e) => handleQuantityChange(index, e.target.value)} 
  />
);

// ❌ RUIM
return <button onClick={() => handleClick()}>Click</button>;
```

### 4. Renderização Condicional

```javascript
// ✅ BOM
function Component() {
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  return <div>{data}</div>;
}

// ✅ BOM - Com operador ternário
return condition ? <Component1 /> : <Component2 />;

// ✅ BOM - Com &&
return showContent && <Component />;

// ❌ RUIM - Lógica complexa no JSX
return {loading ? <div>Carregando...</div> : <div>Conteúdo</div>};
```

### 5. Props Validation (futuro com TypeScript)

```javascript
// Com PropTypes
import PropTypes from 'prop-types';

ProductList.propTypes = {
  items: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ProductList.defaultProps = {
  loading: false,
};
```

## 🔌 Padrões de API

### Client HTTP

```javascript
// ✅ BOM - Centralizado com Axios
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

export const productService = {
  getAll: () => apiClient.get('/product'),
  getById: (id) => apiClient.get(`/product/${id}`),
};

// ❌ RUIM - Requests descentralizadas
fetch('http://localhost:8080/product')
  .then(res => res.json())
```

### Error Handling

```javascript
// ✅ BOM
try {
  const response = await productService.getAll();
  setProducts(response.data);
} catch (error) {
  setError(error.response?.data?.message || 'Erro desconhecido');
  console.error('Erro ao buscar produtos:', error);
}

// ✅ BOM - Com Interceptadores
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirecionar para login
    }
    return Promise.reject(error);
  }
);
```

## 🗂️ Gerenciamento de Estado

### useState

```javascript
// ✅ BOM - Múltiplos estados simples
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ✅ BOM - Para estado complexo
const [state, setState] = useState({
  items: [],
  loading: false,
  error: null,
});

// ❌ RUIM - Um único estado para tudo
const [data, setData] = useState({
  items: [],
  loading: false,
  error: null,
  user: {},
  // muitos mais...
});
```

### useEffect

```javascript
// ✅ BOM - Com dependências
useEffect(() => {
  fetchProducts();
}, []); // Executa uma vez

// ✅ BOM - Dependência específica
useEffect(() => {
  if (clientId) {
    loadBasket(clientId);
  }
}, [clientId]);

// ✅ BOM - Cleanup
useEffect(() => {
  const timer = setTimeout(() => {
    // ação
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);

// ❌ RUIM - Sem dependências
useEffect(() => {
  fetchData();
}); // Executa a cada render!
```

### Context (futuro)

```javascript
// Para compartilhamento global de estado
const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [state, dispatch] = useReducer(basketReducer, initialState);
  
  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
}
```

## ⚡ Performance

### Otimizações React

```javascript
// ✅ BOM - Memoization
const MemoizedComponent = React.memo(function Component(props) {
  return <div>{props.value}</div>;
});

// ✅ BOM - useCallback para callbacks
const memoizedCallback = useCallback(() => {
  handleAddToCart(id);
}, [id]);

// ✅ BOM - useMemo para computações caras
const memoizedValue = useMemo(() => {
  return calculateTotal(items);
}, [items]);

// ✅ BOM - Code Splitting
const LazyComponent = lazy(() => import('./Component'));
```

### CSS Performance

```css
/* ✅ BOM - Especificidade moderada */
.basket-item {
  padding: 15px;
  background: white;
}

/* ❌ RUIM - Especificidade alta */
div.container div.basket div.item {
  padding: 15px;
}

/* ✅ BOM - Usar classes */
.active-button {
  background: #2ecc71;
}

/* ❌ RUIM - Atributos inline */
<button style={{ background: '#2ecc71' }} />
```

## 🔐 Segurança

### Validação de Dados

```javascript
// ✅ BOM - Validar antes de usar
const handleClientIdChange = (value) => {
  if (!value || isNaN(value) || value < 0) {
    setError('ID inválido');
    return;
  }
  setClientId(value);
};

// ✅ BOM - Sanitizar dados
const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '') // Remove tags
    .trim();
};
```

### LocalStorage Seguro

```javascript
// ✅ BOM - Usar para dados não sensíveis
localStorage.setItem('basketId', basketId);
localStorage.setItem('theme', 'dark');

// ❌ RUIM - Nunca armazene tokens/senhas
// localStorage.setItem('token', token); // Perigoso!
// localStorage.setItem('password', pwd); // Perigoso!
```

## 🧪 Testes (Futuro com Jest)

### Testes Unitários

```javascript
// ✅ BOM - Testar funções isoladas
describe('calculateTotal', () => {
  it('deve calcular total corretamente', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ];
    const total = calculateTotal(items);
    expect(total).toBe(250);
  });
});
```

### Testes de Componentes

```javascript
// ✅ BOM - Usar React Testing Library
describe('ProductList', () => {
  it('deve renderizar lista de produtos', () => {
    const { getByText } = render(
      <ProductList items={mockProducts} />
    );
    expect(getByText('Produto 1')).toBeInTheDocument();
  });
  
  it('deve chamar onAddToCart ao clicar', () => {
    const mock = jest.fn();
    const { getByText } = render(
      <ProductList items={mockProducts} onAddToCart={mock} />
    );
    fireEvent.click(getByText('Adicionar'));
    expect(mock).toHaveBeenCalled();
  });
});
```

## 🎨 CSS Best Practices

```css
/* ✅ BOM - Mobile-first */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ✅ BOM - Variáveis CSS */
:root {
  --primary: #667eea;
  --success: #2ecc71;
  --error: #e74c3c;
}

.button-primary {
  background: var(--primary);
}

/* ✅ BOM - Flexbox/Grid */
.flex-container {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

/* ❌ RUIM - Floats */
.item {
  float: left;
  margin-right: 10px;
}
```

## 📝 Checklist de Qualidade

- [ ] Código compilável sem warnings
- [ ] Sem `console.log` em produção
- [ ] Todas as variáveis inicializadas
- [ ] Sem variáveis não utilizadas
- [ ] Nomes descritivos de variáveis
- [ ] Funções com responsabilidade única
- [ ] Tratamento de erros em requisições
- [ ] Componentes reutilizáveis
- [ ] Sem código duplicado
- [ ] Testes unitários (futuro)
- [ ] Documentação atualizada
- [ ] Performance otimizada

---

**Estas práticas garantem código mais limpo, maintível e performático!**

