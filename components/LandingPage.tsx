"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Zap,
  Rocket,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const headlines = [
  "AI Visibility",
  "Search Performance",
  "Bot Accessibility",
  "Digital Presence",
];

const performanceData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 55 },
  { name: "Apr", value: 80 },
  { name: "May", value: 95 },
];

// Animations config
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
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
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 container mx-auto px-6">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-violet-200/50 shadow-lg shadow-violet-500/5"
          >
            <span className="text-violet-600 font-medium flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4" />
              Next Generation AI Search Optimization
            </span>
          </motion.div>

          {/* Headline */}
          <div className="relative h-24 mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
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
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="mt-16 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of AI optimization. Enhance your digital
            presence with intelligent analysis and real-time recommendations
            powered by cutting-edge AI.
          </motion.p>

          {/* CTA Buttons */}
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
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-200 hover:border-violet-200 hover:bg-white/50 h-14 rounded-xl font-medium px-8 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-32 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              icon: Bot,
              title: "AI-Powered Analysis",
              description:
                "Real-time analysis of your site using advanced machine learning algorithms",
              gradient: "from-violet-500 to-purple-500",
              highlight: "violet",
            },
            {
              icon: Zap,
              title: "Instant Optimization",
              description:
                "One-click implementation of AI-recommended improvements",
              gradient: "from-blue-500 to-cyan-500",
              highlight: "blue",
            },
            {
              icon: Rocket,
              title: "Enhanced Visibility",
              description:
                "Boost your site's presence across AI-powered search engines",
              gradient: "from-cyan-500 to-teal-500",
              highlight: "cyan",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="group"
            >
              <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-gray-200/50 bg-white/70 backdrop-blur-sm rounded-xl">
                <CardContent className="p-8">
                  <div
                    className={`rounded-xl bg-gradient-to-r ${feature.gradient} p-3 w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics Carousel */}
        <div className="mt-32 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMetric}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl"
            >
              {/* Performance Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="url(#colorGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
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
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "99%", label: "Accuracy Rate" },
                  { value: "50K+", label: "Sites Analyzed" },
                  { value: "2.5x", label: "Avg. Improvement" },
                  { value: "<2s", label: "Analysis Time" },
                ].map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`text-center ${
                      index === activeMetric
                        ? "scale-110 transition-transform duration-300"
                        : ""
                    }`}
                  >
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">
                      {metric.value}
                    </div>
                    <div className="text-gray-600 mt-1 text-sm">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 p-12"
          >
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Site's AI Visibility?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Join thousands of websites already optimized for AI crawlers.
                Experience the future of search optimization today.
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-50 text-violet-600 h-14 px-8 rounded-xl font-medium shadow-lg shadow-violet-500/20 transition-all duration-300"
              >
                Get Started Free <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
