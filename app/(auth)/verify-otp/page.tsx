"use client"

import { useRef } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiShieldKeyholeLine } from "react-icons/ri"
import { otpSchema, type OtpFormData } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"

export default function VerifyOtpPage() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return

    const inputs = inputsRef.current
    if (value && index < 5) {
      inputs[index + 1]?.focus()
    }

    const otp = inputs.map((input) => input?.value || "").join("")
    setValue("otp", otp, { shouldValidate: otp.length === 6 })
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !inputsRef.current[index]?.value && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    pasted.split("").forEach((char, i) => {
      const input = inputsRef.current[i]
      if (input) input.value = char
    })
    setValue("otp", pasted, { shouldValidate: pasted.length === 6 })
    inputsRef.current[Math.min(pasted.length, 5)]?.focus()
  }

  function onSubmit(data: OtpFormData) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center border-2 border-neo-black bg-primary shadow-[4px_4px_0px_0px_#1B1B1B]">
          <RiShieldKeyholeLine className="size-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Verify OTP</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {Array.from({ length: 6 }, (_, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="size-12 border-2 border-neo-black bg-background text-center text-lg font-bold shadow-[3px_3px_0px_0px_#1B1B1B] transition-shadow focus:shadow-[1px_1px_0px_0px_#1B1B1B] focus:outline-none"
            />
          ))}
        </div>

        {errors.otp && (
          <p className="text-center text-xs text-destructive">{errors.otp.message}</p>
        )}

        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>

      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <p>
          Didn&apos;t receive the code?{" "}
          <button type="button" className="font-semibold text-primary hover:underline">
            Resend
          </button>
        </p>
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
