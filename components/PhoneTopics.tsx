import { useEffect, useState } from "react";

export default function PhoneTopics() {
  const [phoneTopics, setPhoneTopics] = useState([]);
  const [nextDate, setNextDate] = useState("");

  useEffect(() => {
    // Get tomorrow's date in the USA time zone (Eastern Time)
    const today = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const date = new Date(today);
    date.setDate(date.getDate() + 1); // Increment the date by 1 to get tomorrow

    // Format the date as "Month Day" (e.g., "August 11")
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setNextDate(formattedDate);

    const fetchPhoneTopics = async () => {
      try {
        const response = await fetch("/api/v1/getPhoneTopics");
        const data = await response.json();
        console.log(data);

        if (data.triviaData && data.triviaData.length > 0) {
          const phoneTopicsContent = data.triviaData[0].content;
          const phoneTopicsList = phoneTopicsContent
            .split("\n") // Split based on the newline character
            .filter(Boolean) // Filter out any empty strings
            .map((topic: string) => topic.replace(/^\d+\.\s*/, "")); // Remove the leading numbers and spaces

          setPhoneTopics(phoneTopicsList);
        }
      } catch (error) {
        console.error("Failed to fetch phone topics:", error);
      }
    };

    fetchPhoneTopics();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Phone Topics: {nextDate}</h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <ul className="list-disc list-inside text-left text-lg text-gray-700 leading-relaxed">
          {phoneTopics.map((item, index) => (
            <li
              key={index}
              className="hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
