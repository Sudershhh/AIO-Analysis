import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { normalizeURL } from "@/utils/url";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  const normalizedUrl = normalizeURL(url);

  console.log("Normalized URL:", normalizedUrl);

  try {
    // Check cache first
    const cachedResult = await redis.get(`robots:${normalizedUrl}`);
    console.log("Cached Result:", cachedResult);
    if (cachedResult) {
      return NextResponse.json(cachedResult as string);
    }

    const response = await fetch(normalizedUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Response:", response);
    const robotsTxt = await response.text();
    const analysisResults = analyzeRobotsTxt(robotsTxt);

    console.log("Analysis Results:", analysisResults);

    const result = { robotsTxt, analysisResults };

    // Cache the result
    await redis.set(`robots:${normalizedUrl}`, JSON.stringify(result), {
      ex: 86400,
    }); // Cache for 24 hours

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
    return NextResponse.json(
      { error: "Failed to fetch or analyze robots.txt" },
      { status: 500 }
    );
  }
}

function analyzeRobotsTxt(robotsTxt: string) {
  const lines = robotsTxt.split("\n");
  const directives: { allow: string[]; disallow: string[] } = {
    allow: [],
    disallow: [],
  };

  lines.forEach((line) => {
    if (line.startsWith("#") || line.trim() === "") return;
    const [directive, path] = line.split(":").map((s) => s.trim());
    if (directive && path) {
      if (directive.toLowerCase() === "allow") {
        directives.allow.push(path);
      } else if (directive.toLowerCase() === "disallow") {
        directives.disallow.push(path);
      }
    }
  });

  const recommendations = generateBasicRecommendations(directives);
  return { directives, recommendations };
}

function generateBasicRecommendations(directives: {
  allow: string[];
  disallow: string[];
}) {
  const recommendations = [];

  if (directives.allow.length === 0) {
    recommendations.push(
      'Consider adding specific "Allow" directives for important pages or sections.'
    );
  }

  if (directives.disallow.includes("/")) {
    recommendations.push(
      'Disallowing the root path ("/") may prevent indexing of your entire site. Review this directive carefully.'
    );
  }

  if (directives.allow.length + directives.disallow.length > 20) {
    recommendations.push(
      "Your robots.txt file has many directives. Consider simplifying it for better clarity and performance."
    );
  }

  return recommendations;
}
