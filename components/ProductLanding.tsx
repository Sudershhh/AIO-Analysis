"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Sparkles,
  Check,
  Settings,
  BarChart,
  RefreshCw,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  headlines,
  performanceData,
  testimonials,
  pricingTiers,
  fadeInUp,
  features,
} from "@/config/landingPage";

function ProductLanding() {
  const [headlineIndex, setHeadlineIndex] = React.useState(0);
  const [activeMetric, setActiveMetric] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet-600 text-white px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>

      {/* Animated background shapes */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-violet-200/30 to-pink-200/30 blur-3xl"
          style={{
            top: "10%",
            right: "-10%",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-200/30 to-cyan-200/30 blur-3xl"
          style={{
            bottom: "-20%",
            left: "-10%",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-20 md:pt-40 md:pb-32 container mx-auto px-6"
          aria-labelledby="hero-heading"
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-violet-200/50 shadow-lg shadow-violet-500/5"
            >
              <span className="text-violet-600 font-medium flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Next Generation AI Search Optimization
              </span>
            </motion.div>

            {/* Dynamic Headline */}
            <h1 id="hero-heading" className="sr-only">
              AIO Analysis Tool - AI Optimization Made Simple
            </h1>
            <div className="relative h-24 mb-6" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={headlines[headlineIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-5xl md:text-7xl font-bold text-gray-900 absolute w-full tracking-tight"
                  style={{ fontFamily: "'CalSans-SemiBold', sans-serif" }}
                >
                  Supercharge Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600">
                    {headlines[headlineIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.p
              variants={fadeInUp}
              className="mt-16 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the future of AI optimization. Enhance your digital
              presence with intelligent analysis and real-time recommendations
              powered by cutting-edge AI.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 hover:opacity-90 text-white px-8 h-14 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center font-medium">
                  Start Optimizing Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            {/* How It Works Section */}
            <section
              className="mt-32 py-16"
              aria-labelledby="how-it-works-heading"
            >
              <h2
                id="how-it-works-heading"
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    icon: FileText,
                    title: "Upload Your robots.txt",
                    description:
                      "Simply paste your robots.txt content or upload the file",
                  },
                  {
                    icon: Settings,
                    title: "Automated Analysis",
                    description:
                      "Our AI analyzes your file for optimization opportunities",
                  },
                  {
                    icon: BarChart,
                    title: "Get Insights",
                    description:
                      "Receive detailed reports and actionable recommendations",
                  },
                ].map((step, index) => (
                  <Card key={step.title} className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                          <step.icon
                            className="w-4 h-4 text-violet-600"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-sm text-violet-600 font-medium">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Features Grid */}
            <section className="mt-32" aria-labelledby="features-heading">
              <h2
                id="features-heading"
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                Powerful Features
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div
                          className={`rounded-xl bg-gradient-to-r ${feature.gradient} p-3 w-12 h-12 mb-4`}
                        >
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Testimonials Carousel */}
            <section className="mt-32" aria-labelledby="testimonials-heading">
              <h2
                id="testimonials-heading"
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                What Our Users Say
              </h2>
              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <Card className="mx-4">
                        <CardContent className="p-8">
                          <div className="flex items-center mb-4">
                            <img
                              src={testimonial.avatar}
                              alt=""
                              className="w-10 h-10 rounded-full mr-4"
                              aria-hidden="true"
                            />
                            <div>
                              <h3 className="font-semibold">
                                {testimonial.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {testimonial.role} at {testimonial.company}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 italic">
                            "{testimonial.content}"
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            {/* Pricing Section */}
            <section className="mt-32" aria-labelledby="pricing-heading">
              <h2
                id="pricing-heading"
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                Simple, Transparent Pricing
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingTiers.map((tier) => (
                  <Card
                    key={tier.name}
                    className={`relative ${
                      tier.highlighted
                        ? "border-2 border-violet-500 shadow-lg"
                        : "border border-gray-200"
                    }`}
                  >
                    <CardContent className="p-6">
                      {tier.highlighted && (
                        <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-violet-500 text-white px-3 py-1 rounded-full text-sm">
                          Popular
                        </span>
                      )}
                      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{tier.price}</span>
                        {tier.price !== "Custom" && (
                          <span className="text-gray-600">/month</span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-6">{tier.description}</p>
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center text-gray-600"
                          >
                            <Check
                              className="h-5 w-5 text-violet-500 mr-2"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          tier.highlighted
                            ? "bg-violet-600 text-white hover:bg-violet-700"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Analytics Dashboard Preview */}
            <section className="mt-32" aria-labelledby="analytics-heading">
              <h2
                id="analytics-heading"
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                Powerful Analytics Dashboard
              </h2>
              <Card className="max-w-6xl mx-auto">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Chart Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Crawler Performance
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              name="Optimization Score"
                              stroke="url(#colorGradient)"
                              strokeWidth={3}
                              dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="crawlers"
                              name="Crawler Activity"
                              stroke="url(#colorGradient2)"
                              strokeWidth={3}
                              dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                            />
                            <defs>
                              <linearGradient
                                id="colorGradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                              >
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#3b82f6" />
                              </linearGradient>
                              <linearGradient
                                id="colorGradient2"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                              >
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#0ea5e9" />
                              </linearGradient>
                            </defs>
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Key Metrics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
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
                        ].map((metric) => (
                          <Card key={metric.label}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <metric.icon
                                  className="h-5 w-5 text-violet-500"
                                  aria-hidden="true"
                                />
                                <span
                                  className={`text-sm ${
                                    metric.trend === "up"
                                      ? "text-green-500"
                                      : "text-blue-500"
                                  }`}
                                >
                                  {metric.trend === "up" && "↑"}
                                  {metric.trend === "down" && "↓"}
                                  {metric.trend === "stable" && "→"}
                                </span>
                              </div>
                              <div className="text-2xl font-bold">
                                {metric.value}
                              </div>
                              <div className="text-sm text-gray-600">
                                {metric.label}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section className="mt-32" aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto">
                {[
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
                ].map((faq, index) => (
                  <Card key={index} className="mb-4">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </motion.div>
        </section>
      </main>
      <footer
        className="mt-32 border-t border-gray-200 bg-white"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-violet-600" aria-hidden="true" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  AIO Analysis
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-600">
                Making AI optimization simple and accessible for everyone.
              </p>
              <div className="flex space-x-6">
                {[
                  {
                    icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                    name: "Twitter",
                  },
                  {
                    icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12",
                    name: "Facebook",
                  },
                  {
                    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                    name: "LinkedIn",
                  },
                  {
                    icon: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12",
                    name: "GitHub",
                  },
                ].map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={item.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Product
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {["Features", "Pricing", "API", "Documentation"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {["About", "Blog", "Careers", "Press"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {["Help Center", "Community", "Status", "Contact"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Legal
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {["Privacy", "Terms", "Cookie Policy", "License"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} AIO Analysis. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductLanding;
