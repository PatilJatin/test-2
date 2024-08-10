import { useEffect, useState } from "react";

export default function PublicHolidays() {
  const [holidays, setHolidays] = useState([]);
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

    const fetchHolidays = async () => {
      try {
        const response = await fetch("/api/v1/getPublicHolidays");
        const data = await response.json();
        console.log(data);

        if (data.public_holidays && data.public_holidays.length > 0) {
          const holidayContent = data.public_holidays[0].content;
          const holidayList = holidayContent
            .split(/\d+\.\s*/) // Split the content based on the numbering pattern
            .filter(Boolean) // Filter out any empty strings
            .map((holiday: string) => holiday.trim()); // Trim any excess whitespace

          setHolidays(holidayList);
        }
      } catch (error) {
        console.error("Failed to fetch public holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Public Holidays: {nextDate}
      </h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <ul className="list-disc list-inside text-left text-lg text-gray-700 leading-relaxed">
          {holidays.map((item, index) => (
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
