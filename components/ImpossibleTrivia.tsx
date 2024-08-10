"use client";
import { useEffect, useState } from "react";

export default function ImpossibleTrivia() {
  const [triviaItems, setTriviaItems] = useState([]);

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const response = await fetch("/api/v1/getImpossibleTrivia");
        const data = await response.json();
        if (data.triviaData && data.triviaData.length > 0) {
          // Split the trivia content into individual questions
          const triviaContent = data.triviaData[0].content;
          const triviaList = triviaContent.split(/\d+\.\s+/).filter(Boolean);
          setTriviaItems(triviaList);
        }
      } catch (error) {
        console.error("Failed to fetch impossible trivia:", error);
      }
    };

    fetchTrivia();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Impossible Trivia</h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <ul className="list-disc list-inside text-left text-lg text-gray-700 leading-relaxed">
          {triviaItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
