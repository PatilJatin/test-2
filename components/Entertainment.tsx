"use client";

import { useEffect, useState } from "react";

type EntertainmentHeadline = {
  headline: string;
  bodytext: string;
  date: string;
};

export default function EntertainmentHeadlines() {
  const [headlines, setHeadlines] = useState<EntertainmentHeadline[]>([]);
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

    const fetchHeadlines = async () => {
      try {
        const response = await fetch("/api/v1/entertainment");
        const data = await response.json();
        if (data.headlines) {
          setHeadlines(data.headlines);
        }
      } catch (error) {
        console.error("Failed to fetch entertainment headlines:", error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <section className="mb-12 text-center">
      <h2 className="text-4xl font-bold mb-2">Entertainment Headlines</h2>
      <p className="text-gray-500 text-md mb-6">{todayDate}</p>

      <div className="space-y-8">
        {headlines.map((headline, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full text-left transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {headline.headline}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {headline.bodytext}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Published on: {new Date(headline.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
