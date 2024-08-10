"use client";

import { useEffect, useState } from "react";

interface WeeklyBoxOfficeItem {
  position: number;
  title: string;
  weekendGross: string;
  totalGross: string;
  weeksReleased: number;
}

export default function WeeklyBoxOffice() {
  const [weeklyBoxOffice, setWeeklyBoxOffice] = useState<WeeklyBoxOfficeItem[]>(
    []
  );

  useEffect(() => {
    const fetchWeeklyBoxOffice = async () => {
      try {
        const response = await fetch("/api/v1/box-office");
        const data = await response.json();
        if (data.weeklyBoxOfficeData) {
          setWeeklyBoxOffice(data.weeklyBoxOfficeData);
        }
      } catch (error) {
        console.error("Failed to fetch weekly box office data:", error);
      }
    };

    fetchWeeklyBoxOffice();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Weekly Box Office (Top {weeklyBoxOffice.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/12 py-2 px-4">#</th>
              <th className="w-3/12 py-2 px-4">Title</th>
              <th className="w-3/12 py-2 px-4">Weekend Gross</th>
              <th className="w-3/12 py-2 px-4">Total Gross</th>
              <th className="w-2/12 py-2 px-4">Weeks Released</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {weeklyBoxOffice.map((item, index) => (
              <tr key={index}>
                <td className="border px-3 py-2">{item.position}</td>
                <td className="border px-3 py-2">{item.title}</td>
                <td className="border px-3 py-2">{item.weekendGross}</td>
                <td className="border px-3 py-2">{item.totalGross}</td>
                <td className="border px-3 py-2">{item.weeksReleased}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
