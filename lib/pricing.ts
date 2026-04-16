export interface PricingFeature {
  label: string;
  free: string | boolean;
  basic: string | boolean;
  pro: string | boolean;
}

export interface Plan {
  id: "free" | "basic" | "pro";
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  color: string;
  highlights: string[];
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Dip your toes in",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "#A3E634",
    highlights: [
      "3 quizzes per month",
      "5 MB per upload",
      "100 AI questions / month",
      "Basic analytics",
      "Public leaderboards",
      "qwizo watermark",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    tagline: "Level up your game",
    monthlyPrice: 9,
    yearlyPrice: 90,
    color: "#21D3ED",
    popular: true,
    highlights: [
      "25 quizzes per month",
      "100 MB per upload",
      "500 AI questions / month",
      "Advanced analytics",
      "Remove watermark",
      "Custom branding",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Unleash the beast",
    monthlyPrice: 29,
    yearlyPrice: 290,
    color: "#E56498",
    highlights: [
      "Unlimited quizzes",
      "1 GB per upload",
      "Unlimited AI questions",
      "Team collaboration",
      "White-label branding",
      "Priority AI processing",
      "Custom domain",
      "24/7 priority support",
    ],
  },
];

export const comparisonFeatures: PricingFeature[] = [
  { label: "Quiz Creations", free: "3 / month", basic: "25 / month", pro: "Unlimited" },
  { label: "File Upload Size", free: "5 MB", basic: "100 MB", pro: "1 GB" },
  { label: "AI Questions", free: "100 / month", basic: "500 / month", pro: "Unlimited" },
  { label: "Document Types", free: "PDF only", basic: "PDF, Images", pro: "PDF, Images, Audio" },
  { label: "Analytics", free: "Basic", basic: "Advanced", pro: "Advanced + Export" },
  { label: "Leaderboards", free: true, basic: true, pro: true },
  { label: "Custom Branding", free: false, basic: true, pro: true },
  { label: "Remove Watermark", free: false, basic: true, pro: true },
  { label: "Team Collaboration", free: false, basic: false, pro: true },
  { label: "White-label", free: false, basic: false, pro: true },
  { label: "API Access", free: false, basic: false, pro: true },
  { label: "Custom Domain", free: false, basic: false, pro: true },
  { label: "Priority AI Processing", free: false, basic: false, pro: true },
  { label: "Support", free: "Community", basic: "Email", pro: "24/7 Priority" },
];

export const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel whenever you want — no questions asked. You keep access until the end of your billing period.",
  },
  {
    q: "Do you offer refunds?",
    a: "If you're not happy within 14 days, we'll refund every penny. No questions asked.",
  },
  {
    q: "What happens if I exceed my limit?",
    a: "You won't be charged extra. We'll let you know and pause new creations until next cycle or upgrade.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade or downgrade anytime — changes apply instantly and we prorate the difference.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes! Email us with your .edu address and get 50% off Basic or Pro.",
  },
];
