"use client";
import { useEffect, useState } from "react";

export default function WouldYouRather() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const fetchWouldYouRather = async () => {
      try {
        const response = await fetch("/api/v1/getWouldYouRather");
        const data = await response.json();
        console.log(data);

        if (data.would_you_rather[0].content) {
          setQuestion(data.would_you_rather[0].content);
        }
      } catch (error) {
        console.error("Failed to fetch 'Would You Rather' question:", error);
      }
    };

    fetchWouldYouRather();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Would You Rather?</h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <p className="text-lg text-gray-700 text-left leading-relaxed  transition-colors duration-300 ease-in-out">
          {question}
        </p>
      </div>
    </section>
  );
}
