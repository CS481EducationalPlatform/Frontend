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
      className={`lesson-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(lesson)}
    >
      <h3>{lesson.title}</h3>
    </div>
  );
};

export default Lesson;