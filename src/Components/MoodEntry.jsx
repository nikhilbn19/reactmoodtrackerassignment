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
    <div className="mood-entry">
      <select
        className="emoji-select"
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
        className="mood-text"
        placeholder="What's on your mind?"
        value={moodText}
        onChange={handleTextChange}
      />
      <button onClick={handleAddMood} className="add-mood-btn">
        Add Mood
      </button>
    </div>
  );
};

export default MoodEntry;
