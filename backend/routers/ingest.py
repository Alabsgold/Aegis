from fastapi import APIRouter, UploadFile, File, HTTPException
import pypdf
import io
import os
import google.generativeai as genai

router = APIRouter()

# Configure Gemini (Ensure API key is set in main or here, ideally passed or global)
# For now, relying on os.environ which should be loaded by main.py
if "GOOGLE_API_KEY" in os.environ:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

@router.post("/ingest")
async def ingest_file(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    content = await file.read()
    
    # 1. Text Extraction
    try:
        pdf_reader = pypdf.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")

    # 2. Gemini Flash-Lite Integration (Context Mapping)
    # Using gemini-1.5-flash as 'flash-lite' proxy if not available, or check specific model name
    try:
        model = genai.GenerativeModel('gemini-1.5-flash') 
        prompt = f"Identify the 5 key themes, all formulas, and the syllabus structure of this document. Return as JSON."
        # Note: Depending on text length, might need chunking or file API. 
        # For simplicity, sending text directly if within limits. 
        # 1M tokens is plenty for most textbooks.
        response = model.generate_content([prompt, text])
        summary = response.text
    except Exception as e:
        summary = f"AI Processing Failed: {str(e)}"

    return {"filename": file.filename, "extracted_text_length": len(text), "summary": summary}
