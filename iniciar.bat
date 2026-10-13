@echo off
title Juridiques - Servidor de Desenvolvimento
color 0A

echo.
echo  ===================================================
echo   JURIDIQUES - Iniciando servidor de desenvolvimento
echo  ===================================================
echo.

:: Vai para a pasta do projeto (mesma pasta do .bat)
cd /d "%~dp0"

:: Verifica se Node.js esta disponivel
where node >nul 2>nul
if errorlevel 1 (
    echo  [ERRO] Node.js nao encontrado no PATH.
    echo.
    echo  Instale o Node.js 20+ em https://nodejs.org e tente novamente.
    echo  Apos instalar, feche e reabra este terminal.
    echo.
    pause
    exit /b 1
)

:: Verifica se npm esta disponivel
where npm >nul 2>nul
if errorlevel 1 (
    echo  [ERRO] npm nao encontrado no PATH.
    echo.
    echo  O npm acompanha o Node.js. Reinstale o Node.js 20+ em https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js e npm encontrados.
echo.

:: Verifica se node_modules existe
if not exist "node_modules\" (
    echo  [!] Dependencias nao encontradas. Instalando...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo  [ERRO] Falha ao instalar dependencias. Verifique sua conexao e tente novamente.
        echo.
        pause
        exit /b 1
    )
    echo.
)

echo  [OK] Iniciando servidor em http://localhost:5173
echo  [  ] Pressione Ctrl+C para encerrar
echo.

:: Abre o navegador apos 2 segundos
start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173"

:: Inicia o servidor
call npm run dev

pause
