
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Get backend URL from env or default to localhost
        // On Render, we'll set THIS to the backend service URL
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
        const secret = process.env.AEGIS_INTERNAL_SECRET || "";

        const res = await fetch(`${backendUrl}/ingest`, {
            method: "POST",
            body: formData,
            headers: {
                // Pass the secret to the backend
                "X-Aegis-Secret": secret,
                // Forward content-type automatically with formData? 
                // fetch with FormData usually sets boundary automatically, so we don't set Content-Type header manually
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ error: `Backend Error: ${errorText}` }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: "Internal Proxy Error" }, { status: 500 });
    }
}
