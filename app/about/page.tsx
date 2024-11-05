"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RocketIcon, SearchIcon, BrainCircuitIcon } from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function AboutPage() {
  const features = [
    {
      icon: <SearchIcon className="h-6 w-6 text-blue-500" />,
      title: "Analyze Robots.txt",
      description: "Quickly scan and interpret your website's robots.txt file.",
    },
    {
      icon: <BrainCircuitIcon className="h-6 w-6 text-purple-500" />,
      title: "AI-Powered Recommendations",
      description:
        "Get intelligent suggestions to optimize your robots.txt for better SEO.",
    },
    {
      icon: <RocketIcon className="h-6 w-6 text-green-500" />,
      title: "Boost Performance",
      description:
        "Improve your website's crawlability and search engine performance.",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4 overflow-hidden">
      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-8">
          <motion.h1
            className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Optimization Analysis Tool
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Empower your website's SEO with our cutting-edge AI-driven
            robots.txt analyzer and optimizer.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="bg-white/50 p-3 rounded-full mb-3 shadow-md">
                  {feature.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h2>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <SignedOut>
              <SignInButton>
                <Button
                  variant="default"
                  size="sm"
                  className="h-7 text-xs px-3 font-bold"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
