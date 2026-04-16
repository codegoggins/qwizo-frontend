"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCheckLine,
  RiCloseLine,
  RiSparklingLine,
  RiFlashlightLine,
  RiRocketLine,
  RiArrowDownSLine,
  RiStarFill,
} from "react-icons/ri";
import { plans, comparisonFeatures, faqs } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const planIcons = {
  free: RiSparklingLine,
  basic: RiFlashlightLine,
  pro: RiRocketLine,
};

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentPlan = "free";

  return (
    <div className="flex flex-col gap-12 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Badge variant="default" className="gap-1.5 px-3 py-1">
          <RiStarFill className="size-3 text-warning" />
          Pricing that scales with you
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Level up your <span className="text-primary">quiz game</span>
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Start free, upgrade when you&apos;re ready to go brrr. Cancel anytime — no drama.
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-full border-2 border-neo-black bg-background p-1 shadow-[3px_3px_0px_0px_#1B1B1B]">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              !yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Yearly
            <Badge variant="success" className="px-1.5 py-0">Save 20%</Badge>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan) => {
          const Icon = planIcons[plan.id];
          const price = yearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
          const isCurrent = plan.id === currentPlan;

          return (
            <motion.div
              key={plan.id}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className={`relative flex flex-col gap-5 rounded-xl border-2 border-neo-black bg-background p-6 transition-transform ${
                plan.popular ? "shadow-[6px_6px_0px_0px_#1B1B1B] md:-translate-y-2" : "shadow-[4px_4px_0px_0px_#1B1B1B]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" className="gap-1 px-3 py-1">
                    <RiStarFill className="size-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg border-2 border-neo-black"
                  style={{ backgroundColor: plan.color }}
                >
                  <Icon className="size-5 text-neo-black" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">${price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
                {yearly && plan.monthlyPrice > 0 && (
                  <span className="ml-2 text-xs font-semibold text-muted-foreground line-through">
                    ${plan.monthlyPrice}
                  </span>
                )}
              </div>

              {isCurrent ? (
                <Button variant="outline" disabled className="w-full gap-1.5">
                  <RiCheckLine className="size-4" />
                  Current Plan
                </Button>
              ) : (
                <Link href={`/dashboard/pricing/checkout?plan=${plan.id}&billing=${yearly ? "yearly" : "monthly"}`}>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    {plan.id === "pro" ? "Go Pro" : `Upgrade to ${plan.name}`}
                  </Button>
                </Link>
              )}

              <div className="border-t-2 border-border pt-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-2.5">
                  {plan.highlights.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <RiCheckLine className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <div className="border-b-2 border-neo-black px-6 py-5">
          <h2 className="text-xl font-bold">Compare Plans</h2>
          <p className="text-sm text-muted-foreground">The nitty-gritty of what each plan offers.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-neo-black bg-secondary">
                <th className="px-6 py-3 text-left font-bold">Feature</th>
                <th className="px-6 py-3 text-left font-bold">Free</th>
                <th className="px-6 py-3 text-left font-bold">
                  <span className="flex items-center gap-2">
                    Basic
                    <Badge variant="primary" className="px-1.5 py-0 text-[10px]">Popular</Badge>
                  </span>
                </th>
                <th className="px-6 py-3 text-left font-bold">Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.slice(0, 4).map((feat) => (
                <tr key={feat.label} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-semibold">{feat.label}</td>
                  {[feat.free, feat.basic, feat.pro].map((val, i) => (
                    <td key={i} className="px-6 py-3">
                      {typeof val === "boolean" ? (
                        val ? (
                          <RiCheckLine className="size-5 text-success" />
                        ) : (
                          <RiCloseLine className="size-5 text-muted-foreground" />
                        )
                      ) : (
                        <span className="font-medium">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-col gap-4"
      >
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">Got questions?</h2>
          <p className="mt-1 text-sm text-muted-foreground">We got answers. Also: we got emails — hit us up anytime.</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[3px_3px_0px_0px_#1B1B1B]"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-bold hover:bg-muted"
              >
                {faq.q}
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiArrowDownSLine className="size-5" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t-2 border-neo-black"
                  >
                    <p className="px-5 py-4 text-sm text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-xl border-2 border-neo-black bg-primary p-8 text-center text-primary-foreground shadow-[6px_6px_0px_0px_#1B1B1B]"
      >
        <h3 className="text-2xl font-extrabold tracking-tight">Still not sure?</h3>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-90">
          Try Basic free for 14 days. No card required. Cancel anytime if it&apos;s not your vibe.
        </p>
        <Link href="/dashboard/pricing/checkout?plan=basic&trial=true">
          <Button variant="outline" className="mt-4 bg-background">
            Start Free Trial
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
