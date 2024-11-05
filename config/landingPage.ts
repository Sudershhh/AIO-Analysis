import {
  Bot,
  Zap,
  Rocket,
  Shield,
  Search,
  Code,
  FileText,
  Settings,
  BarChart,
  RefreshCw,
} from "lucide-react";

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
    avatar: "/avatar-female.jfif",
  },
  {
    name: "Michael Rodriguez",
    role: "Digital Marketing Director",
    company: "Future Scale",
    content:
      "The insights from AIO helped us identify and fix critical robots.txt issues we didn't even know existed.",
    avatar: "/avatar-male.jfif",
  },
  {
    name: "Emily Watson",
    role: "Web Developer",
    company: "DevFlow",
    content:
      "The real-time analysis and recommendations have made AI optimization accessible and actionable for our entire team.",
    avatar: "/avatar-female.jfif",
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

export const howItWorks = [
  {
    icon: FileText,
    title: "Upload Your robots.txt",
    description: "Simply paste your robots.txt content or upload the file",
  },
  {
    icon: Settings,
    title: "Automated Analysis",
    description: "Our AI analyzes your file for optimization opportunities",
  },
  {
    icon: BarChart,
    title: "Get Insights",
    description: "Receive detailed reports and actionable recommendations",
  },
];

export const analytics = [
  {
    label: "Crawl Rate",
    value: "+127%",
    icon: RefreshCw,
    trend: "up",
  },
  {
    label: "Optimization Score",
    value: "94",
    icon: BarChart,
    trend: "up",
  },
  {
    label: "Pages Indexed",
    value: "12,847",
    icon: FileText,
    trend: "up",
  },
  {
    label: "AI Visibility Score",
    value: "A+",
    icon: Bot,
    trend: "stable",
  },
];

export const faq = [
  {
    question: "What is AI Optimization?",
    answer:
      "AI Optimization involves configuring your website to be more easily understood and indexed by AI-powered crawlers and search engines. This includes properly structured robots.txt files, sitemaps, and metadata optimized for machine learning algorithms.",
  },
  {
    question: "How does the AIO Analysis Tool work?",
    answer:
      "Our tool analyzes your robots.txt file and website structure using advanced AI algorithms. It provides real-time recommendations for improving crawler accessibility, identifies potential issues, and suggests optimizations to enhance your site's visibility to AI-powered search engines.",
  },
  {
    question: "Is this different from regular SEO?",
    answer:
      "Yes! While traditional SEO focuses on keywords and human-readable content, AI Optimization focuses on making your site more accessible and understandable to AI crawlers and machine learning algorithms. This becomes increasingly important as search engines evolve to use more AI-powered ranking systems.",
  },
];
