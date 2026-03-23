@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_DIR=%ROOT%\.tools\node-v22.22.1-win-x64"
set "NODE_EXE=%NODE_DIR%\node.exe"
set "LOG_OUT=%ROOT%\server.log"
set "LOG_ERR=%ROOT%\server.err.log"

if not exist "%NODE_EXE%" (
  echo Node runtime not found at %NODE_EXE%>>"%LOG_ERR%"
  exit /b 1
)

cd /d "%ROOT%"
"%NODE_EXE%" "%ROOT%\server\index.js" 1>>"%LOG_OUT%" 2>>"%LOG_ERR%"
