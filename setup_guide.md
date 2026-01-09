# Aegis Docker Setup & Deployment Guide

## 1. Local Development with Docker Compose

To run the entire Aegis system (frontend + backend) locally using Docker:

1.  **Prerequisites**: Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
2.  Open a terminal in the project root (`Aegis\`).
3.  Run the following command to build and start the services:

    ```bash
    docker-compose up --build
    ```

    - **Frontend**: Accessible at [http://localhost:3000](http://localhost:3000)
    - **Backend**: Accessible at [http://localhost:8000](http://localhost:8000) (Docs at `/docs`)

4.  To stop the services, press `Ctrl+C` or run `docker-compose down`.

## 2. Deployment on Render

This project is configured for deployment on [Render](https://render.com/).

### Option A: Blueprints (Recommended)

1.  Push your code to a GitHub repository.
2.  Log in to your Render dashboard.
3.  Click **New +** and select **Blueprint**.
4.  Connect your GitHub repository.
5.  Render will automatically detect the `render.yaml` file and propose the services (Backend and Frontend).
6.  Click **Apply** to deploy.

### Configuration Notes

- **Environment Variables**:
    - The `render.yaml` sets basic variables. You may need to add secrets (like API keys) in the Render Dashboard for each service under the "Environment" tab.
    - For the Frontend container to communicate with the Backend, you might need to set `NEXT_PUBLIC_API_URL` to your deployed backend URL (e.g., `https://aegis-backend.onrender.com`) in the Frontend service settings.

- **Backend Imports**:
    - The backend imports have been adjusted to work within the container. If you run the backend manually without Docker, verify you are running it from the `backend` directory or adjust your usage.

### Option B: Manual Setup

If you prefer to set up services manually on Render:
1.  **Backend**: Create a "Web Service", choose "Docker", set Context to `backend`.
2.  **Frontend**: Create a "Web Service", choose "Docker", set Context to `frontend`.

### Setting Up AI (API Keys)

To enable AI features on Render, you must securely provide your API keys:

1.  Go to your **Backend Service** dashboard on Render.
2.  Click on the **Environment** tab.
3.  Click **Add Environment Variable**.
4.  Add the following keys:
    -   `GOOGLE_API_KEY`: Your Gemini API Key.
    -   `GROQ_API_KEY`: Your Groq API Key (if used).
    -   Any other keys from your local `.env`.
5.  Click **Save Changes**. Render will automatically redeploy your service with the new keys.

> **Note**: Do NOT commit your `.env` file to GitHub. Render injects these variables directly into the container at runtime.
