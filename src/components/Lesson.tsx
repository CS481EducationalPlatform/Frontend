import React from "react";

const Lesson = ({ lesson, isActive, onSelect }) => {
  return (
    <button
      className={`lesson-button ${
        isActive ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-100"
      }`}
      onClick={() => onSelect(lesson)}
    >
      {lesson.title}
    </button>
  );
};

export default Lesson;