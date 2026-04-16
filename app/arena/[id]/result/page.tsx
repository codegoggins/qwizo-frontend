"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiTrophyLine,
  RiCheckLine,
  RiCloseFill,
  RiTimeLine,
  RiShareLine,
  RiFileCopyLine,
  RiTwitterXFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { sampleQuizzes } from "@/lib/sample-quiz";
import { sampleArenaQuizzes } from "@/lib/sample-arena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal";

export default function QuizResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const arenaQuiz = sampleArenaQuizzes.find((q) => q.id === id);
  const quiz = sampleQuizzes["1"];
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  if (!arenaQuiz) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-bold">Quiz not found</p>
        <Link href="/arena">
          <Button variant="outline">Back to arena</Button>
        </Link>
      </div>
    );
  }

  const score = 8;
  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);
  const timeTaken = "4m 32s";
  const rank = 4;

  const badge = percentage >= 90 ? "Perfect!" : percentage >= 75 ? "Great job!" : percentage >= 60 ? "Good try!" : "Keep practicing!";
  const scoreColor = percentage >= 80 ? "bg-success" : percentage >= 60 ? "bg-warning" : "bg-destructive";

  function copyLink() {
    const url = `https://qwizo.app/arena/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/arena"
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <RiArrowLeftSLine className="size-4" />
          Back to arena
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6 rounded-xl border-2 border-neo-black bg-background p-10 text-center shadow-[6px_6px_0px_0px_#1B1B1B]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
          className={`flex size-28 items-center justify-center rounded-full border-4 border-neo-black text-4xl font-extrabold ${scoreColor}`}
        >
          {percentage}%
        </motion.div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{badge}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You scored {score} out of {total} questions correctly.
          </p>
          <p className="mt-1 text-sm font-semibold">{arenaQuiz.title}</p>
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
            <RiCheckLine className="size-5 text-success" />
            <span className="mt-1 text-lg font-extrabold">{score}</span>
            <span className="text-[10px] font-semibold text-muted-foreground">CORRECT</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
            <RiCloseFill className="size-5 text-destructive" />
            <span className="mt-1 text-lg font-extrabold">{total - score}</span>
            <span className="text-[10px] font-semibold text-muted-foreground">WRONG</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
            <RiTimeLine className="size-5" />
            <span className="mt-1 text-lg font-extrabold">{timeTaken}</span>
            <span className="text-[10px] font-semibold text-muted-foreground">TIME</span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border-2 border-neo-black bg-warning px-4 py-2">
          <RiTrophyLine className="size-5 text-neo-black" />
          <span className="text-sm font-bold text-neo-black">Ranked #{rank} on leaderboard</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/arena/${id}/leaderboard`}>
            <Button variant="outline" className="gap-2">
              <RiTrophyLine className="size-4" />
              View Leaderboard
            </Button>
          </Link>
          <Button onClick={() => setShareOpen(true)} className="gap-2">
            <RiShareLine className="size-4" />
            Share Result
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Answer Review</h2>
          <span className="text-xs font-semibold text-muted-foreground">
            Question {reviewIndex + 1} of {total}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {(() => {
            const q = quiz.questions[reviewIndex];
            const isCorrect = reviewIndex < score;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-neo-black text-sm font-bold ${
                        isCorrect ? "bg-success text-neo-black" : "bg-destructive text-white"
                      }`}
                    >
                      {reviewIndex + 1}
                    </span>
                    <p className="pt-0.5 text-base font-bold">{q.text}</p>
                  </div>
                  <Badge variant={isCorrect ? "success" : "destructive"}>
                    {isCorrect ? "Correct" : "Wrong"}
                  </Badge>
                </div>

                {q.options.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt) => {
                      const isRight = q.correctAnswers.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          className={`flex items-center gap-3 rounded-lg border-2 px-4 py-2.5 text-sm font-medium ${
                            isRight
                              ? "border-success bg-success/10"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-neo-black ${
                              isRight ? "bg-success" : "bg-background"
                            }`}
                          >
                            {isRight && <RiCheckLine className="size-3 text-neo-black" />}
                          </span>
                          {opt.text}
                          {isRight && (
                            <span className="ml-auto text-xs font-bold text-success">Correct answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                    {q.type === "descriptive" ? "Descriptive answer — reviewed manually" : "Expected answer"}
                    {q.correctAnswers[0] && (
                      <p className="mt-1 font-semibold text-foreground">{q.correctAnswers[0]}</p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })()}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={reviewIndex === 0}
            onClick={() => setReviewIndex((i) => i - 1)}
            className="gap-1"
          >
            <RiArrowLeftSLine className="size-4" />
            Previous
          </Button>

          <div className="flex flex-wrap justify-center gap-1">
            {quiz.questions.map((q, i) => {
              const isCorrect = i < score;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setReviewIndex(i)}
                  className={`size-3 rounded-full border border-neo-black transition-colors ${
                    i === reviewIndex
                      ? "bg-primary"
                      : isCorrect
                        ? "bg-success"
                        : "bg-destructive"
                  }`}
                />
              );
            })}
          </div>

          <Button
            disabled={reviewIndex === total - 1}
            onClick={() => setReviewIndex((i) => i + 1)}
            className="gap-1"
          >
            Next
            <RiArrowRightSLine className="size-4" />
          </Button>
        </div>
      </motion.div>

      <Modal open={shareOpen} onClose={() => setShareOpen(false)}>
        <ModalHeader onClose={() => setShareOpen(false)}>
          <ModalTitle>Share Your Result</ModalTitle>
          <ModalDescription>I scored {percentage}% on {arenaQuiz.title}!</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-neo-black bg-secondary p-6 text-center">
              <div className={`flex size-20 items-center justify-center rounded-full border-4 border-neo-black text-2xl font-extrabold ${scoreColor}`}>
                {percentage}%
              </div>
              <div>
                <p className="text-sm font-bold">I scored {score}/{total} on</p>
                <p className="text-base font-extrabold">{arenaQuiz.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Try it on qwizo.app</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-1.5">
                <RiTwitterXFill className="size-4" />
                Twitter
              </Button>
              <Button variant="outline" className="flex-1 gap-1.5">
                <RiLinkedinBoxFill className="size-4" />
                LinkedIn
              </Button>
              <Button variant="outline" className="flex-1 gap-1.5">
                <RiWhatsappFill className="size-4" />
                WhatsApp
              </Button>
            </div>

            <Button variant="outline" className="gap-1.5" onClick={copyLink}>
              {copied ? <RiCheckLine className="size-4 text-success" /> : <RiFileCopyLine className="size-4" />}
              {copied ? "Link Copied!" : "Copy Link"}
            </Button>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShareOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
