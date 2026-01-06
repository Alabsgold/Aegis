@echo off
echo Setting up Aegis Backend...
python -m venv venv
call venv\Scripts\activate
pip install -r backend\requirements.txt
echo Backend setup complete. To run: uvicorn backend.main:app --reload
pause
