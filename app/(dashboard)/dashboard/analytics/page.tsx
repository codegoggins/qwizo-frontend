"use client";

import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  RiFileListLine,
  RiGroupLine,
  RiBarChartLine,
  RiTimeLine,
  RiSparklingLine,
  RiEyeLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiTrophyLine,
} from "react-icons/ri";
import { DataTable } from "@/components/ui/data-table";
import { ChartCard, BarChartComponent, AreaChartComponent, DonutChartComponent } from "@/components/ui/charts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { label: "Total Quizzes", value: "12", change: "+3", up: true, icon: RiFileListLine, color: "#21D3ED" },
  { label: "Total Attempts", value: "1,284", change: "+156", up: true, icon: RiGroupLine, color: "#A3E634" },
  { label: "Avg Score", value: "74%", change: "+2%", up: true, icon: RiBarChartLine, color: "#FFB32F" },
  { label: "Avg Time", value: "4m 32s", change: "-12s", up: true, icon: RiTimeLine, color: "#C184FD" },
  { label: "Completion Rate", value: "89%", change: "+5%", up: true, icon: RiEyeLine, color: "#E56498" },
  { label: "AI Questions", value: "68", change: "+12", up: true, icon: RiSparklingLine, color: "#21D3ED" },
];

const scoreData = [
  { name: "0–20%", value: 24 },
  { name: "21–40%", value: 67 },
  { name: "41–60%", value: 198 },
  { name: "61–80%", value: 312 },
  { name: "81–100%", value: 183 },
];

const weeklyData = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 58 },
  { name: "Wed", value: 35 },
  { name: "Thu", value: 71 },
  { name: "Fri", value: 63 },
  { name: "Sat", value: 28 },
  { name: "Sun", value: 19 },
];

const monthlyTrend = [
  { name: "Week 1", value: 210 },
  { name: "Week 2", value: 340 },
  { name: "Week 3", value: 280 },
  { name: "Week 4", value: 420 },
];

const questionTypeData = [
  { name: "MCQ", value: 45, color: "#E56498" },
  { name: "Multi Select", value: 18, color: "#C184FD" },
  { name: "True/False", value: 22, color: "#21D3ED" },
  { name: "Short Answer", value: 12, color: "#A3E634" },
  { name: "Descriptive", value: 8, color: "#FFB32F" },
];

interface QuizRow {
  rank: number;
  title: string;
  attempts: number;
  avgScore: string;
  completion: string;
}

const topQuizzes: QuizRow[] = [
  { rank: 1, title: "JavaScript Basics", attempts: 234, avgScore: "82%", completion: "94%" },
  { rank: 2, title: "React Fundamentals", attempts: 189, avgScore: "74%", completion: "91%" },
  { rank: 3, title: "TypeScript Essentials", attempts: 145, avgScore: "71%", completion: "88%" },
  { rank: 4, title: "Node.js Deep Dive", attempts: 112, avgScore: "65%", completion: "85%" },
  { rank: 5, title: "Python for Beginners", attempts: 97, avgScore: "68%", completion: "92%" },
  { rank: 6, title: "CSS Grid & Flexbox", attempts: 88, avgScore: "76%", completion: "90%" },
  { rank: 7, title: "System Design 101", attempts: 74, avgScore: "59%", completion: "78%" },
  { rank: 8, title: "React Advanced Patterns", attempts: 62, avgScore: "63%", completion: "82%" },
];

const rankColors = ["bg-warning", "bg-border", "bg-[#CD7F32]"];

const quizColumns: ColumnDef<QuizRow, unknown>[] = [
  {
    accessorKey: "rank",
    header: "#",
    cell: ({ row }) => {
      const rank = row.original.rank;
      return (
        <span className={`flex size-6 items-center justify-center rounded-md border-2 border-neo-black text-xs font-bold ${rank <= 3 ? rankColors[rank - 1] : "bg-secondary"}`}>
          {rank}
        </span>
      );
    },
  },
  { accessorKey: "title", header: "Quiz", cell: ({ getValue }) => <span className="font-semibold">{getValue() as string}</span> },
  { accessorKey: "attempts", header: "Attempts" },
  { accessorKey: "avgScore", header: "Avg Score", cell: ({ getValue }) => <span className="font-semibold">{getValue() as string}</span> },
  { accessorKey: "completion", header: "Completion" },
];

interface PerformerRow {
  rank: number;
  name: string;
  quizzes: number;
  avgScore: string;
}

const topPerformers: PerformerRow[] = [
  { rank: 1, name: "Alex Chen", quizzes: 8, avgScore: "92%" },
  { rank: 2, name: "Jordan Lee", quizzes: 6, avgScore: "88%" },
  { rank: 3, name: "Sam Patel", quizzes: 7, avgScore: "85%" },
  { rank: 4, name: "Taylor Kim", quizzes: 5, avgScore: "83%" },
  { rank: 5, name: "Morgan Davis", quizzes: 4, avgScore: "81%" },
  { rank: 6, name: "Riley Johnson", quizzes: 6, avgScore: "79%" },
  { rank: 7, name: "Casey Brown", quizzes: 3, avgScore: "77%" },
  { rank: 8, name: "Jamie Wilson", quizzes: 5, avgScore: "75%" },
];

const performerColumns: ColumnDef<PerformerRow, unknown>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      const rank = row.original.rank;
      return (
        <span className={`flex size-6 items-center justify-center rounded-full border-2 border-neo-black text-xs font-bold ${rank <= 3 ? rankColors[rank - 1] : "bg-secondary"}`}>
          {rank}
        </span>
      );
    },
  },
  { accessorKey: "name", header: "Name", cell: ({ getValue }) => <span className="font-semibold">{getValue() as string}</span> },
  { accessorKey: "quizzes", header: "Quizzes Taken" },
  { accessorKey: "avgScore", header: "Avg Score", cell: ({ getValue }) => <span className="font-semibold text-success">{getValue() as string}</span> },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Analytics Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track performance across all your quizzes.</p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
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
              <p className={`flex items-center gap-0.5 text-[11px] font-semibold ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <RiArrowUpLine className="size-3" /> : <RiArrowDownLine className="size-3" />}
                {stat.change} this week
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-6 xl:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <ChartCard title="Score Distribution" description="How participants score across all quizzes">
          <BarChartComponent data={scoreData} color="#E56498" horizontal />
        </ChartCard>

        <ChartCard title="Weekly Attempts" description="Quiz attempts per day this week">
          <BarChartComponent data={weeklyData} color="#21D3ED" />
        </ChartCard>
      </motion.div>

      <motion.div
        className="grid gap-6 xl:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <ChartCard title="Monthly Trend" description="Total attempts over the past 4 weeks" className="xl:col-span-2">
          <AreaChartComponent data={monthlyTrend} color="#A3E634" />
        </ChartCard>

        <ChartCard title="Question Types" description="Breakdown by type">
          <DonutChartComponent data={questionTypeData} />
          <div className="mt-3 flex flex-col gap-2">
            {questionTypeData.map((q) => (
              <div key={q.name} className="flex items-center gap-2 text-xs">
                <div className="size-2.5 shrink-0 rounded-full border border-neo-black" style={{ backgroundColor: q.color }} />
                <span className="flex-1 font-medium">{q.name}</span>
                <span className="font-bold">{q.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-lg font-bold">Top Quizzes</h2>
        </div>
        <DataTable columns={quizColumns} data={topQuizzes} pageSize={5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <RiTrophyLine className="size-5 text-warning" />
          <h2 className="text-lg font-bold">Top Performers</h2>
        </div>
        <DataTable columns={performerColumns} data={topPerformers} pageSize={5} />
      </motion.div>
    </div>
  );
}
