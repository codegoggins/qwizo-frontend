"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiHome4Line, RiSearchLine, RiSwordLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        <motion.h1
          animate={{ rotate: [0, -3, 3, -3, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[180px] font-extrabold leading-none tracking-tighter md:text-[240px]"
          style={{ WebkitTextStroke: "4px #1B1B1B", color: "#E56498" }}
        >
          404
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight">Quiz not found</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Looks like this page took the wrong answer. Let&apos;s get you back on track.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <Link href="/dashboard">
          <Button className="gap-2">
            <RiHome4Line className="size-4" />
            Go Home
          </Button>
        </Link>
        <Link href="/arena">
          <Button variant="outline" className="gap-2">
            <RiSwordLine className="size-4" />
            Browse Arena
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="flex items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-2 text-xs text-muted-foreground"
      >
        <RiSearchLine className="size-3.5" />
        <span>Error code: 404 · Page could not be found</span>
      </motion.div>
    </div>
  );
}
