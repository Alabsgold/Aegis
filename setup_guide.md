# Aegis Secure Deployment Guide

This guide provides a step-by-step process for deploying Aegis securely on Render without requiring a payment card (Manual Setup) and configuring the internal security system.

## 1. Local Development (Secure Mode)
The application now uses an encrypted proxy pattern:
`Frontend (Browser) -> Next.js Server (Proxy) -> Python Backend`

1.  **Set Environment Variables**:
    -   In `.env` (create if missing):
        ```env
        GOOGLE_API_KEY=your_gemini_key
        AEGIS_INTERNAL_SECRET=my_super_secret_password
        ```
    -   Using the setup scripts will automatically start the environments.
    -   **Important**: Since we added the secret check, you must ensure `AEGIS_INTERNAL_SECRET` is set in your `.env` for the backend to accept requests from the frontend, and the Frontend (running locally) needs to pick it up. (Note: Next.js picks up `.env.local` or `.env` typically. Ensure `AEGIS_INTERNAL_SECRET` is available to the standard `process.env`).

## 2. Manual Deployment on Render (Free Tier - No Card)

To avoid the payment card requirement of Blueprints, we will deploy the **Backend** and **Frontend** manually.

### Part A: Deploying the Backend
1.  **Push your code** to GitHub.
2.  Log in to [Render.com](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your `Aegis` repository.
5.  **Configure Service**:
    -   **Name**: `aegis-backend`
    -   **Runtime**: **Docker**
    -   **Root Directory**: `backend` (Important! This tells Render to look in the backend folder).
    -   **Region**: Choose closest to you (e.g., Frankfurt/Oregon).
    -   **Instance Type**: **Free**.
6.  **Environment Variables**:
    -   Click "Advanced" or go to the "Environment" tab after creation.
    -   `PYTHON_VERSION`: `3.10.0`
    -   `GOOGLE_API_KEY`: Paste your Gemini API Key.
    -   `AEGIS_INTERNAL_SECRET`: Generate a strong password (e.g., `s3cr3t_k3y_123`) and paste it here.
7.  **Deploy**. Wait for it to go live.
8.  **Copy URL**: Once live, copy the URL (e.g., `https://aegis-backend.onrender.com`).

### Part B: Deploying the Frontend (Vercel Recommended)
*Render Frontend is fine, but Vercel is often easier for Next.js and completely free without hurdles.*

**Option 1: Deploy on Vercel (Recommended)**
1.  Go to [Vercel.com](https://vercel.com) and log in.
2.  Click **Add New...** -> **Project**.
3.  Import your `Aegis` repo.
4.  **Configure Project**:
    -   **Root Directory**: Click "Edit" and select `frontend`.
    -   **Environment Variables**:
        -   `BACKEND_URL`: Paste your **Render Backend URL** (e.g., `https://aegis-backend.onrender.com`).
        -   `AEGIS_INTERNAL_SECRET`: Paste the **SAME** secret you used in the Backend.
5.  **Deploy**.

**Option 2: Deploy on Render (Manual)**
1.  Click **New +** -> **Web Service**.
2.  Connect `Aegis` repo.
3.  **Configure**:
    -   **Name**: `aegis-frontend`
    -   **Runtime**: **Docker**
    -   **Root Directory**: `frontend`.
    -   **Instance Type**: **Free**.
4.  **Environment Variables**:
    -   `BACKEND_URL`: `https://aegis-backend.onrender.com`
    -   `AEGIS_INTERNAL_SECRET`: Your shared secret.
5.  **Deploy**.

## 3. How the Security Works
-   **No Leaching**: The Python Backend **rejects** any request that does not have the `X-Aegis-Secret` header.
-   **Hidden Key**: The Browser (User) **never sees** the secret. The Browser calls `/api/ingest` (Next.js Endpoint).
-   **Secure Proxy**: The Next.js Server (running safely in the cloud) adds the secret and forwards the request to the Backend.
