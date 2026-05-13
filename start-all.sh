#!/bin/bash
# Script para iniciar todos os serviços do Basket Service

echo "🚀 Iniciando Basket Service..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 14+ antes de continuar."
    exit 1
fi

# Verificar se Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não está instalado. Por favor, instale Maven antes de continuar."
    exit 1
fi

echo "📦 Verificando dependências do Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências do Frontend..."
    npm install
else
    echo "✅ Dependências do Frontend já estão instaladas"
fi

echo ""
echo "🌐 Iniciando Frontend em http://localhost:3000..."
npm start &
FRONTEND_PID=$!

echo ""
echo "⏳ Aguarde um momento..."
sleep 3

cd ..

echo ""
echo "📱 Iniciando Backend em http://localhost:8080..."
mvn spring-boot:run &
BACKEND_PID=$!

echo ""
echo "✅ Serviços iniciados!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo ""
echo "📝 Pressione Ctrl+C para parar todos os serviços"
echo ""

# Aguarda sinais de interrupção
wait

