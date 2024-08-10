import axios from "axios";
import cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://www.tiktok.com/trending";
    const response = await axios.get(url);

    const html = response.data;
    const $ = cheerio.load(html);

    const videos: { url: string }[] = [];

    $("a.video-link").each((index, element) => {
      const url = $(element).attr("href");
      if (url) {
        videos.push({ url });
      }
    });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching TikTok trending videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch TikTok trending videos" },
      { status: 500 }
    );
  }
}
