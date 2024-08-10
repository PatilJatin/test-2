// src/components/TrendingVideos.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";
import Link from "next/link";

interface Video {
  url: string;
}

const TrendingVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const data = await fetchDataFromFirestore("tiktok_trending");
        const formattedVideos = data
          .map((item) => item.content)
          .join("\n")
          .split("\n")
          .map((line) => {
            const url = line.replace(/^\d+\.\s*/, "").trim();
            return { url };
          });
        setVideos(formattedVideos);
      } catch (err) {
        console.error("Error fetching trending videos:", err);
        setError("Failed to fetch trending videos");
      }
    };

    fetchTrendingVideos();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {videos.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {videos.map((video, index) => (
            <li key={index} className="border-b pb-2">
              <Link
                href={video.url}
                className="text-lg font-semibold text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading trending videos...</p>
      )}
    </div>
  );
};

export default TrendingVideos;
