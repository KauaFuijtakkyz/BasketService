# Documentação - Como Executar o Projeto Completo

## 📋 Índice
1. [Instalação de Dependências](#instalação-de-dependências)
2. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
3. [Iniciar Backend](#iniciar-backend)
4. [Iniciar Frontend](#iniciar-frontend)
5. [Verificar Saúde da Aplicação](#verificar-saúde-da-aplicação)
6. [Solução de Problemas](#solução-de-problemas)

## ✅ Instalação de Dependências

### Windows

#### 1. Node.js
```
1. Visite https://nodejs.org
2. Baixe versão LTS (14+)
3. Execute o instalador
4. Reinicie o computador
5. Abra PowerShell e verifique:
   node --version
   npm --version
```

#### 2. Java (já instalado para Maven)
```
Verifique:
   java -version
```

#### 3. Maven
```
1. Visite https://maven.apache.org
2. Baixe binário
3. Extraia em C:\Program Files
4. Adicione à variável PATH:
   - Abra "Variáveis de Ambiente"
   - Edite PATH do sistema
   - Adicione: C:\Program Files\apache-maven-3.x.x\bin
5. Reinicie computador
6. Verifique:
   mvn --version
```

#### 4. Docker Desktop
```
1. Visite https://docker.com/products/docker-desktop
2. Baixe para Windows
3. Execute instalador
4. Reinicie computador
5. Verifique:
   docker --version
   docker-compose --version
```

### Linux/Mac

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm default-jdk maven docker.io

# Verificar
node --version
npm --version
java -version
mvn --version
docker --version

# Mac (com Homebrew)
brew install node java maven docker
```

## 🗄️ Configuração do Banco de Dados

### Opção 1: Docker Compose (Recomendado)

```bash
# Na raiz do projeto
docker-compose up -d

# Verificar
docker ps

# Você deverá ver:
# - basket-mongodb (porta 27017)
# - basket-redis (porta 6379)
```

### Opção 2: Instalação Local

#### MongoDB

**Windows:**
```
1. Visite https://mongodb.com/try/download/community
2. Baixe Community Server
3. Execute instalador
4. Escolha "Install MongoDB as a Service"
5. Execute: mongod
```

**Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### Redis

**Windows (WSL recomendado):**
```bash
# Instale WSL2 primeiro
# Depois:
wsl --install ubuntu
wsl
sudo apt-get install redis-server
redis-server
```

**Linux:**
```bash
sudo apt-get install redis-server
redis-server
```

## 🚀 Iniciar Backend

### 1. Compile o Projeto
```bash
cd C:\Users\User\projetos\basketservice
mvn clean install
```

### 2. Inicie o Servidor Spring Boot
```bash
mvn spring-boot:run
```

Esperado em `http://localhost:8080`

```
  ____                  _            __ _
 / __ \ _   _  _ __   | |_   ___   / _` |
| |  | || | | || '_ \  | __| / _ \ | (_| |
| |__| || |_| || |_) | | |_ | (_) || (_| |
 \___\_\ \__,_|| .__/   \__| \___/  \__,_|
              | |
              |_|

Started BasketserviceApplication in 2.5 seconds
```

## 🌐 Iniciar Frontend

### 1. Abra novo terminal

```bash
cd C:\Users\User\projetos\basketservice\frontend
```

### 2. Instale Dependências (primeira vez)

```bash
npm install
```

### 3. Inicie Servidor de Desenvolvimento

```bash
npm start
```

Esperado em `http://localhost:3000`

```
Compiled successfully!

You can now view basket-service-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

## ✨ Verificar Saúde da Aplicação

### Testar Backend

```bash
# Listar produtos
curl -X GET http://localhost:8080/product

# Resposta esperada:
[
  {
    "id": 1,
    "title": "Producto 1",
    "price": 299.99,
    ...
  },
  ...
]
```

### Testar Frontend

Acesse no navegador: `http://localhost:3000`

Você deverá ver:
- ✅ Header roxo com logo
- ✅ Abas "📦 Produtos" e "🛒 Carrinho"
- ✅ Grid de produtos carregando
- ✅ Console sem erros (F12)

## 🎯 Guia de Uso Completo

### 1. Adicionar Produtos ao Carrinho
```
1. Clique "📦 Produtos"
2. Aguarde carregar (vai buscar da API Platzi)
3. Clique "Adicionar" em qualquer produto
4. Produto aparece no contador (canto superior)
```

### 2. Criar Carrinho
```
1. Clique "🛒 Carrinho"
2. Digite ID do cliente (ex: 1)
3. Verifique os itens adicionados
4. Clique "Criar Carrinho"
5. Mensagem verde de sucesso
6. ID do carrinho é salvo
```

### 3. Processar Pagamento
```
1. Com carrinho criado
2. Clique "Processar Pagamento"
3. Modal abre
4. Escolha método: Cartão, Débito, PIX ou Boleto
5. Digite ID transação (ex: TXN123456)
6. Clique "Confirmar Pagamento"
7. Mensagem de sucesso
```

### 4. Atualizar Carrinho
```
1. Altere quantidades
2. Remova itens com botão vermelho
3. Clique "Atualizar Carrinho"
4. Mudanças são persistidas
```

## 🐛 Solução de Problemas

### Erro: "Could not connect to localhost:27017"

**Solução:**
```bash
# Verificar se MongoDB está rodando
docker ps

# Ou iniciar manualmente
docker-compose up -d mongodb
```

### Erro: "ECONNREFUSED 127.0.0.1:6379"

**Solução:**
```bash
# Iniciar Redis
docker-compose up -d redis

# Ou manualmente
redis-server
```

### Erro: "ERR! code ERR_MODULE_NOT_FOUND"

**Solução:**
```bash
cd frontend
rm -rf node_modules
npm cache clean --force
npm install
```

### Frontend não conecta ao backend

**Solução em `frontend/src/services/api.js`:**
```javascript
// Verifique a URL
const API_URL = 'http://localhost:8080';

// Se backend está em outra porta, altere para:
const API_URL = 'http://localhost:9000'; // ou outra porta
```

### Port já está em uso

**Encontrar processo:**
```bash
# Encontrar o que está usando porta 3000
netstat -ano | findstr :3000

# Matar processo (Windows)
taskkill /PID <PID> /F

# Ou usar porta diferente
PORT=3001 npm start
```

### MongoDB conexão recusada

**Windows PowerShell:**
```bash
# Verificar serviços
Get-Service | where {$_.Name -like "*mongod*"}

# Iniciar serviço
Start-Service MongoDB
```

## 📊 Verificar Portas em Uso

```bash
# Windows - Verificar portas
netstat -ano | findstr LISTENING

# Esperado:
# :3000 - Frontend React
# :8080 - Backend Spring Boot
# :27017 - MongoDB
# :6379 - Redis
```

## 🔄 Reiniciar Tudo

```bash
# Windows
# Feche todos os terminais
# Execute:
.\start-all.cmd

# Ou Linux/Mac
chmod +x start-all.sh
./start-all.sh
```

## 📁 Estrutura Esperada

```
basketservice/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── dev/java/ecommerce/basketservice/
│   │   │       ├── Controller/
│   │   │       ├── Service/
│   │   │       ├── Entity/
│   │   │       ├── Repository/
│   │   │       └── Client/
│   │   └── resources/
│   │       └── application.yml
│   └── test/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── pom.xml
├── docker-compose.yml
├── start-all.cmd (Windows)
├── start-all.sh (Linux/Mac)
└── README.md
```

## ✅ Checklist Final

- [ ] Docker Desktop instalado e rodando
- [ ] MongoDB rodando (docker ou local)
- [ ] Redis rodando (docker ou local)
- [ ] Backend compilado com sucesso
- [ ] Backend rodando em :8080
- [ ] Frontend rodando em :3000
- [ ] Produtos carregando na UI
- [ ] Adicionar aos carrinho funciona
- [ ] Criar carrinho funciona
- [ ] Salvar ID do cliente funciona
- [ ] Pagamento funciona
- [ ] Sem erros no console (F12)

## 🎉 Tudo Pronto!

Se todos os itens do checklist estão verificados, você está pronto para usar o Basket Service completo!

---

## 📞 Suporte Adicional

Se tiver problemas:
1. Verifique os logs dos serviços
2. Limpe caches (npm cache clean --force)
3. Reinicie o Docker e serviços
4. Verifique portas com netstat
5. Verifique firewall do windows

**Última atualização**: 2025

