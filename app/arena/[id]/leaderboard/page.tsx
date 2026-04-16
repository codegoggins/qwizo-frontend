"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  RiArrowLeftSLine,
  RiTrophyLine,
  RiGroupLine,
  RiTimeLine,
  RiFlashlightLine,
  RiBarChartLine,
} from "react-icons/ri";
import { sampleArenaQuizzes } from "@/lib/sample-arena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

interface AttemptRow {
  rank: number;
  name: string;
  score: number;
  total: number;
  percentage: number;
  timeTaken: string;
  completedAt: string;
  isYou?: boolean;
}

const attempts: AttemptRow[] = [
  { rank: 1, name: "Alex Chen", score: 10, total: 10, percentage: 100, timeTaken: "3m 12s", completedAt: "2 min ago" },
  { rank: 2, name: "Jordan Lee", score: 9, total: 10, percentage: 90, timeTaken: "3m 45s", completedAt: "8 min ago" },
  { rank: 3, name: "Sam Patel", score: 9, total: 10, percentage: 90, timeTaken: "4m 02s", completedAt: "15 min ago" },
  { rank: 4, name: "You", score: 8, total: 10, percentage: 80, timeTaken: "4m 32s", completedAt: "just now", isYou: true },
  { rank: 5, name: "Taylor Kim", score: 8, total: 10, percentage: 80, timeTaken: "5m 01s", completedAt: "35 min ago" },
  { rank: 6, name: "Morgan Davis", score: 7, total: 10, percentage: 70, timeTaken: "4m 55s", completedAt: "1 hour ago" },
  { rank: 7, name: "Riley Johnson", score: 7, total: 10, percentage: 70, timeTaken: "5m 30s", completedAt: "1 hour ago" },
  { rank: 8, name: "Casey Brown", score: 6, total: 10, percentage: 60, timeTaken: "6m 12s", completedAt: "2 hours ago" },
  { rank: 9, name: "Jamie Wilson", score: 6, total: 10, percentage: 60, timeTaken: "5m 48s", completedAt: "3 hours ago" },
  { rank: 10, name: "Avery Martinez", score: 5, total: 10, percentage: 50, timeTaken: "7m 02s", completedAt: "4 hours ago" },
];

const rankColors: Record<number, string> = {
  1: "bg-warning text-neo-black",
  2: "bg-border text-neo-black",
  3: "bg-[#CD7F32] text-white",
};

function scoreColor(pct: number) {
  if (pct >= 80) return "text-success";
  if (pct >= 60) return "text-warning";
  return "text-destructive";
}

const columns: ColumnDef<AttemptRow, unknown>[] = [
  {
    accessorKey: "rank",
    header: "#",
    cell: ({ row }) => {
      const rank = row.original.rank;
      const color = rankColors[rank] || "bg-secondary text-foreground";
      return (
        <span className={`flex size-7 items-center justify-center rounded-full border-2 border-neo-black text-xs font-bold ${color}`}>
          {rank}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Participant",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className={`flex size-8 items-center justify-center rounded-full border-2 border-neo-black text-xs font-bold ${row.original.isYou ? "bg-success" : "bg-primary text-primary-foreground"}`}>
          {row.original.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{row.original.name}</span>
          {row.original.isYou && <Badge variant="success">You</Badge>}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => <span className="font-semibold">{row.original.score}/{row.original.total}</span>,
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ getValue }) => {
      const pct = getValue() as number;
      return <span className={`font-bold ${scoreColor(pct)}`}>{pct}%</span>;
    },
  },
  {
    accessorKey: "timeTaken",
    header: "Time",
    cell: ({ getValue }) => (
      <span className="flex items-center gap-1 text-muted-foreground">
        <RiTimeLine className="size-3.5" />
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "completedAt",
    header: "Completed",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
];

export default function ArenaLeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = sampleArenaQuizzes.find((q) => q.id === id);

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-bold">Quiz not found</p>
        <Link href="/arena">
          <Button variant="outline">Back to arena</Button>
        </Link>
      </div>
    );
  }

  const totalAttempts = attempts.length;
  const avgScore = Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/arena"
          className="mb-3 flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <RiArrowLeftSLine className="size-4" />
          Back to arena
        </Link>
        <div className="flex items-center gap-2">
          <RiTrophyLine className="size-7 text-warning" />
          <h1 className="text-3xl font-extrabold tracking-tight">Leaderboard</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{quiz.title}</p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black" style={{ backgroundColor: "#21D3ED" }}>
            <RiGroupLine className="size-5 text-neo-black" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Total Attempts</p>
            <p className="text-2xl font-extrabold tracking-tight">{totalAttempts}</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black" style={{ backgroundColor: "#A3E634" }}>
            <RiBarChartLine className="size-5 text-neo-black" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Avg Score</p>
            <p className="text-2xl font-extrabold tracking-tight">{avgScore}%</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black" style={{ backgroundColor: "#FFB32F" }}>
            <RiFlashlightLine className="size-5 text-neo-black" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Fastest Finish</p>
            <p className="text-2xl font-extrabold tracking-tight">3m 12s</p>
            <p className="text-[11px] text-muted-foreground">by Alex Chen</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black" style={{ backgroundColor: "#C184FD" }}>
            <RiTimeLine className="size-5 text-neo-black" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Avg Finish Time</p>
            <p className="text-2xl font-extrabold tracking-tight">5m 18s</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-end justify-center gap-4 pt-4"
      >
        {[attempts[1], attempts[0], attempts[2]].map((player, i) => {
          const position = i === 1 ? 1 : i === 0 ? 2 : 3;
          const heights = ["h-28", "h-36", "h-24"];
          const podiumColors = ["bg-border", "bg-warning", "bg-[#CD7F32]"];

          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex size-14 items-center justify-center rounded-full border-2 border-neo-black bg-primary text-lg font-bold text-primary-foreground">
                  {player.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="text-sm font-bold">{player.name}</p>
                <p className={`text-lg font-extrabold ${scoreColor(player.percentage)}`}>{player.percentage}%</p>
                <span className="text-xs text-muted-foreground">{player.timeTaken}</span>
              </div>
              <div className={`flex w-24 items-center justify-center rounded-t-xl border-2 border-neo-black ${heights[i]} ${podiumColors[i]}`}>
                <span className="text-lg font-extrabold">{position}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <DataTable columns={columns} data={attempts} pageSize={10} />
      </motion.div>
    </div>
  );
}
