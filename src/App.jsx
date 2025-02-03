import React, { useState, useEffect } from "react";
import MoodEntry from "./Components/Moodentry.jsx";
import MoodAnalytics from "./Components/Moodanalytics.jsx"
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
    <div className="app-container">
      <h1 className="text-center text-3xl font-bold py-4">Mood Tracker</h1>
      <Tabs
        activeTab={currentTab}
        onTabChange={setCurrentTab}
        tabs={["Mood List", "Mood Analytics"]}
      />
      {currentTab === "Mood List" && (
        <div className="mood-list">
          <MoodEntry addMood={addMood} />
          <ul>
          <p className="text-3xl font-medium text-gray-800"> Your History</p>
            {moods.map((mood, index) => (
              <li key={index} className="mood-item">
                <div>
                  <span>{mood.date}</span>
                  <span>{mood.emoji}</span>
                  <span>{mood.text}</span>
                </div>
                <button
                  onClick={() => deleteMood(index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={clearMoods} className="clear-btn">
              Clear All
            </button>
            <button onClick={undoDelete} className="undo-btn">
              Undo
            </button>
          </div>
        </div>
      )}
      {currentTab === "Mood Analytics" && (
        <MoodAnalytics moods={moods} />
      )}
    </div>
  );
};

export default App;
