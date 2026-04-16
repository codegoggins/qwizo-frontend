"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiHome4Line, RiRefreshLine, RiErrorWarningLine, RiBugLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex size-32 items-center justify-center rounded-full border-4 border-neo-black bg-destructive shadow-[6px_6px_0px_0px_#1B1B1B]"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <RiErrorWarningLine className="size-16 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Oops, something <span className="text-destructive">broke</span>
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Our servers just hit a wrong answer. Don&apos;t worry — it&apos;s not you, it&apos;s us.
        </p>
      </motion.div>

      {error.digest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-2 font-mono text-xs text-muted-foreground"
        >
          <RiBugLine className="size-3.5" />
          <span>Error ID: {error.digest}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <Button onClick={reset} className="gap-2">
          <RiRefreshLine className="size-4" />
          Try Again
        </Button>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <RiHome4Line className="size-4" />
            Go Home
          </Button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="text-xs text-muted-foreground"
      >
        If this keeps happening, please{" "}
        <Link href="#" className="font-semibold text-primary hover:underline">
          let us know
        </Link>
        .
      </motion.p>
    </div>
  );
}
