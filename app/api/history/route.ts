import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = (await redis.lrange(`history:${userId}`, 0, -1)) || [];
    // Check if items need to be parsed
    const parsedHistory = history.map((item) => {
      return typeof item === "string" ? JSON.parse(item) : item;
    });
    return NextResponse.json(parsedHistory);
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url, data } = await request.json();
    const historyItem = { url, data, timestamp: new Date().toISOString() };
    await redis.lpush(`history:${userId}`, JSON.stringify(historyItem));
    await redis.ltrim(`history:${userId}`, 0, 19); // Keep only the last 20 items
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save history:", error);
    return NextResponse.json(
      { error: "Failed to save history" },
      { status: 500 }
    );
  }
}
