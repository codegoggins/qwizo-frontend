"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  RiUserLine,
  RiCameraLine,
  RiVerifiedBadgeFill,
  RiGlobalLine,
  RiMapPin2Line,
  RiCalendarLine,
  RiFileListLine,
  RiGroupLine,
  RiTrophyLine,
  RiBarChartLine,
  RiEyeLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

interface QuizRow {
  id: string;
  title: string;
  topic: string;
  attempts: number;
  avgScore: string;
  date: string;
}

const userQuizzes: QuizRow[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    topic: "JavaScript",
    attempts: 234,
    avgScore: "82%",
    date: "Apr 10, 2026",
  },
  {
    id: "2",
    title: "React Fundamentals",
    topic: "React",
    attempts: 189,
    avgScore: "74%",
    date: "Apr 8, 2026",
  },
  {
    id: "4",
    title: "Python for Beginners",
    topic: "Python",
    attempts: 97,
    avgScore: "68%",
    date: "Apr 5, 2026",
  },
  {
    id: "6",
    title: "TypeScript Essentials",
    topic: "JavaScript",
    attempts: 145,
    avgScore: "71%",
    date: "Apr 1, 2026",
  },
  {
    id: "7",
    title: "Node.js Deep Dive",
    topic: "JavaScript",
    attempts: 112,
    avgScore: "65%",
    date: "Mar 28, 2026",
  },
];

const quizColumns: ColumnDef<QuizRow, unknown>[] = [
  {
    accessorKey: "title",
    header: "Quiz",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "topic",
    header: "Topic",
    cell: ({ getValue }) => (
      <Badge variant="default">{getValue() as string}</Badge>
    ),
  },
  { accessorKey: "attempts", header: "Attempts" },
  {
    accessorKey: "avgScore",
    header: "Avg Score",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Created",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue() as string}</span>
    ),
  },
];

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [bio, setBio] = useState(
    "Full-stack developer passionate about teaching JavaScript and React. Building qwizo to make learning fun.",
  );
  const [website, setWebsite] = useState("https://johndoe.dev");
  const [location, setLocation] = useState("San Francisco, CA");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
    e.target.value = "";
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  }

  const stats = [
    {
      label: "Quizzes Created",
      value: "12",
      icon: RiFileListLine,
      color: "#21D3ED",
    },
    {
      label: "Total Attempts",
      value: "1,284",
      icon: RiGroupLine,
      color: "#A3E634",
    },
    { label: "Avg Rating", value: "4.8", icon: RiTrophyLine, color: "#FFB32F" },
    {
      label: "Profile Views",
      value: "3,421",
      icon: RiEyeLine,
      color: "#C184FD",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage how others see you on qwizo.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <div className="flex flex-col gap-4 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
            <div className="relative -mt-12">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-neo-black bg-primary text-3xl font-bold text-primary-foreground shadow-[4px_4px_0px_0px_#1B1B1B]">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="size-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-neo-black bg-background shadow-[2px_2px_0px_0px_#1B1B1B] hover:bg-muted"
              >
                <RiCameraLine className="size-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">
                  {name}
                </h2>
                <RiVerifiedBadgeFill className="size-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">@{username}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                {location && (
                  <span className="flex items-center gap-1">
                    <RiMapPin2Line className="size-3" />
                    {location}
                  </span>
                )}
                {website && (
                  <a
                    href={website}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <RiGlobalLine className="size-3" />
                    {website.replace(/^https?:\/\//, "")}
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <RiCalendarLine className="size-3" />
                  Joined Mar 2026
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RiEyeLine className="size-4" />
            View Public Profile
          </Button>
        </div>
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
              <p className="text-xs font-semibold text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-extrabold tracking-tight">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Display Name</h2>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Username</h2>
          <div className="flex items-center gap-0">
            <span className="flex h-10 items-center rounded-l-md border-2 border-r-0 border-neo-black bg-secondary px-3 text-sm font-semibold text-muted-foreground">
              qwizo.app/@
            </span>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-l-none"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-4 text-lg font-bold">Bio</h2>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          maxLength={160}
          placeholder="Tell others about yourself..."
          className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted-foreground text-right">
          {bio.length}/160
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Website</h2>
          <Input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yoursite.com"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Location</h2>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-center justify-end gap-3"
      >
        <Button variant="outline">Reset</Button>
        <Button variant="success" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <RiBarChartLine className="size-5 text-primary" />
          <h2 className="text-lg font-bold">My Quizzes</h2>
        </div>
        <DataTable columns={quizColumns} data={userQuizzes} pageSize={5} />
      </motion.div>
    </div>
  );
}
