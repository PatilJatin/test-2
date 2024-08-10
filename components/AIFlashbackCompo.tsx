"use client";

import { useEffect, useState } from "react";

export default function AiFlashback() {
  const [flashbackContent, setFlashbackContent] = useState<string>("");

  useEffect(() => {
    const fetchAiFlashback = async () => {
      try {
        const response = await fetch("/api/v1/getAiFlashback");
        const data = await response.json();
        if (data.aiFlashbackData && data.aiFlashbackData.length > 0) {
          setFlashbackContent(data.aiFlashbackData[0].content);
        }
      } catch (error) {
        console.error("Failed to fetch AI flashback data:", error);
      }
    };

    fetchAiFlashback();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">AI Flashback</h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <p className="text-lg text-gray-700 text-left leading-relaxed">
          {flashbackContent}
        </p>
      </div>
    </section>
  );
}
