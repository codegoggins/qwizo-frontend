"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiGroupLine,
  RiQuestionLine,
  RiTimeLine,
  RiSparklingLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import type { ArenaQuiz } from "@/lib/types/arena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const difficultyStyles: Record<string, { label: string; variant: "success" | "warning" | "destructive" }> = {
  easy: { label: "Easy", variant: "success" },
  medium: { label: "Medium", variant: "warning" },
  hard: { label: "Hard", variant: "destructive" },
};

interface FeaturedQuizCardProps {
  quiz: ArenaQuiz;
}

function FeaturedQuizCard({ quiz }: FeaturedQuizCardProps) {
  const diff = difficultyStyles[quiz.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[6px_6px_0px_0px_#1B1B1B]"
    >
      <div className="h-3 w-full" style={{ backgroundColor: quiz.topicColor }} />

      <div className="grid gap-6 p-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" className="gap-1.5 px-3 py-1">
              <RiSparklingLine className="size-3.5" />
              Featured
            </Badge>
            {quiz.status === "live" && (
              <Badge variant="success" className="gap-1.5 px-3 py-1">
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="block size-1.5 rounded-full bg-neo-black"
                />
                Live — ends {quiz.endsAt}
              </Badge>
            )}
            <Badge variant={diff.variant}>{diff.label}</Badge>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">{quiz.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{quiz.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {quiz.tags.map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-neo-black bg-primary text-xs font-bold text-primary-foreground">
              {quiz.author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{quiz.author.name}</span>
              <span className="text-xs text-muted-foreground">@{quiz.author.username}</span>
              {quiz.author.verified && <RiVerifiedBadgeFill className="size-4 text-primary" />}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
              <RiGroupLine className="size-5" />
              <span className="mt-1 text-lg font-extrabold">{quiz.enrolled.toLocaleString()}</span>
              <span className="text-[10px] font-semibold text-muted-foreground">ENROLLED</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
              <RiQuestionLine className="size-5" />
              <span className="mt-1 text-lg font-extrabold">{quiz.questions}</span>
              <span className="text-[10px] font-semibold text-muted-foreground">QUESTIONS</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
              <RiTimeLine className="size-5" />
              <span className="mt-1 text-lg font-extrabold">{quiz.duration}</span>
              <span className="text-[10px] font-semibold text-muted-foreground">DURATION</span>
            </div>
          </div>

          <Link href={`/arena/${quiz.id}/play`}>
            <Button variant="success" size="lg" className="w-full">
              Start Challenge
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export { FeaturedQuizCard };
