"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import RobotsAnalysis from "@/components/RobotsAnalysis";
import HistorySidebar from "@/components/HistorySidebar";
import { useUser } from "@clerk/nextjs";
import { useRobotsStore } from "@/store/useRobotsStore";

export default function Dashboard() {
  const {
    url,
    setUrl,
    loading,
    fetchRobotsTxt,
    fetchHistory,
    robotsTxt,
    analysisResults,
  } = useRobotsStore();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user, fetchHistory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <HistorySidebar />
        <main className="flex-1 p-8">
          <motion.h1
            className="text-3xl font-bold text-center mb-8 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Optimization Analysis Tool
          </motion.h1>
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              type="url"
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full max-w-md mr-2"
              aria-label="Website URL input"
            />
            <Button
              onClick={() => fetchRobotsTxt(url)}
              disabled={loading || !url}
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              Analyze
            </Button>
          </motion.div>

          {/* {loading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-gray-600" />
              <p className="mt-4 text-lg text-gray-600">
                Analyzing robots.txt...
              </p>
            </motion.div>
          )} */}

          {robotsTxt && analysisResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RobotsAnalysis />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
