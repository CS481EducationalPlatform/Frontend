import React from "react";
import CourseTitle from "../components/CourseTitleComponent";
import "../styles/CoursePage.css";

// Add translations for course page
const translations = {
  en: {
    pageTitle: "Available Courses",
  },
  ru: {
    pageTitle: "Доступные Курсы",
  },
  es: {
    pageTitle: "Cursos Disponibles",
  }
};

interface CoursePageProps {
  language: 'en' | 'ru' | 'es';
}

const courses = [
  {
    id: 1,
    title: "Programming Basics",
  },
  {
    id: 2,
    title: "Advanced Programming",
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
  },
  {
    id: 4,
    title: "Full-Stack Software Development",
  },
  {
    id: 5,
    title: "Database Management",
  },
  {
    id: 6,
    title: "Data Science",
  }
];

const CoursePage: React.FC<CoursePageProps> = ({ language }) => {
  return (
    <div className="course-page">
      <h1 className="course-title">{translations[language].pageTitle}</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseTitle key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
