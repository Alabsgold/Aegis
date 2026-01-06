import sys
import importlib

packages = [
    "fastapi",
    "uvicorn",
    "python_multipart",
    "chromadb",
    "google.generativeai",
    "groq",
    "pypdf",
    "dotenv"
]

print("Verifying Backend Dependencies...")
missing = []
for package in packages:
    try:
        importlib.import_module(package)
        print(f"✅ {package} installed")
    except ImportError as e:
        print(f"❌ {package} MISSING ({e})")
        missing.append(package)

if missing:
    print(f"\nMissing packages: {', '.join(missing)}")
    sys.exit(1)
else:
    print("\nAll backend dependencies are installed!")
    sys.exit(0)
