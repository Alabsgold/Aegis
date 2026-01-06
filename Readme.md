# 🛡️ Aegis AI (Zero-Cost Edition)
>
> The Adaptive, Curriculum-Aware Exam Preparation Ecosystem.
> Built on a **$0.00 Tech Stack** using a Hybrid Gemini + Groq Architecture.

## 📖 Overview

Aegis AI is an intelligent study partner designed to solve the problem of generic, static exam prep. Unlike standard chatbots, Aegis understands your specific **Syllabus (CCMAS)**, reads your entire textbook, and adapts to your learning gaps in real-time.

It achieves this using a unique **"Tag Team" AI Architecture** that maximizes free-tier limits:

* **Deep Reading**: Uses **Google Gemini 2.5 Flash-Lite** (1M Token Context) to read massive PDFs.
* **Fast Thinking**: Uses **Groq (Llama-3)** for high-speed, low-latency Q&A and quizzes.

## ⚡ The "Zero-Cost" Architecture

We bypass paid API limits by splitting the workload:

| Role | Engine | Why? |
| :--- | :--- | :--- |
| **The Reader** | **Gemini 2.5 Flash-Lite** | Can ingest a 500-page textbook in one go (1M context window). |
| **The Speedster** | **Groq (Llama-3 70B)** | Blazing fast inference (~300 tokens/s) with high daily limits for chat. |
| **The Memory** | **ChromaDB + Gemini Embeddings** | Stores your course data locally for free retrieval (RAG). |

## 🌟 Key Features

### 1. 📚 Smart Ingestion

* **Drag & Drop**: Upload PDF, DOCX, or TXT.
* **Auto-Structure**: The AI maps your course into Chapters, Key Concepts, and Formulas.
* **CCMAS Integration**: If you don't have notes, input your Major & Level (e.g., Computer Science 200L) to auto-generate a syllabus based on National Standards.

### 2. 🎯 Adaptive Practice Engine

* **Objective Mode**: Rapid-fire MCQs generated instantly by Groq.
* **Socratic Mode**: The AI acts as a **strict tutor**. It asks open-ended questions and grades your typed answers based on keywords and logic.
* **Live Workarounds**: If you fail a concept 3 times, the quiz pauses. The AI delivers a "Micro-Lesson" (analogy or summary) to fix the gap before moving on.

### 3. 📊 Analytics (The Heatmap)

* Visualizes your syllabus as a tree map.
* **Red**: Needs work.
* **Green**: Mastered.
* **Fatigue Detection**: Suggests breaks when your response time slows down.

## 🛠️ Tech Stack

* **Backend**: Python (FastAPI)
* **Orchestration**: LangChain
* **Vector Database**: ChromaDB (Local)
* **AI Models**:
  * **Reading**: `gemini-2.5-flash-lite`
  * **Chatting**: `llama3-70b-8192` (via Groq)
* **Backend**: Python (FastAPI)
* **Orchestration**: LangChain
* **Vector Database**: ChromaDB (Local)
* **AI Models**:
  * **Reading**: `gemini-2.5-flash-lite`
  * **Chatting**: `llama3-70b-8192` (via Groq)
  * **Embeddings**: `models/gemini-embedding-1.0`
* **Frontend**: Flutter (Mobile/Web)

## 🚀 Getting Started

### 1. Prerequisites

* Python 3.10+ installed.
* Node.js installed.
* Git installed.

### 2. Setup Backend

We have provided a helper script for Windows:

```bash
setup_backend.bat
```

This will:

* Create a virtual environment.
* Install all dependencies (FastAPI, Google Gemini, Groq, ChromaDB, PyPDF).
* **Manual Step**: If the script finishes, you can run the server with:

    ```bash
    uvicorn backend.main:app --reload
    ```

### 3. Setup Frontend

We have provided a helper script for Windows:

```bash
setup_frontend.bat
```

This will:

* Install Next.js dependencies.
* Install UI libraries (Lucide, Framer Motion, Next Themes).
* **Manual Step**: To start the web app:

    ```bash
    cd frontend
    npm run dev
    ```

### 4. API Keys

Ensure your `.env` file is in the root directory with:

```env
GOOGLE_API_KEY=...
GROQ_API_KEY=...
```

## 🗺️ Roadmap

* [ ] **Phase 1: Ingestion Engine** (PDF -> Vector Store)

* [ ] **Phase 2: Quiz Logic** (Groq Integration for MCQs)
* [ ] **Phase 3: Socratic Grading** (Logic for grading text answers)
* [ ] **Phase 4: CCMAS Module** (Integrate National Curriculum data)
* [ ] **Phase 5: Frontend** (Flutter App connection)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT
