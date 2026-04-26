@echo off

REM ================================
REM Check if Ollama CLI is installed
REM ================================
where ollama >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo ERROR: Ollama CLI not found.
  echo Please install Ollama from https://ollama.com/docs/install and restart terminal.
  pause
  exit /b 1
)

REM ================================
REM Pull Ollama models
REM ================================
echo Pulling required Ollama models...
ollama pull llama3.2
IF %ERRORLEVEL% NEQ 0 (
  echo Failed to pull llama3.2. Check Ollama installation.
  pause
  exit /b 1
)

ollama pull mxbai-embed-large
IF %ERRORLEVEL% NEQ 0 (
  echo Failed to pull mxbai-embed-large. Check Ollama installation.
  pause
  exit /b 1
)

echo Ollama models downloaded successfully.
echo.

REM ================================
REM Backend (FastAPI) setup
REM ================================
echo Setting up FastAPI backend...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt
call venv\Scripts\deactivate.bat
cd ..

REM ================================
REM Backend (Node/Mongo) setup
REM ================================
echo Skipping Node backend dependency install (if located in a different folder, run npm install there).
echo.

REM ================================
REM Frontend setup
REM ================================
echo Setting up frontend...
cd frontend
npm install
cd ..
echo.

REM ================================
REM Completion message
REM ================================
echo Setup complete!
echo.
echo ----------------------------------------
echo To run FastAPI backend (AI service):
echo    cd backend
echo    call venv\Scripts\activate.bat
echo    uvicorn main:app --reload --port 9001
echo.
echo To run Node backend (Mongo API):
echo    cd backend
echo    npm run dev
echo.
echo To run React frontend:
echo    cd frontend
echo    npm run dev
echo ----------------------------------------
pause
