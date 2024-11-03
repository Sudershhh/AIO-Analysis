"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import RobotsAnalysis from "@/components/RobotsAnalysis";
import HistorySidebar from "@/components/HistorySidebar";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<{
    robotsTxt: string;
    analysisResults: any;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
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
  }, [user]);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history");
      if (response.ok) {
        const historyData = await response.json();
        setHistory(historyData);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const fetchRobotsTxt = async () => {
    setError(null);
    setData(null);
    setLoading(true);
    try {
      const formattedUrl = url.endsWith("robots.txt")
        ? url
        : `${url}/robots.txt`;
      const response = await fetch(
        `/api/fetch-robots?url=${encodeURIComponent(formattedUrl)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch robots.txt");
      }
      const result = await response.json();
      setData(result);
      await saveToHistory(formattedUrl, result);
      await fetchHistory();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = async (url: string, data: any) => {
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, data }),
      });
    } catch (error) {
      console.error("Failed to save to history:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <HistorySidebar
          history={history}
          onSelectHistory={(item) => {
            setUrl(item.url);
            setData(item.data);
          }}
        />
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
              onClick={fetchRobotsTxt}
              disabled={loading || !url}
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              Analyze
            </Button>
          </motion.div>

          {loading && (
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
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RobotsAnalysis
                robotsTxt={data.robotsTxt}
                analysisResults={data.analysisResults}
              />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
