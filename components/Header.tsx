"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/robots-analysis"); // Navigates to the robots analysis page
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/20 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            AI Optimizer
          </motion.div>
          <div className="flex items-center gap-6">
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
