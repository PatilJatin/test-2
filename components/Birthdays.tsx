import { useEffect, useState } from "react";

export default function Birthdays() {
  const [birthdayItems, setBirthdayItems] = useState([]);
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

    const fetchBirthdays = async () => {
      try {
        const response = await fetch("/api/v1/getBirthdays");
        const data = await response.json();
        if (data.birthdayData && data.birthdayData.length > 0) {
          // Split the birthday content into individual entries based on a recognizable pattern
          let birthdayContent = data.birthdayData[0].content;
          let birthdayList = birthdayContent
            .split(/\s?-\s?(?=\b)/)
            .filter(Boolean);

          setBirthdayItems(birthdayList);
        }
      } catch (error) {
        console.error("Failed to fetch birthdays:", error);
      }
    };

    fetchBirthdays();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Famous Birthdays: {nextDate}
      </h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <ul className="list-disc list-inside text-left text-lg text-gray-700 leading-relaxed">
          {birthdayItems.map((item: string, index) => (
            <li
              key={index}
              className="hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
