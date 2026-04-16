"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiLockLine,
  RiBankCardLine,
  RiCheckLine,
  RiSparklingLine,
} from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { plans } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "basic";
  const billing = searchParams.get("billing") || "monthly";
  const isTrial = searchParams.get("trial") === "true";

  const plan = plans.find((p) => p.id === planId) || plans[1];
  const yearly = billing === "yearly";
  const basePrice = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  const [paymentMethod, setPaymentMethod] = useState<"card" | "google">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("John Doe");
  const [country, setCountry] = useState("us");
  const [zip, setZip] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [processing, setProcessing] = useState(false);

  const discount = promoApplied ? Math.round(basePrice * 0.1) : 0;
  const tax = Math.round((basePrice - discount) * 0.08);
  const total = basePrice - discount + tax;

  function applyPromo() {
    if (promo.toLowerCase() === "qwizo10") {
      setPromoApplied(true);
    }
  }

  function handlePay() {
    setProcessing(true);
    setTimeout(() => {
      router.push("/dashboard/pricing?success=true");
    }, 2000);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/dashboard/pricing"
          className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <RiArrowLeftSLine className="size-4" />
          Back to pricing
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isTrial ? "Start your 14-day free trial — no charge today." : "Finalize your subscription."}
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6 lg:col-span-2"
        >
          <div className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]">
            <h2 className="mb-4 text-lg font-bold">Payment Method</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                  paymentMethod === "card"
                    ? "border-neo-black bg-primary/10 shadow-[3px_3px_0px_0px_#1B1B1B]"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <RiBankCardLine className="size-5" />
                <span className="font-semibold">Card</span>
                {paymentMethod === "card" && <RiCheckLine className="ml-auto size-4 text-success" />}
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("google")}
                className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                  paymentMethod === "google"
                    ? "border-neo-black bg-primary/10 shadow-[3px_3px_0px_0px_#1B1B1B]"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <FcGoogle className="size-5" />
                <span className="font-semibold">Google Pay</span>
                {paymentMethod === "google" && <RiCheckLine className="ml-auto size-4 text-success" />}
              </button>
            </div>
          </div>

          {paymentMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
            >
              <h2 className="mb-4 text-lg font-bold">Card Details</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">Cardholder Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">Card Number</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">Expiry</label>
                    <Input
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      maxLength={7}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold">CVC</label>
                    <Input
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]">
            <h2 className="mb-4 text-lg font-bold">Billing Address</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">Country</label>
                <Select options={countryOptions} value={country} onValueChange={setCountry} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">ZIP / Postal Code</label>
                <Input
                  placeholder="94103"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start"
        >
          <div className="rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]">
            <div className="flex items-center gap-3 border-b-2 border-neo-black p-5">
              <div
                className="flex size-10 items-center justify-center rounded-lg border-2 border-neo-black"
                style={{ backgroundColor: plan.color }}
              >
                <RiSparklingLine className="size-5 text-neo-black" />
              </div>
              <div>
                <p className="text-lg font-extrabold tracking-tight">{plan.name} Plan</p>
                <p className="text-xs text-muted-foreground">{yearly ? "Billed yearly" : "Billed monthly"}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${basePrice}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Discount <Badge variant="success" className="ml-1">QWIZO10</Badge>
                  </span>
                  <span className="font-semibold text-success">-${discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-semibold">${tax}</span>
              </div>

              <div className="flex items-baseline justify-between border-t-2 border-border pt-3">
                <span className="text-base font-bold">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold">${total}</span>
                  <span className="text-xs text-muted-foreground">
                    {yearly ? "/year" : "/month"}
                  </span>
                </div>
              </div>

              {isTrial && (
                <div className="rounded-lg border-2 border-success bg-success/10 p-3 text-center">
                  <p className="text-xs font-bold text-success">FREE FOR 14 DAYS</p>
                  <p className="text-[10px] text-muted-foreground">You won&apos;t be charged until the trial ends.</p>
                </div>
              )}
            </div>

            <div className="border-t-2 border-neo-black p-5">
              <div className="mb-3 flex flex-col gap-1.5">
                <label className="text-xs font-semibold">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="QWIZO10"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={applyPromo}
                    disabled={!promo || promoApplied}
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
              </div>

              <Button
                variant="success"
                className="w-full gap-2"
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <RiSparklingLine className="size-4" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <RiLockLine className="size-4" />
                    {isTrial ? "Start Free Trial" : `Pay $${total}`}
                  </>
                )}
              </Button>

              <p className="mt-3 text-center text-[10px] text-muted-foreground">
                By continuing, you agree to the{" "}
                <Link href="#" className="underline">Terms</Link> and{" "}
                <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border-2 border-border p-3 text-xs text-muted-foreground">
            <RiLockLine className="size-4 shrink-0" />
            <span>Secure encrypted payment. Cancel anytime.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
