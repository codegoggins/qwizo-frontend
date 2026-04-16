"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  RiVipCrownLine,
  RiFileListLine,
  RiGroupLine,
  RiBarChartLine,
  RiAddCircleLine,
  RiUploadCloud2Line,
  RiLineChartLine,
  RiShareLine,
  RiEditLine,
  RiEyeLine,
  RiSettingsLine,
  RiTrophyLine,
} from "react-icons/ri";
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

const stats = [
  { label: "Total Quizzes", value: "12", sublabel: "+3 this week", icon: RiFileListLine, color: "#21D3ED" },
  { label: "Total Attempts", value: "1,284", sublabel: "+156 this week", icon: RiGroupLine, color: "#A3E634" },
  { label: "Avg Score", value: "74%", sublabel: "Across all quizzes", icon: RiBarChartLine, color: "#FFB32F" },
  { label: "Plan", value: "Free", sublabel: "Upgrade for more", icon: RiVipCrownLine, color: "#C184FD" },
];

const quickActions = [
  { label: "Create Quiz", href: "/dashboard/quizzes/create", icon: RiAddCircleLine },
  { label: "Upload Document", href: "/dashboard/upload", icon: RiUploadCloud2Line },
  { label: "View Analytics", href: "/dashboard/analytics", icon: RiLineChartLine },
  { label: "Share Quiz", href: "/dashboard/quizzes", icon: RiShareLine },
];

interface RecentQuiz {
  id: string;
  title: string;
  status: string;
  questions: number;
  attempts: number;
  date: string;
}

const recentQuizzes: RecentQuiz[] = [
  { id: "1", title: "JavaScript Basics", status: "published", questions: 15, attempts: 234, date: "Apr 10, 2026" },
  { id: "2", title: "React Fundamentals", status: "published", questions: 20, attempts: 189, date: "Apr 8, 2026" },
  { id: "3", title: "System Design 101", status: "draft", questions: 10, attempts: 0, date: "Apr 7, 2026" },
  { id: "4", title: "Python for Beginners", status: "published", questions: 25, attempts: 97, date: "Apr 5, 2026" },
  { id: "5", title: "CSS Grid & Flexbox", status: "draft", questions: 8, attempts: 0, date: "Apr 3, 2026" },
];

const quizColumns: ColumnDef<RecentQuiz, unknown>[] = [
  { accessorKey: "title", header: "Title", cell: ({ getValue }) => <span className="font-medium">{getValue() as string}</span> },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant={status === "published" ? "success" : "warning"}>
          {status === "published" ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  { accessorKey: "questions", header: "Questions" },
  { accessorKey: "attempts", header: "Attempts" },
  { accessorKey: "date", header: "Date", cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span> },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link href={`/dashboard/quizzes/${row.original.id}/edit`} className="p-1 text-muted-foreground hover:text-foreground">
          <RiEditLine className="size-4" />
        </Link>
        <Link href={`/dashboard/quizzes/${row.original.id}/preview`} className="p-1 text-muted-foreground hover:text-foreground">
          <RiEyeLine className="size-4" />
        </Link>
        <Link href={`/dashboard/quizzes/${row.original.id}/settings`} className="p-1 text-muted-foreground hover:text-foreground">
          <RiSettingsLine className="size-4" />
        </Link>
        <Link href={`/dashboard/quizzes/${row.original.id}/leaderboard`} className="p-1 text-muted-foreground hover:text-warning">
          <RiTrophyLine className="size-4" />
        </Link>
      </div>
    ),
  },
];

const recentActivity = [
  { text: "Alex scored 95% on JavaScript Basics", time: "2 min ago" },
  { text: "Jordan completed React Fundamentals", time: "15 min ago" },
  { text: "You published Python for Beginners", time: "1 hour ago" },
  { text: "Sam scored 68% on JavaScript Basics", time: "3 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, John</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your quizzes.</p>
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
              className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black"
              style={{ backgroundColor: stat.color }}
            >
              <stat.icon className="size-6 text-neo-black" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-extrabold tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground">{stat.sublabel}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {quickActions.map((action) => (
          <motion.div key={action.label} variants={fadeUp} transition={{ duration: 0.4 }}>
            <Link
              href={action.href}
              className="flex items-center gap-3 rounded-xl border-2 border-neo-black bg-background px-5 py-4 font-semibold shadow-[3px_3px_0px_0px_#1B1B1B] transition-all hover:shadow-[1px_1px_0px_0px_#1B1B1B] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <action.icon className="size-5 text-primary" />
              {action.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-6 xl:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Quizzes</h2>
            <Link href="/dashboard/quizzes">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          <DataTable columns={quizColumns} data={recentQuizzes} pageSize={5} />
        </div>

        <div className="rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]">
          <div className="border-b-2 border-neo-black px-5 py-4">
            <h2 className="text-lg font-bold">Recent Activity</h2>
          </div>
          <div className="flex flex-col">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-3 border-b border-border px-5 py-4 last:border-0"
              >
                <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
