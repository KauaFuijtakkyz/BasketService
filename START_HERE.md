# ⚡ 3 Minutos para Começar!

## 🎯 Versão RÁPIDA (Sem Leitura)

Se está com pressa, copie e cole isto:

### Windows:
```powershell
cd C:\Users\User\projetos\basketservice
.\start-all.cmd
```

### Linux/Mac:
```bash
cd ~/projetos/basketservice
chmod +x start-all.sh
./start-all.sh
```

**PRONTO! Espera 2-3 mins e abre `http://localhost:3000`**

---

## ❓ "E se não funcionar?"

### Erro 1: "Port already in use"
```powershell
# Feche os terminais abertos e tente novamente
```

### Erro 2: "MongoDB connection"
```powershell
# Verifique Docker
docker ps

# Se não vir mongodb e redis, execute
docker-compose up -d
```

### Erro 3: "Cannot GET /product"
```
Backend não está rodando.
Verifique se aparece:
"Started BasketserviceApplication"
nos logs
```

### Erro 4: "npm: command not found"
```
Instale Node.js:
https://nodejs.org (versão LTS)
```

---

## 🎮 Usando a App (Passo a Passo)

### 1️⃣ Adicionar Produto ao Carrinho
```
App abre → "📦 Produtos"
           ↓
        Vê 20+ produtos
           ↓
        Clica "Adicionar" em qualquer um
           ↓
        Alerta aparece
           ↓
        Contador no topo aumenta 🛒 [1]
```

### 2️⃣ Ir para o Carrinho
```
Clica "🛒 Carrinho"
           ↓
Produto aparece na lista
           ↓
Preenche ID de Cliente (ex: 1)
```

### 3️⃣ Salvar Carrinho
```
Clica "Criar Carrinho"
           ↓
Mensagem verde: "Criado com sucesso!"
           ↓
ID do carrinho salvo automaticamente
```

### 4️⃣ Pagar
```
Clica "Processar Pagamento"
           ↓
Modal abre
           ↓
Escolhe método (Crédito, Débito, PIX, Boleto)
           ↓
Insere ID transação (ex: TXN123)
           ↓
Clica "Confirmar Pagamento"
           ↓
Mensagem verde: "Pago com sucesso!"
```

---

## 📱 Interface Visual

```
┌──────────────────────────────────────────┐
│ 🛍️ Basket Service           🛒 [3 itens]│
├──────────────────────────────────────────┤
│ 📦 Produtos  |  🛒 Carrinho             │
├──────────────────────────────────────────┤
│                                          │
│ ID Cliente: [1]                         │
│                                          │
│ Produto A    Qtd: [2]   $199.98  [❌]   │
│ Produto B    Qtd: [1]   $49.99   [❌]   │
│ Produto C    Qtd: [1]   $129.99  [❌]   │
│                                          │
│ Subtotal:            $379.96             │
│ Imposto:             $37.99              │
│ TOTAL:               $417.95             │
│                                          │
│ [Criar] [Pagar] [Deletar]               │
└──────────────────────────────────────────┘
```

---

## 🔍 Verificar se Está Funcionando

### Checklist:

1. App abriu em http://localhost:3000?
   - [ ] SIM → Próximo!
   - [ ] NÃO → `npm start` não funcionou

2. Vê o header roxo?
   - [ ] SIM → Próximo!
   - [ ] NÃO → CSS não carregou

3. Clica "Produtos" e vê 20+ itens?
   - [ ] SIM → Backend funcionando!
   - [ ] NÃO → Backend desligado (8080)

4. Clica "Adicionar" em um produto?
   - [ ] SIM → Frontend OK!
   - [ ] NÃO → Erro na integração

5. Contador no topo aumenta?
   - [ ] SIM → Estado React OK!
   - [ ] NÃO → Problema no componente

6. Preenche ID cliente e clica "Criar"?
   - [ ] SIM → Mensagem aparece?
   - [ ] NÃO → Erro na conexão com backend

**Se tudo em SIM, tudo está funcionando! 🎉**

---

## 📊 O que funciona agora

✅ Ver produtos (API Platzi)
✅ Adicionar ao carrinho
✅ Editar quantidades
✅ Remover produtos
✅ Salvar carrinho (MongoDB)
✅ Processar pagamento
✅ Deletar carrinho
✅ Salva automaticamente (LocalStorage)
✅ Interface responsiva
✅ Mensagens de erro/sucesso

---

## 🚀 Próximas Ações

### Opção 1: Explorar a Aplicação
```
1. Adicione vários produtos
2. Altere quantidades
3. Processe pagamento diferente
4. Teste deletar
5. Refresca a página (dados persistem!)
```

### Opção 2: Ler a Documentação
```
Veja: GETTING_STARTED.md
Veja: ARCHITECTURE.md
Veja: frontend/README.md
```

### Opção 3: Explorar o Código
```
Abra: frontend/src/components/ProductList.js
Abra: frontend/src/components/Basket.js
Abra: frontend/src/services/api.js
```

---

## ⚙️ Hardcoded Values (Se Precisar Mudar)

### URL do Backend
Arquivo: `frontend/src/services/api.js`
```javascript
const API_URL = 'http://localhost:8080'; // ← Mude aqui se necessário
```

### Porta do Frontend
```bash
PORT=3001 npm start  # Muda para 3001 se 3000 estiver ocupada
```

---

## 🎁 Arquivos Importantes

```
📖 GETTING_STARTED.md     ← Você está aqui! (rápido e visual)
📖 frontend/QUICKSTART.md ← Intro ao frontend
📖 INSTALLATION.md        ← Setup completo
📖 ARCHITECTURE.md        ← Como funciona por trás
```

---

## 💡 Dicas Úteis

1. **Devtools**: Pressione F12 para ver erros
2. **LocalStorage**: Apps salva dados no navegador
3. **ID Cliente**: Qualquer número funciona (ex: 1, 999, etc)
4. **ID Transação**: Qualquer texto funciona (ex: TXN123)
5. **Produtos**: Vêm da API Platzi (externa)
6. **Backend**: Deve estar rodando em 8080
7. **Carrinho**: Salvo no MongoDB após criar
8. **Refresh**: Dados persistem se gravou no backend

---

## 🎯 Se Tudo Funcionar

Parabéns! Você tem:
- ✅ React app funcionando
- ✅ Backend conectado
- ✅ Banco de dados persistindo
- ✅ Sistema de pagamento simulado
- ✅ Interface responsiva
- ✅ Aplicação e-commerce completa!

**PRÓXIMO PASSO: Explorar e aproveitar! 🚀**

---

## 🆘 Último Recurso (Se Nada Funcionar)

```powershell
# Limpe tudo
cd frontend
rm -r node_modules
npm cache clean --force

# Reinstale
npm install

# Reinicie backend (novo terminal)
mvn spring-boot:run

# Reinicie frontend (novo terminal)
npm start
```

---

**Tempo Total Esperado: 2-3 MINUTOS**

**Status: 🟢 PRONTO PARA USAR**

---

*Enjoy! 🎉*

