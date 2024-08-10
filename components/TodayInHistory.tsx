import { useEffect, useState } from "react";

export default function TodayInHistory() {
  const [historyItems, setHistoryItems] = useState([]);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    // Get today's date in the USA time zone (Eastern Time)
    const today = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const date = new Date(today);

    // Format the date as "Month Day" (e.g., "August 10")
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setTodayDate(formattedDate);

    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/v1/getTodayInHistory");
        const data = await response.json();
        if (data.historyData && data.historyData.length > 0) {
          // Split the history content into individual events based on a recognizable pattern
          const historyContent = data.historyData[0].content;
          const historyList = historyContent
            .split(/\s?-\s?(?=\d{1,2}\syears\sago\s\(\d{4}\):)/)
            .filter(Boolean);
          setHistoryItems(historyList);
        }
      } catch (error) {
        console.error("Failed to fetch today in history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Today In History: {todayDate}
      </h2>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mx-auto w-full">
        <ul className="list-disc list-inside text-left text-lg text-gray-700 leading-relaxed">
          {historyItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
