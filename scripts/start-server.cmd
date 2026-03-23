@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_DIR=%ROOT%\.tools\node-v22.22.1-win-x64"
set "NODE_EXE=%NODE_DIR%\node.exe"
set "LOG_OUT=%ROOT%\server.log"
set "LOG_ERR=%ROOT%\server.err.log"

if not exist "%NODE_EXE%" (
  echo Node runtime not found at %NODE_EXE%
  exit /b 1
)

del /f /q "%LOG_OUT%" 2>nul
del /f /q "%LOG_ERR%" 2>nul

start "spin-server" /b cmd /c ""%NODE_EXE%" "%ROOT%\server\index.js" 1>"%LOG_OUT%" 2>"%LOG_ERR%""

echo Server starting...
echo stdout: %LOG_OUT%
echo stderr: %LOG_ERR%
