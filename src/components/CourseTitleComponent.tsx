import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseTitleProps {
  id: number;
  title: string;
  icon: ReactNode;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ id, title, icon }) => {
  const navigate = useNavigate();

  return (
    <button className="course-button" onClick={() => navigate(`/course/${id}`)}>
      <div className="course-content">
        <div className="course-icon">{icon}</div>
        <span className="course-title-text">{title}</span>
      </div>
    </button>
  );
};

export default CourseTitle;
