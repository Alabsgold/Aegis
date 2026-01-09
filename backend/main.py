from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

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

from routers import ingest

app.include_router(ingest.router)

@app.get("/")
def read_root():
    return {"status": "active", "message": "Aegis AI Backend is running"}
