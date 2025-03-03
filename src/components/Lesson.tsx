import type { FC } from "react";

interface LessonType {
  id: number;
  title: string;
  videoUrl: string;
  documents: string[];
  tags: string[];
}

interface LessonProps {
  lesson: LessonType;
  isActive: boolean;
  onSelect: (lesson: LessonType) => void;
}

const Lesson: FC<LessonProps> = ({ lesson, isActive, onSelect }) => {
  return (
    <div
      className={`lesson-button ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(lesson)}
    >
      <div className="lesson-content-wrapper">
        <h3 className="lesson-title">{lesson.title}</h3>
        {lesson.tags && lesson.tags.length > 0 && (
          <div className="lesson-tags">
            {lesson.tags.map((tag, index) => (
              <span key={index} className="lesson-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;