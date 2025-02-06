import React from "react";

interface LessonType {
  title: string;
  tags: string[];
  // Add other lesson properties as needed
}

interface LessonProps {
  lesson: LessonType;
  isActive: boolean;
  onSelect: (lesson: LessonType) => void;
}

const Lesson = ({ lesson, isActive, onSelect }: LessonProps) => {
  return (
    <button
      className={`lesson-button ${
        isActive ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-100"
      }`}
      onClick={() => onSelect(lesson)}
    >
      <div className="lesson-content-wrapper">
        <div className="lesson-title">{lesson.title}</div>
        <div className="lesson-tags">
          {lesson.tags.map((tag, index) => (
            <span key={index} className="lesson-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default Lesson;