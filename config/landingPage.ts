import { Bot, Zap, Rocket, Shield, Search, Code } from "lucide-react";

export const headlines = [
  "Website Visibility",
  "Search Performance",
  "Bot Accessibility",
  "Digital Presence",
  "AI Crawlability",
];

export const performanceData = [
  { name: "Jan", value: 30, crawlers: 20 },
  { name: "Feb", value: 45, crawlers: 35 },
  { name: "Mar", value: 55, crawlers: 48 },
  { name: "Apr", value: 80, crawlers: 65 },
  { name: "May", value: 95, crawlers: 88 },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "SEO Manager",
    company: "TechGrowth",
    content:
      "AIO Analysis Tool transformed our approach to AI optimization. Our site's visibility improved by 200% in just two months.",
    avatar: "/api/placeholder/40/40",
  },
  {
    name: "Michael Rodriguez",
    role: "Digital Marketing Director",
    company: "Future Scale",
    content:
      "The insights from AIO helped us identify and fix critical robots.txt issues we didn't even know existed.",
    avatar: "/api/placeholder/40/40",
  },
  {
    name: "Emily Watson",
    role: "Web Developer",
    company: "DevFlow",
    content:
      "The real-time analysis and recommendations have made AI optimization accessible and actionable for our entire team.",
    avatar: "/api/placeholder/40/40",
  },
];

export const features = [
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description:
      "Real-time analysis of your robots.txt and site structure using advanced machine learning algorithms",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Instant Optimization",
    description:
      "One-click implementation of AI-recommended improvements with automatic validation",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Enhanced Visibility",
    description:
      "Boost your site's presence across AI-powered search engines and crawlers",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Ensure your robots.txt properly protects sensitive content while maximizing visibility",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Search,
    title: "Deep Insights",
    description:
      "Comprehensive analysis of crawler behavior and optimization opportunities",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Code,
    title: "Custom Rules",
    description:
      "Create and test custom robots.txt rules with real-time validation",
    gradient: "from-violet-500 to-indigo-500",
  },
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal websites and small projects",
    features: [
      "Basic robots.txt analysis",
      "Monthly crawler reports",
      "Essential optimization tips",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    description: "Ideal for growing businesses and professional sites",
    features: [
      "Advanced AI analysis",
      "Real-time monitoring",
      "Custom rule creation",
      "Priority support",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs",
    features: [
      "Custom integration",
      "Dedicated support",
      "Advanced API access",
      "Custom reporting",
      "SLA guarantee",
    ],
  },
];

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};
