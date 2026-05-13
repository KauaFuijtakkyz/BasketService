# Guia de Início Rápido - Basket Service Frontend

## 📦 Instalação Rápida

```bash
# Navegue até a pasta frontend
cd frontend

# Instale as dependências
npm install

# Inicie a aplicação
npm start
```

A aplicação abrirá em `http://localhost:3000`

## 🔗 Pré-requisitos

### Backend deve estar rodando:
```bash
# Na pasta do projeto backend
mvn spring-boot:run
```

### Serviços necessários:
- MongoDB em localhost:27017
- Redis em localhost:6379

## 🎮 Como Usar

### 1. **Conectar ao Backend**
   - Certifique-se que a API está em `http://localhost:8080`
   - Se diferente, altere em `src/services/api.js`

### 2. **Visualizar Produtos**
   - Clique na aba "📦 Produtos"
   - Veja a lista de produtos da API Platzi
   - Clique em "Adicionar" para adicionar ao carrinho

### 3. **Gerenciar Carrinho**
   - Clique na aba "🛒 Carrinho"
   - Insira o ID do cliente (ex: 1, 2, 3...)
   - Ajuste quantidades dos produtos
   - Clique em "Criar Carrinho" para salvar

### 4. **Processar Pagamento**
   - Com carrinho criado, clique "Processar Pagamento"
   - Escolha método de pagamento
   - Insira ID da transação (ex: TXN123456)
   - Clique em "Confirmar Pagamento"

### 5. **Deletar Carrinho**
   - Com carrinho criado, clique "Deletar Carrinho"
   - Confirme a exclusão

## 🎨 Interface

- **Header roxo**: Mostra título e contador de itens
- **Abas**: Alternar entre Produtos e Carrinho
- **Grid de Produtos**: Mostra produtos em cards
- **Carrinho**: Lista de itens com total e ações

## 💡 Dicas

- O ID do cliente e do carrinho são salvos automaticamente
- Imagens de produtos veem de: https://api.escuelajs.co
- Impostos são calculados automaticamente (10%)
- Mensagens verdes = sucesso, vermelhas = erro

## ❌ Troubleshooting

### "Erro ao carregar produtos"
→ Verifique se o backend está rodando em localhost:8080

### "CORS error"
→ O backend pode estar em outra porta, verifique application.yml

### "Conectar ao banco de dados"
→ MongoDB e Redis devem estar rodando localmente

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Celulares e tablets (responsivo)
- ✅ Modo escuro suportado (CSS nativo)

---

**Pronto para começar? Execute `npm start` e divirta-se! 🚀**

