"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiHistoryLine,
  RiFileTextLine,
  RiImageLine,
  RiMicLine,
  RiSparklingLine,
  RiCheckLine,
  RiCloseFill,
  RiInformationLine,
} from "react-icons/ri";
import type { AiHistoryEntry, MediaDocument, Question } from "@/lib/types/quiz";

const tabs = ["Overview", "AI History", "Documents"] as const;
type Tab = (typeof tabs)[number];

interface QuizInfoPanelProps {
  onClose: () => void;
  questions: Question[];
  aiHistory: AiHistoryEntry[];
  documents: MediaDocument[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const docIcons: Record<string, typeof RiFileTextLine> = {
  pdf: RiFileTextLine,
  image: RiImageLine,
  audio: RiMicLine,
};

function QuizInfoPanel({
  onClose,
  questions,
  aiHistory,
  documents,
  status,
  createdAt,
  updatedAt,
}: QuizInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const aiCount = questions.filter((q) => q.source === "ai").length;
  const manualCount = questions.filter((q) => q.source === "manual").length;

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 380 }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
      className="sticky top-0 flex h-[calc(100vh-10rem)] shrink-0 flex-col overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]"
    >
      <div className="flex items-center justify-between border-b-2 border-neo-black px-5 py-4">
        <div className="flex items-center gap-2">
          <RiInformationLine className="size-5 text-primary" />
          <h2 className="text-lg font-bold">Quiz Info</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center border-2 border-neo-black hover:bg-muted"
        >
          <RiCloseLine className="size-5" />
        </button>
      </div>

      <div className="flex border-b-2 border-neo-black">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between rounded-lg border-2 border-neo-black bg-secondary p-3">
                <span className="text-xs font-semibold text-muted-foreground">Status</span>
                <span className={`rounded-md border-2 border-neo-black px-2 py-0.5 text-xs font-bold ${
                  status === "published" ? "bg-success text-neo-black" : "bg-muted text-muted-foreground"
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border-2 border-neo-black bg-secondary p-3">
                  <p className="text-xs font-semibold text-muted-foreground">Total Questions</p>
                  <p className="text-xl font-extrabold">{questions.length}</p>
                </div>
                <div className="rounded-lg border-2 border-neo-black bg-secondary p-3">
                  <p className="text-xs font-semibold text-muted-foreground">Documents</p>
                  <p className="text-xl font-extrabold">{documents.length}</p>
                </div>
              </div>

              <div className="rounded-lg border-2 border-neo-black p-3">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">Question Sources</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <RiSparklingLine className="size-3.5 text-primary" />
                    <span className="text-sm font-bold">{aiCount}</span>
                    <span className="text-xs text-muted-foreground">AI generated</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-neo-black" />
                    <span className="text-sm font-bold">{manualCount}</span>
                    <span className="text-xs text-muted-foreground">Manual</span>
                  </div>
                </div>
                <div className="mt-2 flex h-2 overflow-hidden rounded-full border border-neo-black">
                  <div className="bg-primary" style={{ width: `${(aiCount / questions.length) * 100}%` }} />
                  <div className="bg-neo-black" style={{ width: `${(manualCount / questions.length) * 100}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-semibold">{createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last updated</span>
                  <span className="font-semibold">{updatedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI sessions</span>
                  <span className="font-semibold">{aiHistory.length}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "AI History" && (
            <motion.div
              key="ai-history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {aiHistory.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No AI history yet.</p>
              ) : (
                aiHistory.map((entry) => (
                  <div key={entry.id} className="rounded-lg border-2 border-neo-black p-3">
                    <div className="mb-2 flex items-start gap-2">
                      <RiSparklingLine className="mt-0.5 size-4 shrink-0 text-primary" />
                      <p className="text-sm font-semibold">{entry.prompt}</p>
                    </div>
                    <p className="mb-2 text-[10px] text-muted-foreground">{entry.timestamp}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <RiSparklingLine className="size-3" />
                        {entry.questionsGenerated} generated
                      </span>
                      <span className="flex items-center gap-1 text-success">
                        <RiCheckLine className="size-3" />
                        {entry.questionsAccepted} accepted
                      </span>
                      <span className="flex items-center gap-1 text-destructive">
                        <RiCloseFill className="size-3" />
                        {entry.questionsGenerated - entry.questionsAccepted} skipped
                      </span>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === "Documents" && (
            <motion.div
              key="documents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {documents.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No documents uploaded.</p>
              ) : (
                documents.map((doc) => {
                  const Icon = docIcons[doc.type] || RiFileTextLine;
                  return (
                    <div key={doc.id} className="flex items-center gap-3 rounded-lg border-2 border-neo-black p-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border-2 border-neo-black bg-secondary">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{doc.name}</p>
                        <div className="flex gap-3 text-[10px] text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>{doc.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { QuizInfoPanel };
