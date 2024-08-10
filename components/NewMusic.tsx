"use client";
import { useEffect, useState } from "react";

export default function NewMusic() {
  const [newMusic, setNewMusic] = useState([]);

  useEffect(() => {
    const fetchNewMusic = async () => {
      try {
        const response = await fetch("/api/v1/new-music");
        const data = await response.json();
        if (data.new_music) {
          setNewMusic(data.new_music);
        }
      } catch (error) {
        console.error("Failed to fetch new music:", error);
      }
    };

    fetchNewMusic();
  }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        NEW MUSIC RELEASES ({newMusic.length})
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
            {newMusic.map((track: any, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{track.position}</td>
                <td className="border px-4 py-2">{track.title}</td>
                <td className="border px-4 py-2">{track.artist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
