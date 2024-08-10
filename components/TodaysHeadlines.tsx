"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  headline: string;
  bodytext: string;
};

export default function TodaysHeadlines() {
  const [entertainmentHeadlines, setEntertainmentHeadlines] = useState<
    NewsItem[]
  >([]);
  const [weirdNews, setWeirdNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchEntertainmentHeadlines = async () => {
      try {
        const response = await fetch("/api/v1/entertainment");
        const data = await response.json();
        if (data.headlines) {
          setEntertainmentHeadlines(data.headlines);
        }
      } catch (error) {
        console.error("Failed to fetch entertainment headlines:", error);
      }
    };

    const fetchWeirdNews = async () => {
      try {
        const response = await fetch("/api/v1/weird-news");
        const data = await response.json();
        if (data.news) {
          setWeirdNews(data.news);
        }
      } catch (error) {
        console.error("Failed to fetch weird news:", error);
      }
    };

    fetchEntertainmentHeadlines();
    fetchWeirdNews();
  }, []);

  return (
    <section
      className="mb-8 text-center scroll-mt-2 max-w-7xl mx-auto px-8"
      id="headline"
    >
      <h2 className="text-3xl font-semibold mb-4">Today's Headlines</h2>
      <ul className="list-disc list-inside text-left inline-block">
        {/* Display entertainment headlines */}
        {entertainmentHeadlines.map((headline, index) => (
          <li className="mb-2" key={`entertainment-${index}`}>
            {headline.headline}: {headline.bodytext.slice(0, 80)}...{" "}
            {/* Displaying a summary */}
          </li>
        ))}

        {/* Display weird news */}
        {weirdNews.map((news, index) => (
          <li className="mb-2" key={`weird-${index}`}>
            {news.headline}: {news.bodytext.slice(0, 80)}...{" "}
            {/* Displaying a summary */}
          </li>
        ))}
      </ul>
    </section>
  );
}
