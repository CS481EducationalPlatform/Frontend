import React from "react";
import { Link } from "react-router-dom";

interface Document {
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'docx' | 'txt';
}

interface Lesson {
  id: string;
  title: string;
  videoUrls: string[];
  documents: Document[];
}

interface CourseProps {
  title: string;
  description: string;
  lessons: Lesson[];
}

const Course: React.FC<CourseProps> = ({ title, description, lessons }) => {
  return (
    <div className="p-4 border rounded-lg mb-4">
      <h2 className="text-xl font-semibold cursor-pointer">
        {title}
      </h2>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2 p-2 border rounded bg-gray-50">
        <h3 className="font-medium">Lessons:</h3>
        <ul>
          {lessons.map((lesson: Lesson) => (
            <li
              key={lesson.id}
              className="cursor-pointer text-blue-500 underline"
            >
              <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Course;