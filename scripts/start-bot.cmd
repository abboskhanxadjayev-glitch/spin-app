@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_DIR=%ROOT%\.tools\node-v22.22.1-win-x64"
set "NODE_EXE=%NODE_DIR%\node.exe"
set "LOG_OUT=%ROOT%\bot.log"
set "LOG_ERR=%ROOT%\bot.err.log"

if not exist "%NODE_EXE%" (
  echo Node runtime not found at %NODE_EXE%
  exit /b 1
)

del /f /q "%LOG_OUT%" 2>nul
del /f /q "%LOG_ERR%" 2>nul

start "spin-bot" /b cmd /c ""%NODE_EXE%" "%ROOT%\bot\index.js" 1>"%LOG_OUT%" 2>"%LOG_ERR%""

echo Bot starting...
echo stdout: %LOG_OUT%
echo stderr: %LOG_ERR%
