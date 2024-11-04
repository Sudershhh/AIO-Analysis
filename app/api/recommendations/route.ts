import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";
import OpenAI from "openai";

// Redis and OpenAI initialization
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    if (!/^https?:\/\/www\./i.test(url)) {
      url = url.replace(/^https?:\/\//i, "https://www.");
    }
    if (!url.endsWith("/robots.txt")) {
      url = `${url.replace(/\/+$/, "")}/robots.txt`;
    }

    console.log("Fetching recommendations for URL:", url);

    // Fetch from Redis cache
    const cachedRecommendations = await redis.get(
      `recommendations:${userId}:${url}`
    );

    console.log("Cached recommendations:", typeof cachedRecommendations);

    if (cachedRecommendations) {
      try {
        return NextResponse.json(cachedRecommendations as string);
      } catch (parseError) {
        console.error("Error parsing cached recommendations:", parseError);
        return NextResponse.json(
          { error: "Cache parse error" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({
        recommendations: null,
        improvedRobotsTxt: null,
      });
    }
  } catch (error) {
    console.error("Error in GET /api/recommendations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { robotsTxt, analysisResults, url } = await request.json();

    if (!robotsTxt || !analysisResults || !url) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const prompt = `
      As an AI expert in SEO and web crawling, analyze the following robots.txt content and provide recommendations for optimizing it for AI accessibility:

      robots.txt content:
      ${robotsTxt}

      Current analysis:
      Allow directives: ${analysisResults.directives.allow.join(", ")}
      Disallow directives: ${analysisResults.directives.disallow.join(", ")}

      Please provide:
      1. 3-5 specific recommendations for improving the robots.txt file for better AI crawler accessibility.
      2. An improved version of the robots.txt file based on your recommendations.

      Format your response as a JSON object with two keys: "recommendations" (an array of strings) and "improvedRobotsTxt" (a string).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    let response;
    try {
      response = JSON.parse(completion.choices[0].message.content || "{}");
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return NextResponse.json(
        { error: "OpenAI response parse error" },
        { status: 500 }
      );
    }

    // Store recommendations in Redis
    await redis.set(
      `recommendations:${userId}:${url}`,
      JSON.stringify(response),
      { ex: 86400 }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in POST /api/recommendations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
