from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Only load .env file if it exists and we are not in a production environment
# Render sets RENDER=true, so we can check for that or just check if .env exists
if os.path.exists(".env") and os.getenv("RENDER") is None:
    load_dotenv()

app = FastAPI(title="Aegis AI", description="The Adaptive, Curriculum-Aware Exam Preparation Ecosystem")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

@app.middleware("http")
async def verify_secret(request: Request, call_next):
    # Allow health check without secret
    if request.url.path == "/" or request.url.path == "/docs" or request.url.path == "/openapi.json":
        return await call_next(request)
    
    # Check for secret in headers
    expected_secret = os.getenv("AEGIS_INTERNAL_SECRET")
    
    # If secret is set in env, enforce it. 
    # If not set (local dev default), we might skip or warn. 
    # For strict security as requested, we enforce if it's a production-like env or just enforce it always if user sets it.
    if expected_secret:
        auth_header = request.headers.get("X-Aegis-Secret")
        if auth_header != expected_secret:
            return JSONResponse(status_code=403, content={"detail": "Unauthorized: Invalid Secret"})
            
    return await call_next(request)

from routers import ingest

app.include_router(ingest.router)

@app.get("/")
def read_root():
    return {"status": "active", "message": "Aegis AI Backend is running"}
