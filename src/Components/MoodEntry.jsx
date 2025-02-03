import React, { useState } from "react";

const MoodEntry = ({ addMood }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [moodText, setMoodText] = useState("");

  const handleMoodChange = (e) => {
    setSelectedEmoji(e.target.value);
  };

  const handleTextChange = (e) => {
    setMoodText(e.target.value);
  };

  const handleAddMood = () => {
    if (selectedEmoji && moodText) {
      addMood(selectedEmoji, moodText);
      setMoodText("");
      setSelectedEmoji("");
    }
  };

  return (
    <div className="mb-5 p-4 bg-white rounded-lg shadow-md">
      <select
        className="p-3 border rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedEmoji}
        onChange={handleMoodChange}
      >
        <option value="">Select Mood</option>
        <option value="😊">😊 Happy</option>
        <option value="😢">😢 Sad</option>
        <option value="😒">😒 Meh</option>
      </select>
      <input
        type="text"
        className="p-3 ml-3 border rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What's on your mind?"
        value={moodText}
        onChange={handleTextChange}
      />
      <button
        onClick={handleAddMood}
        className="ml-3 px-5 py-3 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-700"
      >
        Add Mood
      </button>
    </div>
  );
};

export default MoodEntry;
