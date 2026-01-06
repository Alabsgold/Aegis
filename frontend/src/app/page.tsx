import { FileUpload } from "@/components/file-upload";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-4xl space-y-12 z-10">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Aegis AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your adaptive, curriculum-aware study partner. Upload your course material to begin the zero-cost revolution.
          </p>
        </div>

        <FileUpload />
      </div>
    </main>
  );
}
