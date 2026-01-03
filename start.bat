@echo off
REM AI Pattern & Sickness Detection System - Windows Startup Script

echo ========================================
echo   AI Pattern Detection System
echo ========================================
echo.

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed.
    echo Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js 16 or higher.
    pause
    exit /b 1
)

echo Prerequisites check passed
echo.

REM Start Backend
echo Starting Backend Server...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies if needed
if not exist "venv\.installed" (
    echo Installing backend dependencies...
    pip install -r requirements.txt
    type nul > venv\.installed
)

REM Start backend in new window
start "Backend Server" cmd /k python app.py

cd ..

REM Start Frontend
echo.
echo Starting Frontend Server...
cd frontend

REM Install dependencies if needed
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
)

REM Start frontend in new window
start "Frontend Server" cmd /k npm start

cd ..

echo.
echo ========================================
echo   Application Started!
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the command windows to stop the servers
echo ========================================
pause
