import { create } from "zustand";
import { toast } from "@/hooks/use-toast";
import { RobotsState } from "@/interfaces/robotsState";
import { normalizeURL } from "@/utils/url";

export const useRobotsStore = create<RobotsState>((set, get) => ({
  url: "",
  robotsTxt: "",
  analysisResults: null,
  gptRecommendations: null,
  improvedRobotsTxt: null,
  loading: false,
  recommendationsLoading: false,
  history: [],
  setUrl: (url) => set({ url }),
  setRobotsTxt: (robotsTxt) => set({ robotsTxt }),
  setAnalysisResults: (analysisResults) => set({ analysisResults }),
  setGptRecommendations: (recommendations) =>
    set({ gptRecommendations: recommendations }),
  setImprovedRobotsTxt: (improvedRobotsTxt) => set({ improvedRobotsTxt }),
  setLoading: (loading) => set({ loading }),
  setRecommendationsLoading: (recommendationsLoading) =>
    set({ recommendationsLoading }),
  setHistory: (history) => set({ history }),

  fetchRobotsTxt: async (url) => {
    const {
      setLoading,
      setUrl,
      setRobotsTxt,
      setAnalysisResults,
      saveToHistory,
      fetchHistory,
    } = get();
    setLoading(true);
    try {
      const normalizedUrl = normalizeURL(url.trim());

      const response = await fetch(
        `/api/fetch-robots?url=${encodeURIComponent(normalizedUrl)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch robots.txt");
      }

      const result = await response.json();
      setRobotsTxt(result.robotsTxt);
      setAnalysisResults(result.analysisResults);
      setUrl(normalizedUrl);
      await saveToHistory(normalizedUrl, result);
      await fetchHistory();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to fetch robots.txt",
      });
    } finally {
      setLoading(false);
    }
  },
  fetchHistory: async () => {
    try {
      const response = await fetch("/api/history");
      if (response.ok) {
        const historyData = await response.json();
        set({ history: historyData });
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to fetch history.",
      });
    }
  },
  saveToHistory: async (url, data) => {
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, data }),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to save to history.",
      });
      console.error("Failed to save to history:", error);
    }
  },

  generateRecommendations: async (robotsTxt, analysisResults, url) => {
    const {
      setRecommendationsLoading,
      setGptRecommendations,
      setImprovedRobotsTxt,
    } = get();
    setRecommendationsLoading(true);
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
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to generate recommendations. Please try again.",
      });
    } finally {
      setRecommendationsLoading(false);
    }
  },
}));
