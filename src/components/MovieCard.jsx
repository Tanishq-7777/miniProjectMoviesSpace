import React from "react";

export default function MovieCard({ movie }) {
  const { Title, Year, Poster } = movie;

  return (
    <div>
      <div className="h-96 w-full overflow-hidden">
        <img src={Poster} alt={Title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h2>{Title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {Year} •
        </p>
      </div>

      {/* Action Button */}
      <div className="p-4 flex justify-end">
        <button className="bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition-colors text-sm">
          Watch Now
        </button>
      </div>
    </div>
  );
}
