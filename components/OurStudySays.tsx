import { useEffect, useState } from "react";

interface StudyContent {
  question: string;
  options: string[];
}

export default function OurStudySays() {
  const [studyContent, setStudyContent] = useState<StudyContent | null>(null);

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await fetch("/api/v1/getOurStudySays");
        const data = await response.json();
        console.log(data);

        if (data.studySaysData && data.studySaysData.length > 0) {
          const content = data.studySaysData[0].content;

          // Split the content at the first occurrence of the question mark
          const [questionPart, optionsPart] = content.split("?");

          // The question is everything up to and including the first question mark
          const question = questionPart.trim() + "?";

          // The options are everything after the first question mark
          const options = optionsPart
            .trim()
            .split("\n")
            .filter((option: string) => option.trim()) // Filter out any empty strings
            .map((option: string) => option.trim());

          setStudyContent({
            question,
            options,
          });
        }
      } catch (error) {
        console.error("Failed to fetch study content:", error);
      }
    };

    fetchStudyData();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Our Study Says</h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full text-left">
        {studyContent && (
          <>
            <p className="text-lg text-gray-700 leading-relaxed">
              {studyContent.question}
            </p>
            <ul className=" list-inside text-lg text-gray-700 leading-relaxed mt-4">
              {studyContent.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
