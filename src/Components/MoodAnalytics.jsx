import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodAnalytics = ({ moods }) => {
  const moodCount = moods.reduce((acc, mood) => {
    acc[mood.emoji] = (acc[mood.emoji] || 0) + 1;
    return acc;
  }, {});

  const totalMoods = moods.length;

  const moodPercentages = Object.keys(moodCount).map((emoji) => ({
    emoji,
    count: moodCount[emoji],
    percentage: ((moodCount[emoji] / totalMoods) * 100).toFixed(2),
  }));

  const data = {
    labels: Object.keys(moodCount),
    datasets: [
      {
        data: Object.values(moodCount),
        backgroundColor: ["#ff5733", "#33ff57", "#3357ff"],
      },
    ],
  };

  return (
    <div className="mt-5 text-center bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Mood Analytics</h2>
      <div className="w-full h-80 mx-auto mt-4">
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="mt-5">
        <p className="text-3xl font-medium text-gray-800">Summary</p>
        <p className="text-lg font-medium">Total Moods: {totalMoods}</p>
        <p className="text-md font-semibold mt-2">Mood Distribution:</p>
        <div className="mt-3">
          {moodPercentages.map(({ emoji, count, percentage }) => (
            <div key={emoji} className="mb-2">
              <span className="font-bold">{emoji}</span>: {count} moods ({percentage}%)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodAnalytics;
