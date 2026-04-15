"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiUploadCloud2Line,
  RiFileTextLine,
  RiImageLine,
  RiMicLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiSparklingLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const fileTypeIcons: Record<string, typeof RiFileTextLine> = {
  pdf: RiFileTextLine,
  image: RiImageLine,
  audio: RiMicLine,
};

const fileTypeColors: Record<string, string> = {
  pdf: "#E56498",
  image: "#21D3ED",
  audio: "#A3E634",
};

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "mixed", label: "Mixed" },
];

const questionCountOptions = [
  { value: "5", label: "5 questions" },
  { value: "10", label: "10 questions" },
  { value: "15", label: "15 questions" },
  { value: "20", label: "20 questions" },
  { value: "25", label: "25 questions" },
];

const questionTypeOptions = [
  { value: "all", label: "All types" },
  { value: "mcq", label: "MCQ only" },
  { value: "true-false", label: "True / False only" },
  { value: "mixed-choice", label: "MCQ + True/False" },
];

interface UploadedFile {
  id: string;
  file: File;
  type: "pdf" | "image" | "audio";
  preview?: string;
}

function getFileType(file: File): "pdf" | "image" | "audio" {
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  return "pdf";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadDocumentPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState("10");
  const [questionType, setQuestionType] = useState("all");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const added: UploadedFile[] = Array.from(newFiles).map((file) => ({
      id: crypto.randomUUID(),
      file,
      type: getFileType(file),
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...added]);
  }, []);

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 3000);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Upload Document</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload files and let AI generate quiz questions automatically.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.webp,.mp3,.wav,.m4a"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
          className="hidden"
        />
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-neo-black bg-background hover:bg-muted"
          }`}
        >
          <div className="flex size-16 items-center justify-center rounded-xl border-2 border-neo-black bg-secondary">
            <RiUploadCloud2Line className="size-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">Drop files here or click to browse</p>
            <p className="mt-1 text-xs text-muted-foreground">PDF, Images (PNG, JPG), Audio (MP3, WAV) — up to 25 MB each</p>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><RiFileTextLine className="size-4" style={{ color: fileTypeColors.pdf }} /> PDF</span>
            <span className="flex items-center gap-1.5"><RiImageLine className="size-4" style={{ color: fileTypeColors.image }} /> Images</span>
            <span className="flex items-center gap-1.5"><RiMicLine className="size-4" style={{ color: fileTypeColors.audio }} /> Audio</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]"
          >
            <div className="flex items-center justify-between border-b-2 border-neo-black px-5 py-4">
              <h2 className="text-lg font-bold">Uploaded Files</h2>
              <span className="rounded-md border-2 border-neo-black bg-secondary px-2.5 py-1 text-xs font-bold">
                {files.length} {files.length === 1 ? "file" : "files"}
              </span>
            </div>
            <div className="flex flex-col">
              <AnimatePresence>
                {files.map((f) => {
                  const Icon = fileTypeIcons[f.type];
                  const color = fileTypeColors[f.type];
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4 border-b border-border px-5 py-3 last:border-0"
                    >
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black"
                        style={{ backgroundColor: color }}
                      >
                        <Icon className="size-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold">{f.file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatSize(f.file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(f.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                      >
                        <RiDeleteBinLine className="size-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {files.length > 0 && !generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
          >
            <h2 className="mb-5 text-lg font-bold">Generation Settings</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold">Quiz Title</label>
                <Input
                  placeholder="e.g. JavaScript Fundamentals"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">Difficulty</label>
                <Select options={difficultyOptions} value={difficulty} onValueChange={setDifficulty} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">Number of Questions</label>
                <Select options={questionCountOptions} value={questionCount} onValueChange={setQuestionCount} />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold">Question Types</label>
                <Select options={questionTypeOptions} value={questionType} onValueChange={setQuestionType} />
              </div>
            </div>
            <Button
              className="mt-6 w-full gap-2"
              onClick={handleGenerate}
              disabled={generating || !quizTitle.trim()}
            >
              {generating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <RiSparklingLine className="size-4" />
                  </motion.div>
                  Generating questions...
                </>
              ) : (
                <>
                  <RiSparklingLine className="size-4" />
                  Generate Quiz
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {generated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 rounded-xl border-2 border-neo-black bg-background p-10 text-center shadow-[6px_6px_0px_0px_#1B1B1B]"
          >
            <div className="flex size-16 items-center justify-center rounded-full border-2 border-neo-black bg-success">
              <RiCheckLine className="size-8 text-neo-black" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Quiz Generated!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {questionCount} questions created from {files.length} {files.length === 1 ? "file" : "files"}.
                You can now review and edit them.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => { setGenerated(false); setFiles([]); setQuizTitle(""); }}
              >
                Upload More
              </Button>
              <Button className="gap-2">
                Review & Edit
                <RiArrowRightLine className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
