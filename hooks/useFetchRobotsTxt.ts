import { useState, useEffect } from "react";

export const useFetchRobotsTxt = (url: string) => {
  const [data, setData] = useState<{ robotsTxt: string; analysis: any } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const fetchRobotsTxt = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/fetch-robots?url=${encodeURIComponent(url)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch robots.txt");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name === "AbortError") return; // Ignore abort errors
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRobotsTxt();

    return () => controller.abort(); // Cleanup on unmount
  }, [url]);

  return { data, error, loading };
};
