"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Download,
  Copy,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useToast } from "@/hooks/use-toast";

interface RobotsAnalysisProps {
  robotsTxt: string;
  analysisResults: {
    directives: { allow: string[]; disallow: string[] };
    recommendations: string[];
  };
  url: string;
}

export default function RobotsAnalysis({
  robotsTxt,
  analysisResults,
  url,
}: RobotsAnalysisProps) {
  const { toast } = useToast();
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
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const fetchStoredRecommendations = async () => {
    try {
      const response = await fetch(`/api/recommendations?url=${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.recommendations && data.improvedRobotsTxt) {
        setGptRecommendations(data.recommendations);
        setImprovedRobotsTxt(data.improvedRobotsTxt);
      }
    } catch (error) {
      console.error("Error fetching stored recommendations:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to fetch recommendations. Please try again.",
      });
    }
  };
  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ robotsTxt, analysisResults, url }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGptRecommendations(data.recommendations);
      setImprovedRobotsTxt(data.improvedRobotsTxt);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to generate recommendations. Please try again.",
      });
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
      toast({
        title: "Copied to clipboard",
        description:
          "The improved robots.txt content has been copied to your clipboard.",
      });
    });
  };

  const filteredAllowDirectives = analysisResults.directives.allow.filter(
    (directive) => directive.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDisallowDirectives = analysisResults.directives.disallow.filter(
    (directive) => directive.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(
    Math.max(
      filteredAllowDirectives.length,
      filteredDisallowDirectives.length
    ) / itemsPerPage
  );

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <CardHeader className="bg-gray-900 text-white">
        <CardTitle className="text-2xl font-bold">
          Robots.txt Analysis
        </CardTitle>
        <CardDescription className="text-gray-300">
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
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <div className="mb-4 relative">
              <Input
                type="text"
                placeholder="Search directives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-300"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-bold text-gray-700">
                      Allow
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
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
                        <TableCell className="border-r border-gray-200">
                          {filteredAllowDirectives[dataIndex] || "-"}
                        </TableCell>
                        <TableCell>
                          {filteredDisallowDirectives[dataIndex] || "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center bg-gray-200 text-gray-800 hover:bg-gray-300"
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
                    onClick={fetchStoredRecommendations}
                    disabled={loading}
                    className="bg-gray-700 text-white hover:bg-gray-600 mr-4"
                  >
                    Fetch Stored Recommendations
                  </Button>
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
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {gptRecommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                  {improvedRobotsTxt && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Improved robots.txt:
                        </h3>
                        <div className="flex space-x-2">
                          <Button
                            onClick={downloadTxtFile}
                            className="flex items-center bg-gray-700 text-white hover:bg-gray-600"
                          >
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                          <Button
                            onClick={copyToClipboard}
                            className="flex items-center bg-gray-700 text-white hover:bg-gray-600"
                          >
                            <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                          </Button>
                        </div>
                      </div>
                      <pre className="bg-white p-4 rounded-md overflow-x-auto text-sm text-gray-800 border border-gray-200">
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
