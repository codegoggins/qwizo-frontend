"use client"

import Link from "next/link"
import { RiMailCheckLine } from "react-icons/ri"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex size-16 items-center justify-center border-2 border-neo-black bg-success shadow-[4px_4px_0px_0px_#1B1B1B]">
        <RiMailCheckLine className="size-8 text-neo-black" />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Email verified</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your email has been verified successfully. You can now log in.
        </p>
      </div>
      <Link href="/login">
        <Button>Go to login</Button>
      </Link>
    </div>
  )
}
