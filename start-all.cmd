@echo off
REM Script para iniciar todos os serviços do Basket Service (Windows)

echo.
echo 🚀 Iniciando Basket Service...
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js não está instalado. Por favor, instale Node.js 14+ antes de continuar.
    exit /b 1
)

REM Verificar se Maven está instalado
where mvn >nul 2>nul
if errorlevel 1 (
    echo ❌ Maven não está instalado. Por favor, instale Maven antes de continuar.
    exit /b 1
)

echo 📦 Verificando dependências do Frontend...
cd frontend

if not exist "node_modules" (
    echo 📥 Instalando dependências do Frontend...
    call npm install
) else (
    echo ✅ Dependências do Frontend já estão instaladas
)

echo.
echo 🌐 Iniciando Frontend em http://localhost:3000...
start cmd /k npm start

cd ..
echo.
echo 📱 Iniciando Backend em http://localhost:8080...
start cmd /k mvn spring-boot:run

echo.
echo ✅ Serviços iniciados!
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8080
echo.
echo 📝 Feche as janelas de terminal para parar os serviços
echo.
pause

