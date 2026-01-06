# 📘 Project Aegis: FRD v2.0 (Zero-Cost Edition)
**Status:** Approved for Development | **Stack:** Groq / Gemini / ChromaDB

## 1. Executive Summary
Aegis AI is a curriculum-aware, adaptive exam preparation platform. It functions as a "Live Academic Partner," ingesting course materials and cross-referencing them with CCMAS (Core Curriculum Minimum Academic Standards) to generate personalized study plans, quizzes, and real-time remedial feedback.

**Key Differentiator:** It operates on a **$0.00 Tech Stack** by leveraging the high-context capabilities of **Google Gemini** for reading and the high-speed inference of **Groq (Llama-3)** for real-time interaction.

## 2. Technical Architecture (The "Free Hybrid" Stack)
This project uses a "Tag Team" architecture to avoid API costs and rate limits.

| Component | Technology | Role | Reason |
| :--- | :--- | :--- | :--- |
| **Reader** | Gemini 2.5 Flash-Lite | Heavy Lifter | 1M token context allows reading entire textbooks in one pass. |
| **Chat/Quiz** | Groq (Llama-3) | Speedster | 300+ tokens/sec & high free rate limits for live quizzes. |
| **Memory** | Gemini Embedding 1.0 | Indexer | Converts text to numbers for search (100 RPM free limit). |
| **Storage** | ChromaDB | Database | Open-source, local vector database (No cloud costs). |
| **Backend** | FastAPI (Python) | API | Asynchronous handling of AI requests. |

## 3. Core Functional Modules

### Module 1: Smart Ingestion ("The Reader")
*   **1.1. Document Parser**:
    *   Accepts PDF, DOCX, TXT.
    *   Uses `PyPDF` to extract text.
*   **1.2. Context Mapping (Gemini)**:
    *   The system sends the raw text to Gemini Flash-Lite with a prompt: "Identify the 5 key themes, all formulas, and the syllabus structure of this document."
    *   This creates the "Course Skeleton."
*   **1.3. Vectorization**:
    *   The text is split into chunks (1000 characters).
    *   Gemini Embeddings convert these chunks into vectors.
    *   Stored locally in ChromaDB.

### Module 2: The CCMAS Guidance Engine
*   **2.1. "Zero-Material" Research**:
    *   If a user has no PDF, they input: **Major** (e.g., Microbiology) + **Level** (200L).
    *   The system retrieves the pre-loaded CCMAS PDF from the vector store.
    *   Groq generates a list of "Mandatory Courses" and "Expected Learning Outcomes" based on that curriculum.
*   **2.2. Gap Analysis**:
    *   Compares user-uploaded notes against the CCMAS standard to flag missing topics. (e.g., "Your notes cover Cell Structure, but CCMAS requires you to also know Cell Signaling.")

### Module 3: Adaptive Exam Prep ("The Drill")
*   **3.1. Objective Mode (MCQ)**:
    *   Groq (Llama-3) generates questions on the fly using the retrieved context.
    *   **Latency**: <1 second per question (Real-time feel).
*   **3.2. Socratic Theory Mode**:
    *   User inputs a text answer.
    *   Groq grades it against the source text using a 3-point rubric:
        *   **Keyword Hit**: Did they use the right terminology?
        *   **Conceptual Link**: Did they explain the mechanism?
        *   **Clarity**: Is it readable?
*   **3.3. Live Workarounds (Remediation)**:
    *   **Trigger**: 3 consecutive incorrect answers.
    *   **Action**: Groq pauses the quiz. It retrieves a simplified explanation from the vector store and rephrases it: "You seem stuck on [Topic]. Think of it this way..."

### Module 4: Analytics & Visualization
*   **4.1. The Heatmap**:
    *   A JSON structure mapped to the UI.
    *   **Red**: Topics with <50% accuracy.
    *   **Green**: Topics with >80% accuracy.
*   **4.2. Fatigue Metrics**:
    *   Tracks "Time-to-Answer." If response time increases by 40% over 5 questions, the system prompts a break.

## 4. Data Flow Diagrams

### Flow A: Ingestion (Upload)
```mermaid
graph TD
    A[User Uploads PDF] --> B[FastAPI Server]
    B --> C[PyPDF Extracts Text]
    C --> D[Gemini Flash-Lite (Summarizes Structure)]
    C --> E[Text Chunker]
    E --> F[Gemini Embeddings]
    F --> G[ChromaDB (Local Storage)]
```

### Flow B: Study Session (Quiz)
```mermaid
graph TD
    A[User Asks Question] --> B[FastAPI]
    B --> C[ChromaDB Search (Finds Context)]
    C --> D[Groq API (Llama-3)]
    D --> E{Context + User Question}
    E --> F[Generates Answer/Feedback]
    F --> G[User UI]
```

## 5. Development Roadmap (Revised)

### Phase 1: The Core Loop (Days 1-7)
- [x] Set up FastAPI environment.
- [x] Get API Keys (Groq, Google).
- [ ] Implement PDF Upload & Text Extraction.
- [ ] Integrate ChromaDB for local storage.
- [ ] Build the "Ask Question" endpoint using Groq.

### Phase 2: The Socratic Engine (Days 8-14)
- [ ] Create Prompt Templates for "Teacher Persona" (Socratic method).
- [ ] Implement the "Grading Logic" (Input Text -> AI Evaluation -> Score).
- [ ] Build the "Live Workaround" trigger (if score < X, show hint).

### Phase 3: CCMAS Intelligence (Days 15-21)
- [ ] Ingest NUC CCMAS PDFs into the Vector Database.
- [ ] Create the "Curriculum Matcher" logic (User Major vs. CCMAS Database).

## 6. API Endpoint Specification (Draft)
| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/ingest` | Uploads course material | `file: PDF` |
| `POST` | `/quiz/generate` | Creates a question | `{topic: str, mode: "mcq"}` |
| `POST` | `/quiz/answer` | Submits answer for grading | `{question_id: str, answer: str}` |
| `GET` | `/analytics/heatmap` | Returns mastery status | `user_id` |
