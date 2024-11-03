import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { robotsTxt, analysisResults } = await request.json();

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

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using the free tier model
      messages: [{ role: "user", content: prompt }],
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
