import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTitleComponent = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <button
      className="course-button"
      onClick={() => navigate(`/course/${id}`)}
    >
      {title}
    </button>
  );
};

export default CourseTitleComponent;
