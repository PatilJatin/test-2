import axios from "axios";
import * as cheerio from "cheerio";
import { log } from "console";

// Example function to scrape TikTok trending videos
export const scrapeTikTok = async () => {
  // Replace with the actual URL you want to scrape
  const url = "https://www.tiktok.com/trending";
  const response = await axios.get(url);
  console.log(response.data);

  const html = response.data;

  const $ = cheerio.load(html);
  const videos: { url: string }[] = [];

  $("a.video-link").each((index, element) => {
    const url = $(element).attr("href");
    if (url) {
      videos.push({ url });
    }
  });

  return videos;
};
