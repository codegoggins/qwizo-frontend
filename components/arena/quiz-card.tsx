"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiGroupLine,
  RiQuestionLine,
  RiTimeLine,
  RiCheckLine,
  RiCalendarLine,
  RiFireLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import type { ArenaQuiz } from "@/lib/types/arena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnrollModal } from "@/components/arena/enroll-modal";

const difficultyStyles: Record<string, { label: string; variant: "success" | "warning" | "destructive" }> = {
  easy: { label: "Easy", variant: "success" },
  medium: { label: "Medium", variant: "warning" },
  hard: { label: "Hard", variant: "destructive" },
};

function StatusBadge({ status, endsAt, startsAt }: { status: ArenaQuiz["status"]; endsAt?: string; startsAt?: string }) {
  if (status === "live") {
    return (
      <Badge variant="success" className="gap-1.5">
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="block size-1.5 rounded-full bg-neo-black"
        />
        Live {endsAt && `— ends ${endsAt}`}
      </Badge>
    );
  }
  if (status === "upcoming") {
    return (
      <Badge variant="warning" className="gap-1.5">
        <RiCalendarLine className="size-3" />
        Starts {startsAt}
      </Badge>
    );
  }
  if (status === "ended") {
    return <Badge variant="archived">Ended</Badge>;
  }
  return (
    <Badge variant="default" className="gap-1.5">
      <RiFireLine className="size-3" />
      Open Anytime
    </Badge>
  );
}

function ActionButton({ quiz, onEnrollClick }: { quiz: ArenaQuiz; onEnrollClick: () => void }) {
  if (quiz.status === "ended") {
    return (
      <Link href={`/arena/${quiz.id}/leaderboard`} className="w-full">
        <Button variant="outline" className="w-full">View Leaderboard</Button>
      </Link>
    );
  }
  if (quiz.hasAttempted) {
    return (
      <Link href={`/arena/${quiz.id}/result`} className="w-full">
        <Button variant="outline" className="w-full">View Result • {quiz.userScore}%</Button>
      </Link>
    );
  }
  if (quiz.status === "upcoming" && quiz.isEnrolled) {
    return (
      <Button disabled className="w-full">
        Starts {quiz.startsAt}
      </Button>
    );
  }
  if (quiz.status === "upcoming") {
    return (
      <Button variant="outline" className="w-full" onClick={onEnrollClick}>
        Enroll
      </Button>
    );
  }
  return (
    <Link href={`/arena/${quiz.id}/play`} className="w-full">
      <Button variant={quiz.status === "live" ? "success" : "default"} className="w-full">
        Start Quiz
      </Button>
    </Link>
  );
}

interface QuizCardProps {
  quiz: ArenaQuiz;
}

function QuizCard({ quiz }: QuizCardProps) {
  const diff = difficultyStyles[quiz.difficulty];
  const [enrollOpen, setEnrollOpen] = useState(false);

  return (
    <>
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow hover:shadow-[6px_6px_0px_0px_#1B1B1B]"
    >
      <div className="h-2 w-full" style={{ backgroundColor: quiz.topicColor }} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <StatusBadge status={quiz.status} endsAt={quiz.endsAt} startsAt={quiz.startsAt} />
          <Badge variant={diff.variant}>{diff.label}</Badge>
        </div>

        <div>
          <h3 className="text-lg font-extrabold tracking-tight line-clamp-1">{quiz.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {quiz.tags.map((tag) => (
            <Badge key={tag} variant="default" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t-2 border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full border-2 border-neo-black bg-primary text-[10px] font-bold text-primary-foreground">
              {quiz.author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold">@{quiz.author.username}</span>
              {quiz.author.verified && <RiVerifiedBadgeFill className="size-3.5 text-primary" />}
            </div>
          </div>
          {quiz.isEnrolled && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-success">
              <RiCheckLine className="size-3.5" />
              Enrolled
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 border-t-2 border-border pt-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <RiGroupLine className="size-3.5" />
            <span className="font-semibold text-foreground">{quiz.enrolled.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <RiQuestionLine className="size-3.5" />
            <span className="font-semibold text-foreground">{quiz.questions}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <RiTimeLine className="size-3.5" />
            <span className="font-semibold text-foreground">{quiz.duration}</span>
          </div>
        </div>

        <ActionButton quiz={quiz} onEnrollClick={() => setEnrollOpen(true)} />
      </div>
    </motion.div>
    <EnrollModal quiz={quiz} open={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </>
  );
}

export { QuizCard };
