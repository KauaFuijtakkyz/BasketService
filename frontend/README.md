# Frontend - Basket Service

Uma aplicação React moderna para gerenciar carrinho de compras integrada com o Basket Service backend.

## 🎯 Funcionalidades

- ✅ **Listar Produtos**: Busca de produtos da API Platzi em tempo real
- ✅ **Adicionar ao Carrinho**: Adicionar produtos com quantidade
- ✅ **Gerenciar Carrinho**: Atualizar quantidades, remover itens
- ✅ **Persistência**: Salvar carrinho no MongoDB via API
- ✅ **Processamento de Pagamento**: Simular pagamentos com diferentes métodos
- ✅ **Interface Responsiva**: Design moderno e adaptável a diferentes telas
- ✅ **Cálculo Automático**: Total com impostos calculados automaticamente
- ✅ **LocalStorage**: Armazenamento local de ID do cliente e carrinho

## 📋 Pré-requisitos

- Node.js 14.0 ou superior
- npm ou yarn
- Backend Basket Service rodando em `http://localhost:8080`

## 🚀 Instalação e Execução

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Inicie o servidor de desenvolvimento

```bash
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

### 3. Build para produção

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProductList.js      # Componente de listagem de produtos
│   │   └── Basket.js           # Componente do carrinho
│   ├── services/
│   │   └── api.js              # Cliente HTTP com Axios
│   ├── styles/
│   │   ├── App.css             # Estilos principais
│   │   ├── ProductList.css     # Estilos de produtos
│   │   └── Basket.css          # Estilos do carrinho
│   ├── App.js                  # Componente principal
│   ├── index.js                # Entrada da aplicação
│   └── index.css               # Estilos globais
├── package.json
└── .gitignore
```

## 🔌 Componentes

### ProductList.js
- Carrega todos os produtos da API
- Exibe em grid responsivo
- Botão para adicionar ao carrinho
- Tratamento de erros e carregamento

### Basket.js
- Exibe itens do carrinho
- Permite alterar quantidades
- Calcula total com impostos
- Salva/Atualiza carrinho no servidor
- Processa pagamentos
- Deleta carrinho

## 🌐 Integração com API

O projeto se integra com os seguintes endpoints:

```javascript
// Produtos
GET  /product              // Listar todos os produtos
GET  /product/{id}         // Buscar produto por ID

// Carrinho
POST   /basket             // Criar novo carrinho
GET    /basket/{id}        // Buscar carrinho por ID
PUT    /basket/{id}        // Atualizar carrinho
DELETE /basket/{id}/delete // Deletar carrinho
PUT    /basket/{id}/payment// Processar pagamento
```

## 🔧 Configuração do Backend

Certifique-se de que o backend está configurado para aceitar requisições CORS:

O arquivo `public/index.html` e a configuração de desenvolvimento usam a URL base:
```
http://localhost:8080
```

Se o backend estiver em uma porta ou host diferente, altere em `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:8080'; // Altere aqui
```

## 💾 LocalStorage

A aplicação usa LocalStorage para armazenar:
- `basketId`: ID do carrinho atual
- `clientId`: ID do cliente

## 📱 Responsividade

A interface se adapta para:
- Desktop (1400px+)
- Tablet (768px - 1399px)
- Mobile (< 768px)

## 🎨 Estilos e Tema

- Cores: Roxo (#667eea) e gradientes naturais
- Tipografia: System fonts para performance
- Animações: Suaves e responsivas
- Ícones: Unicode emojis para simplicidade

## 🚀 Fluxo de Usuário

1. **Visualizar Produtos** → Produtos são carregados da API Platzi
2. **Adicionar ao Carrinho** → Produtos são adicionados localmente
3. **Inserir ID do Cliente** → Necessário para salvar do carrinho
4. **Criar/Atualizar Carrinho** → Salva no MongoDB via API
5. **Processar Pagamento** → Simula uma transação
6. **Gerenciar Carrinho** → Atualizar, remover ou deletar

## 🔍 Recursos Técnicos

- **React Hooks**: useState, useEffect para gerenciamento de estado
- **Axios**: Cliente HTTP para requisições
- **CSS Grid**: Layout responsivo
- **Flexbox**: Alinhamento e distribuição
- **LocalStorage API**: Persistência de dados locais
- **Modais**: Para confirmações e formulários

## 🐛 Tratamento de Erros

- Erro ao carregar produtos
- Erro ao salvar carrinho
- Erro ao processar pagamento
- Mensagens de sucesso e erro visuais

## ⚡ Performance

- Lazy loading de imagens
- Imagens placeholder para produtos sem imagem
- Debounce em atualizações
- Caching local com LocalStorage

## 📝 Dependências Principais

- **react**: Framework UI
- **react-dom**: Renderização DOM
- **axios**: Cliente HTTP

## 🔐 Segurança

- Validação de inputs
- Sanitização de dados
- Requisições HTTPS recomendadas
- Senhas em variáveis de ambiente

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique se o backend está rodando
2. Verifique a porta (8080)
3. Limpe o cache do navegador
4. Abra o inspetor de erros (F12)

## 📄 Scripts Disponíveis

```bash
npm start      # Inicia desenvolvimento
npm run build  # Produção
npm test       # Testes
npm run eject  # Expoe configurações (irreversível)
```

---

**Desenvolvido com ❤️ usando React**

