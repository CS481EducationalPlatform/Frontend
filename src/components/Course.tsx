import React from "react";
import { useNavigate } from "react-router-dom";

const Course = ({ id, title, description, lessons }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h2
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate(`/course/${id}`)}
      >
        {title}
      </h2>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2 p-2 border rounded bg-gray-50">
        <h3 className="font-medium">Lessons:</h3>
        <ul>
          {lessons.map((lesson, index) => (
            <li
              key={index}
              className="cursor-pointer text-blue-500 underline"
              onClick={() => navigate(`/course/${id}/lesson/${lesson.id}`)}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Course;