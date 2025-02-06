import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseTitleProps {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  instructor: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ id, title, description, icon, instructor }) => {
  const navigate = useNavigate();

  return (
    <button
      className="course-button"
      onClick={() => navigate(`/course/${id}`)}
    >
      <div className="course-icon">{icon}</div>
      <div className="course-title-text">
        <strong>{title}</strong>
        <p className="course-instructor">Instructor: {instructor}</p>
        <p className="course-description">{description}</p>
      </div>
    </button>

  );
};

export default CourseTitle;
