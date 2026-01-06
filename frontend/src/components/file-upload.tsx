"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function FileUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [summary, setSummary] = useState<string | null>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        setSummary(null)

        const formData = new FormData()
        formData.append("file", file)

        try {
            // Assuming backend is at localhost:8000
            const res = await fetch("http://localhost:8000/ingest", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            setSummary(data.summary)
        } catch (error) {
            console.error(error)
            setSummary("Error uploading file. Please ensure backend is running.")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto space-y-8">
            <motion.div
                layout
                className={cn(
                    "relative group cursor-pointer border-2 border-dashed rounded-lg p-12 transition-all duration-300",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/5",
                    file && "border-primary/50 bg-primary/5"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="p-4 rounded-full bg-background border border-muted shadow-sm group-hover:shadow-primary/20 transition-all">
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        ) : file ? (
                            <FileText className="w-8 h-8 text-primary" />
                        ) : (
                            <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            {file ? file.name : "Drag & drop PDF or click to browse"}
                        </p>
                        {!file && (
                            <p className="text-xs text-muted-foreground">
                                Supports PDF documents up to 50MB
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>

            {file && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUpload();
                        }}
                        disabled={isUploading}
                        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full shadow-[0_0_15px_-3px_var(--primary)] hover:shadow-[0_0_25px_-3px_var(--primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? "Analyzing..." : "Analyze Document"}
                    </button>
                </motion.div>
            )}

            {summary && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">Analysis Complete</h3>
                    </div>
                    <div className="prose prose-invert max-w-none text-sm text-muted-foreground whitespace-pre-wrap">
                        {summary}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
