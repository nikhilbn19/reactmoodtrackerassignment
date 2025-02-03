import React, { useState, useEffect } from "react";
import MoodEntry from "./Components/Moodentry.jsx";
import MoodAnalytics from "./Components/Moodanalytics.jsx";
import Tabs from "./Components/Tabs.jsx";

const App = () => {
  const [moods, setMoods] = useState([]);
  const [currentTab, setCurrentTab] = useState("Mood List");
  const [undoStack, setUndoStack] = useState([]);

  useEffect(() => {
    const savedMoods = localStorage.getItem("moods");
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods));
    }
  }, []);

  useEffect(() => {
    if (moods.length > 0) {
      localStorage.setItem("moods", JSON.stringify(moods));
    }
  }, [moods]);

  const addMood = (emoji, text) => {
    if (!emoji || !text.trim()) return;
    const newMood = {
      date: new Date().toLocaleString(),
      emoji,
      text,
    };
    setMoods([...moods, newMood]);
  };

  const deleteMood = (index) => {
    const updatedMoods = [...moods];
    const deletedMood = updatedMoods.splice(index, 1);
    setMoods(updatedMoods);
    setUndoStack([deletedMood[0], ...undoStack]);
  };

  const undoDelete = () => {
    if (undoStack.length > 0) {
      const restoredMood = undoStack[0];
      setMoods([restoredMood, ...moods]);
      setUndoStack(undoStack.slice(1));
    }
  };

  const clearMoods = () => {
    setMoods([]);
    setUndoStack([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-center text-3xl font-bold text-blue-600 py-4">
          Mood Tracker
        </h1>

        <Tabs
          activeTab={currentTab}
          onTabChange={setCurrentTab}
          tabs={["Mood List", "Mood Analytics"]}
        />

        {currentTab === "Mood List" && (
          <div className="mt-6">
            {/* Updated Spacing */}
            <div className="flex flex-wrap gap-4 justify-center items-center p-4">
              <MoodEntry addMood={addMood} />
            </div>

            <p className="text-2xl font-medium text-gray-800 text-center mt-6">
              Your History
            </p>

            <ul className="mt-4 space-y-4">
              {moods.map((mood, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">{mood.date}</span>
                    <span className="text-lg">{mood.emoji} {mood.text}</span>
                  </div>
                  <button
                    onClick={() => deleteMood(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={clearMoods}
                className="bg-gray-500 text-white px-5 py-2 rounded-md transition hover:bg-gray-700"
              >
                Clear All
              </button>
              <button
                onClick={undoDelete}
                className="bg-green-500 text-white px-5 py-2 rounded-md transition hover:bg-green-700"
              >
                Undo
              </button>
            </div>
          </div>
        )}

        {currentTab === "Mood Analytics" && <MoodAnalytics moods={moods} />}
      </div>
    </div>
  );
};

export default App;
