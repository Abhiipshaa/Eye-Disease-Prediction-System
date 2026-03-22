@echo off
echo Starting EyeScreen AI...
echo.

echo [1/2] Starting Flask Backend on http://localhost:5000
start "EyeScreen Backend" cmd /k "cd Backend && python app.py"

timeout /t 2 /nobreak >nul

echo [2/2] Starting React Frontend on http://localhost:5173
start "EyeScreen Frontend" cmd /k "cd Frontend && npm run dev"

echo.
echo Both servers are starting...
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo.
pause
