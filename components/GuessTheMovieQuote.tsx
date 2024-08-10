import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa"; // Importing the quote icon

export default function GuessTheMovieQuote() {
  const [quote, setQuote] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("/api/v1/guessTheMovieQuote");
        const data = await response.json();

        if (data.guessTheMovieQuote && data.guessTheMovieQuote.length > 0) {
          setQuote(data.guessTheMovieQuote[0].content);
        }
      } catch (error) {
        console.error("Failed to fetch 'Guess the Movie Quote':", error);
      }
    };

    fetchQuote();
  }, []);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Guess the Movie Quote</h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <div className="flex items-start">
          <FaQuoteLeft className="text-2xl text-gray-500 mr-2" />{" "}
          {/* Quote icon */}
          <div className="text-left">
            <p
              className="text-lg text-gray-700 leading-relaxed cursor-pointer  transition-colors duration-300 ease-in-out"
              onClick={toggleAnswer}
            >
              {showAnswer
                ? quote.split("(Answer:")[0].trim()
                : quote.split("(Answer:")[0].trim()}
            </p>
            <p className="mt-2 text-sm text-gray-500 italic">
              (Click on the quote to reveal the answer)
            </p>
            {showAnswer && (
              <p className="mt-4 text-lg text-black font-semibold">
                Answer: {quote.split("(Answer:")[1].replace(")", "").trim()}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
