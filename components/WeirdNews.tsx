"use client";

import { useEffect, useState } from "react";

type WeirdNewsItem = {
  headline: string;
  bodytext: string;
  date: string;
};

export default function WeirdNews() {
  const [newsItems, setNewsItems] = useState<WeirdNewsItem[]>([]);
  const [todayDate, setTodayDate] = useState<string>("");
  useEffect(() => {
    const today = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const date = new Date(today);

    // Format the date as "Month Day, Year" (e.g., "August 10, 2024")
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setTodayDate(formattedDate);
    const fetchWeirdNews = async () => {
      try {
        const response = await fetch("/api/v1/weird-news");
        const data = await response.json();
        if (data.news) {
          setNewsItems(data.news);
        }
      } catch (error) {
        console.error("Failed to fetch weird news:", error);
      }
    };

    fetchWeirdNews();
  }, []);

  return (
    <section className="mb-12 text-center">
      <h2 className="text-4xl font-bold mb-2">Weird News</h2>
      <p className="text-gray-500 text-md mb-6">{todayDate}</p>
      <div className="space-y-8">
        {newsItems.map((newsItem, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full text-left transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {newsItem.headline}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {newsItem.bodytext}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Published on: {new Date(newsItem.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
