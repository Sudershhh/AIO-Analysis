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
import {
  Loader2,
  Download,
  Copy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([improvedRobotsTxt || ""], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "improved_robots.txt";
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improvedRobotsTxt || "").then(() => {
      // You can add a toast notification here
      console.log("Copied to clipboard");
    });
  };

  const totalPages = Math.ceil(
    Math.max(
      analysisResults.directives.allow.length,
      analysisResults.directives.disallow.length
    ) / itemsPerPage
  );

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Robots.txt Analysis
        </CardTitle>
        <CardDescription className="text-gray-600">
          Review your robots.txt content and get AI-powered recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
            <TabsTrigger
              value="content"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-1/2 font-bold text-gray-900">
                    Allow
                  </TableHead>
                  <TableHead className="w-1/2 font-bold text-gray-900">
                    Disallow
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: itemsPerPage }).map((_, index) => {
                  const dataIndex = (currentPage - 1) * itemsPerPage + index;
                  return (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <TableCell>
                        {analysisResults.directives.allow[dataIndex] || "-"}
                      </TableCell>
                      <TableCell>
                        {analysisResults.directives.disallow[dataIndex] || "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
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
                    className="bg-gray-900 text-white hover:bg-gray-800"
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
                  <h3 className="text-xl font-semibold text-gray-900">
                    AI-Generated Recommendations:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {gptRecommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                  {improvedRobotsTxt && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Improved robots.txt:
                      </h3>
                      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
                        {improvedRobotsTxt}
                      </pre>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={downloadTxtFile}
                          className="flex items-center bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                        <Button
                          onClick={copyToClipboard}
                          className="flex items-center bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                          <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                        </Button>
                      </div>
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
