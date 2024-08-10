"use client";
import { useEffect, useState } from "react";

export default function TopSongs() {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await fetch("/api/v1/uk-singles");
        const data = await response.json();
        if (data.topSongs) {
          setTopSongs(data.topSongs);
        }
      } catch (error) {
        console.error("Failed to fetch top songs:", error);
      }
    };

    fetchTopSongs();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        OFFICIAL TOP {topSongs.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/12 py-2 px-4">#</th>
              <th className="w-7/12 py-2 px-4">Title</th>
              <th className="w-4/12 py-2 px-4">Artist</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {topSongs.map((song: any, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{song.position}</td>
                <td className="border px-4 py-2">{song.title}</td>
                <td className="border px-4 py-2">{song.artist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
