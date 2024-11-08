export interface RobotsState {
  url: string;
  robotsTxt: string;
  analysisResults: {
    directives: { allow: string[]; disallow: string[] };
    recommendations: string[];
  } | null;
  gptRecommendations: string[] | null;
  improvedRobotsTxt: string | null;
  loading: boolean;
  recommendationsLoading: boolean;
  history: any[];
  setUrl: (url: string) => void;
  setRobotsTxt: (robotsTxt: string) => void;
  setAnalysisResults: (analysisResults: RobotsState["analysisResults"]) => void;
  setGptRecommendations: (recommendations: string[] | null) => void;
  setImprovedRobotsTxt: (improvedRobotsTxt: string | null) => void;
  setLoading: (loading: boolean) => void;
  setRecommendationsLoading: (recommendationsLoading: boolean) => void;
  setHistory: (history: any[]) => void;
  fetchRobotsTxt: (url: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
  saveToHistory: (url: string, data: any) => Promise<void>;
  generateRecommendations: (
    robotsTxt: string,
    analysisResults: RobotsState["analysisResults"],
    url: string
  ) => Promise<void>;
}
