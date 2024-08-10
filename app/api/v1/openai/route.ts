// src/app/api/openai/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Handler for POST requests
async function handlePostRequest(req: NextRequest) {
  const { prompt } = await req.json();
  console.log(prompt);

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const choices = response.choices?.[0];
    const content = choices?.message?.content?.trim();
    const resultList =
      content
        ?.split("\n")
        .filter(Boolean)
        .map((line) => line.replace(/^\d+\.\s*/, "").trim()) ?? [];

    return NextResponse.json(resultList, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from OpenAI" },
      { status: 500 }
    );
  }
}

// Handler for GET requests (if needed)
async function handleGetRequest() {
  // Implement your GET request handling logic here
  return NextResponse.json(
    { message: "GET request received" },
    { status: 200 }
  );
}

// Main function to handle incoming requests
export async function GET(req: NextRequest) {
  return handleGetRequest();
}

export async function POST(req: NextRequest) {
  return handlePostRequest(req);
}
