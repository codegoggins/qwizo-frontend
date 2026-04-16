"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  RiTrophyLine,
  RiGroupLine,
  RiTimeLine,
  RiBarChartLine,
  RiMedalLine,
  RiSearchLine,
} from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { label: "Total Participants", value: "482", icon: RiGroupLine, color: "#21D3ED" },
  { label: "Quizzes Played", value: "1,284", icon: RiBarChartLine, color: "#A3E634" },
  { label: "Avg Score", value: "74%", icon: RiTrophyLine, color: "#FFB32F" },
  { label: "Avg Time", value: "4m 32s", icon: RiTimeLine, color: "#C184FD" },
];

const quizFilterOptions = [
  { value: "all", label: "All Quizzes" },
  { value: "1", label: "JavaScript Basics" },
  { value: "2", label: "React Fundamentals" },
  { value: "3", label: "System Design 101" },
  { value: "4", label: "Python for Beginners" },
];

const timeFilterOptions = [
  { value: "all-time", label: "All Time" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

interface LeaderboardRow {
  rank: number;
  name: string;
  quizzes: number;
  avgScore: number;
  bestScore: number;
  totalTime: string;
  streak: number;
}

const leaderboardData: LeaderboardRow[] = [
  { rank: 1, name: "Alex Chen", quizzes: 12, avgScore: 92, bestScore: 100, totalTime: "48m", streak: 7 },
  { rank: 2, name: "Jordan Lee", quizzes: 10, avgScore: 88, bestScore: 96, totalTime: "42m", streak: 5 },
  { rank: 3, name: "Sam Patel", quizzes: 11, avgScore: 85, bestScore: 94, totalTime: "51m", streak: 4 },
  { rank: 4, name: "Taylor Kim", quizzes: 8, avgScore: 83, bestScore: 92, totalTime: "35m", streak: 3 },
  { rank: 5, name: "Morgan Davis", quizzes: 9, avgScore: 81, bestScore: 90, totalTime: "40m", streak: 6 },
  { rank: 6, name: "Riley Johnson", quizzes: 7, avgScore: 79, bestScore: 88, totalTime: "32m", streak: 2 },
  { rank: 7, name: "Casey Brown", quizzes: 6, avgScore: 77, bestScore: 86, totalTime: "28m", streak: 1 },
  { rank: 8, name: "Jamie Wilson", quizzes: 8, avgScore: 75, bestScore: 84, totalTime: "37m", streak: 4 },
  { rank: 9, name: "Avery Martinez", quizzes: 5, avgScore: 73, bestScore: 82, totalTime: "24m", streak: 2 },
  { rank: 10, name: "Drew Thomas", quizzes: 7, avgScore: 71, bestScore: 80, totalTime: "33m", streak: 1 },
  { rank: 11, name: "Quinn Anderson", quizzes: 4, avgScore: 69, bestScore: 78, totalTime: "20m", streak: 0 },
  { rank: 12, name: "Reese Garcia", quizzes: 6, avgScore: 67, bestScore: 76, totalTime: "29m", streak: 3 },
];

const rankColors: Record<number, string> = {
  1: "bg-warning text-neo-black",
  2: "bg-border text-neo-black",
  3: "bg-[#CD7F32] text-white",
};

function scoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

const columns: ColumnDef<LeaderboardRow, unknown>[] = [
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
        <div className="flex size-8 items-center justify-center rounded-full border-2 border-neo-black bg-primary text-xs font-bold text-primary-foreground">
          {row.original.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="font-semibold">{row.original.name}</span>
      </div>
    ),
  },
  { accessorKey: "quizzes", header: "Quizzes" },
  {
    accessorKey: "avgScore",
    header: "Avg Score",
    cell: ({ getValue }) => {
      const score = getValue() as number;
      return <span className={`font-bold ${scoreColor(score)}`}>{score}%</span>;
    },
  },
  {
    accessorKey: "bestScore",
    header: "Best Score",
    cell: ({ getValue }) => {
      const score = getValue() as number;
      return <span className={`font-bold ${scoreColor(score)}`}>{score}%</span>;
    },
  },
  {
    accessorKey: "totalTime",
    header: "Total Time",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "streak",
    header: "Streak",
    cell: ({ getValue }) => {
      const streak = getValue() as number;
      if (streak === 0) return <span className="text-muted-foreground">—</span>;
      return <Badge variant={streak >= 5 ? "success" : "default"}>{streak} day{streak !== 1 && "s"}</Badge>;
    },
  },
];

export default function LeaderboardPage() {
  const [quizFilter, setQuizFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [search, setSearch] = useState("");

  const filtered = leaderboardData.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = leaderboardData.slice(0, 3);

  return (
    <div className="flex flex-col gap-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <RiTrophyLine className="size-8 text-warning" />
          <h1 className="text-3xl font-extrabold tracking-tight">Leaderboard</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">See who&apos;s leading across your quizzes.</p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
          >
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black"
              style={{ backgroundColor: stat.color }}
            >
              <stat.icon className="size-5 text-neo-black" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-extrabold tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-end justify-center gap-4 pt-4"
      >
        {[top3[1], top3[0], top3[2]].map((player, i) => {
          const position = i === 1 ? 1 : i === 0 ? 2 : 3;
          const heights = ["h-28", "h-36", "h-24"];
          const podiumColors = ["bg-border", "bg-warning", "bg-[#CD7F32]"];

          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex size-14 items-center justify-center rounded-full border-2 border-neo-black bg-primary text-lg font-bold text-primary-foreground">
                  {player.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="text-sm font-bold">{player.name}</p>
                <p className={`text-lg font-extrabold ${scoreColor(player.avgScore)}`}>{player.avgScore}%</p>
              </div>
              <div className={`flex w-24 items-center justify-center rounded-t-xl border-2 border-neo-black ${heights[i]} ${podiumColors[i]}`}>
                <div className="flex flex-col items-center">
                  <RiMedalLine className="size-6" />
                  <span className="text-lg font-extrabold">{position}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Select options={quizFilterOptions} value={quizFilter} onValueChange={setQuizFilter} className="w-48" />
            <Select options={timeFilterOptions} value={timeFilter} onValueChange={setTimeFilter} className="w-40" />
          </div>
          <div className="relative w-full sm:w-64">
            <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search participants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <DataTable columns={columns} data={filtered} pageSize={5} />
      </motion.div>
    </div>
  );
}
