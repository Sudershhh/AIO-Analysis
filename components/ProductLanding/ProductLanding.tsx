"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { headlines, fadeInUp } from "@/config/landingPage";
import Footer from "../Footer";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Testimonials from "./Testimonials";
import PricingSection from "./PricingSection";
import Analytics from "./Analytics";
import Faq from "./FAQ";

function ProductLanding() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
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

            <HowItWorks />

            <Features />

            <Testimonials />

            <PricingSection />

            <Analytics />

            <Faq />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductLanding;
