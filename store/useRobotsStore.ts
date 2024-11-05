import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

interface RobotsState {
  url: string;
  robotsTxt: string;
  analysisResults: {
    directives: { allow: string[]; disallow: string[] };
    recommendations: string[];
  } | null;
  gptRecommendations: string[] | null;
  improvedRobotsTxt: string | null;
  loading: boolean;
  history: any[];
  // selectedHistory: string | null;
  setUrl: (url: string) => void;
  setRobotsTxt: (robotsTxt: string) => void;
  setAnalysisResults: (analysisResults: RobotsState["analysisResults"]) => void;
  setGptRecommendations: (recommendations: string[] | null) => void;
  setImprovedRobotsTxt: (improvedRobotsTxt: string | null) => void;
  setLoading: (loading: boolean) => void;
  setHistory: (history: any[]) => void;
  fetchRobotsTxt: (url: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
  saveToHistory: (url: string, data: any) => Promise<void>;
  // fetchStoredRecommendations: (url: string) => Promise<void>;
  generateRecommendations: (
    robotsTxt: string,
    analysisResults: RobotsState["analysisResults"],
    url: string
  ) => Promise<void>;
}

export const useRobotsStore = create<RobotsState>((set, get) => ({
  url: "",
  robotsTxt: "",
  analysisResults: null,
  gptRecommendations: null,
  improvedRobotsTxt: null,
  loading: false,
  history: [],
  setUrl: (url) => set({ url }),
  setRobotsTxt: (robotsTxt) => set({ robotsTxt }),
  setAnalysisResults: (analysisResults) => set({ analysisResults }),
  setGptRecommendations: (recommendations) =>
    set({ gptRecommendations: recommendations }),
  setImprovedRobotsTxt: (improvedRobotsTxt) => set({ improvedRobotsTxt }),
  setLoading: (loading) => set({ loading }),
  setHistory: (history) => set({ history }),
  // selectedHistory: null,

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
      let formattedUrl = url.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }
      if (!/^https?:\/\/www\./i.test(formattedUrl)) {
        formattedUrl = formattedUrl.replace(/^https?:\/\//i, "https://www.");
      }
      if (!formattedUrl.endsWith("/robots.txt")) {
        formattedUrl = `${formattedUrl.replace(/\/+$/, "")}/robots.txt`;
      }

      const response = await fetch(
        `/api/fetch-robots?url=${encodeURIComponent(formattedUrl)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch robots.txt");
      }

      const result = await response.json();
      setRobotsTxt(result.robotsTxt);
      setAnalysisResults(result.analysisResults);
      setUrl(formattedUrl);
      await saveToHistory(formattedUrl, result);
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
  // fetchStoredRecommendations: async (url) => {
  //   try {
  //     const response = await fetch(
  //       `/api/recommendations?url=${encodeURIComponent(url)}`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     if (data.recommendations && data.improvedRobotsTxt) {
  //       set({
  //         gptRecommendations: data.recommendations,
  //         improvedRobotsTxt: data.improvedRobotsTxt,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching stored recommendations:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: "Failed to fetch recommendations. Please try again.",
  //     });
  //   }
  // },
  generateRecommendations: async (robotsTxt, analysisResults, url) => {
    const { setLoading, setGptRecommendations, setImprovedRobotsTxt } = get();
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
  },
}));
