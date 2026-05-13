# Basket Service - Documentação de Arquitetura

## 🏗️ Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                           │
│                    (http://localhost:3000)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                   React App (Frontend)
                         │
        ┌────────────────┴────────────────┐
        │                                 │
   REST API Calls                 WebSocket (futuro)
        │                                 │
        └────────────────┬────────────────┘
                         │
┌─────────────────────────▼─────────────────────────────────┐
│            API Gateway / Spring Boot                        │
│          (http://localhost:8080)                            │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers                                          │  │
│  │  - BasketController                                  │  │
│  │  - ProductController                                 │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Services                                             │  │
│  │  - BasketService                                     │  │
│  │  - ProductService                                    │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Repositories                                         │  │
│  │  - BasketRepository (MongoDB)                         │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  Cache Layer                                          │  │
│  │  - Redis Cache                                        │  │
│  │  - TTL: 60 segundos                                   │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐  │
│  │  External API Client                                  │  │
│  │  - PlatiziStoreClient (Feign)                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
         │                            │
         │                            │
    ┌────▼────┐             ┌─────────▼───────┐
    │MongoDB  │             │  Platzi API     │
    │27017    │             │  (External)     │
    │         │             │                 │
    │Carrinho │             │ Produtos        │
    │Dados    │             │ Categoria       │
    │         │             │                 │
    └─────────┘             └─────────────────┘

    ┌──────────────┐
    │    Redis     │
    │     6379     │
    │              │
    │Cache Layer   │
    └──────────────┘
```

## 📦 Estrutura de Componentes

### Frontend (React)
```
frontend/
├── src/
│   ├── components/
│   │   ├── ProductList.js        # Listagem de produtos
│   │   └── Basket.js             # Gerenciamento carrinho
│   ├── services/
│   │   └── api.js                # Cliente HTTP (Axios)
│   ├── styles/
│   │   ├── App.css
│   │   ├── ProductList.css
│   │   └── Basket.css
│   ├── App.js                    # Componente principal
│   └── index.js                  # Entrada
```

### Backend (Spring Boot)
```
basketservice/
├── src/main/java/dev/java/ecommerce/basketservice/
│   ├── Controller/
│   │   ├── BasketController
│   │   ├── ProductController
│   │   └── request/
│   ├── Service/
│   │   ├── BasketService
│   │   └── ProductService
│   ├── Entity/
│   │   ├── Basket
│   │   ├── Product
│   │   ├── Status
│   │   └── PaymentMethod
│   ├── Repository/
│   │   └── basketRepository
│   ├── Client/
│   │   ├── PlatiziStoreClient
│   │   └── Response/
│   └── BasketserviceApplication.java
```

## 🔄 Fluxo de Requisições

### 1. Listar Produtos
```
Frontend (GET /product)
    ↓
ProductController.buscar()
    ↓
ProductService.buscar()
    ↓
PlatiziStoreClient.getAllProducts()
    ↓
Cache Redis (60s TTL)
    ↓
Platzi API
    ↓
Response carregado
```

### 2. Criar Carrinho
```
Frontend (POST /basket)
    ↓
BasketController.createBasket()
    ↓
BasketService.creatBasket()
    ↓
Validação
    ↓
Cálculo total (product.price * quantity)
    ↓
basketRepository.save()
    ↓
MongoDB - Persiste documento
    ↓
Response com ID do carrinho
```

### 3. Processar Pagamento
```
Frontend (PUT /basket/{id}/payment)
    ↓
BasketController.paymantBasket()
    ↓
BasketService.payBasket()
    ↓
Validação status
    ↓
Update status para PAID
    ↓
Save payment method
    ↓
MongoDB - Persiste atualização
    ↓
Response com carrinho pago
```

## 🗄️ Modelos de Dados

### Basket (MongoDB Document)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "client": 1,
  "totalPrice": 199.98,
  "product": [
    {
      "id": 1,
      "productId": 101,
      "name": "Produto A",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "status": "ACTIVE",
  "paymentMethod": null
}
```

### Quando Pago
```json
{
  "status": "PAID",
  "paymentMethod": {
    "method": "CREDIT_CARD",
    "transactionId": "TXN123456"
  }
}
```

## 🔌 Endpoints Principais

### Produtos
- `GET /product` - Lista todos
- `GET /product/{id}` - Por ID

### Carrinho
- `POST /basket` - Criar
- `GET /basket/{id}` - Buscar
- `PUT /basket/{id}` - Atualizar
- `PUT /basket/{id}/payment` - Pagamento
- `DELETE /basket/{id}/delete` - Deletar

## 💾 Persistência de Dados

### MongoDB
- Armazena documentos de Basket
- Database: `basket-service`
- Collections: `basket`
- TTL: Indefinido (até deletar)

### Redis Cache
- Armazena respostas de produtos
- TTL: 60 segundos
- Chave: `basket:product:{id}`

### LocalStorage (Browser)
- `basketId`: ID do carrinho
- `clientId`: ID do cliente
- TTL: Indefinido (até limpar cache)

## 🚀 Deployment (Docker)

### Com Docker Compose
```bash
docker-compose up -d
```

Services:
- MongoDB em localhost:27017
- Redis em localhost:6379

## 🔐 Fluxo de Segurança

1. Validação de entrada em Controllers
2. Sanitização de dados
3. Redis com senha
4. CORS configurado
5. Logs de operações sensíveis

## ⚡ Otimização e Performance

### Frontend
- Lazy loading de imagens
- Componentes React.memo (futuro)
- Debounce em buscas (futuro)

### Backend
- Cache Redis (60s)
- Índices MongoDB
- Conexão pooling
- Validação antes de persistir

## 📊 Métricas e Monitoramento (Futuro)

- Logs centralizados (ELK Stack)
- Métricas Prometheus
- Alertas Grafana
- APM DataDog/New Relic

## 🔄 CI/CD (Futuro)

- GitHub Actions
- Build automatizado
- Testes unitários
- Deploy em staging/production

## 📚 Tecnologias

- **Frontend**: React 18, Axios, CSS3
- **Backend**: Spring Boot 3.5.13, Feign, MongoDB, Redis
- **Database**: MongoDB, Redis
- **Infraestrutura**: Docker, Docker Compose

---

**Última atualização: 2025**

