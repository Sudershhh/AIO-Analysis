"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface RobotsAnalysisProps {
  robotsTxt: string;
  analysisResults: {
    directives: { allow: string[]; disallow: string[] };
    recommendations: string[];
  };
}

export default function RobotsAnalysis({
  robotsTxt,
  analysisResults,
}: RobotsAnalysisProps) {
  const [activeTab, setActiveTab] = useState("content");
  const [gptRecommendations, setGptRecommendations] = useState<string[] | null>(
    null
  );
  const [improvedRobotsTxt, setImprovedRobotsTxt] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ robotsTxt, analysisResults }),
      });
      if (!response.ok) throw new Error("Failed to generate recommendations");
      const data = await response.json();
      setGptRecommendations(data.recommendations);
      setImprovedRobotsTxt(data.improvedRobotsTxt);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(gptRecommendations);
  console.log(improvedRobotsTxt);

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold">
          Robots.txt Analysis
        </CardTitle>
        <CardDescription className="text-blue-100">
          Review your robots.txt content and get AI-powered recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-blue-100 p-1">
            <TabsTrigger
              value="content"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Allow</TableHead>
                  <TableHead className="w-1/2">Disallow</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({
                  length: Math.max(
                    analysisResults.directives.allow.length,
                    analysisResults.directives.disallow.length
                  ),
                }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {analysisResults.directives.allow[index] || "-"}
                    </TableCell>
                    <TableCell>
                      {analysisResults.directives.disallow[index] || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="recommendations">
            <AnimatePresence>
              {!gptRecommendations ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    onClick={generateRecommendations}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition hover:scale-105"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : null}
                    Generate AI Recommendations
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-blue-800">
                    AI-Generated Recommendations:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {gptRecommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                  {improvedRobotsTxt && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        Improved robots.txt:
                      </h3>
                      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
                        {improvedRobotsTxt}
                      </pre>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </CardContent>
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}
    </Card>
  );
}
