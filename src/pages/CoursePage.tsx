import React from "react";
import CourseTitle from "../components/CourseTitleComponent";
import { FaCode, FaLaptopCode, FaProjectDiagram, FaDatabase, FaChartBar, 
         FaGlobe, FaShieldAlt, FaBook, FaTasks, FaBrain, FaChartLine } from 'react-icons/fa';
import { IoHardwareChip } from "react-icons/io5";
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
  },
  fr: {
    pageTitle: "Cours Disponibles",
  },
  uk: {
    pageTitle: "Доступні Курси",
  }
};

interface CoursePageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

const courses = [
  {
    id: 1,
    title: "Programming Basics",
    icon: <FaCode />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 2,
    title: "Advanced Programming",
    icon: <FaLaptopCode />,
    instructor: "Tatiana Harrison"
  },

  {
    id: 3,
    title: "Data Structures and Algorithms",
    icon: <IoHardwareChip />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 4,
    title: "Full-Stack Software Development",
    icon: <FaProjectDiagram />,
    instructor: "Tatiana Harrison"
  },

  {
    id: 5,
    title: "Database Management",
    icon: <FaDatabase />,
    instructor: "Tatiana Harrison"

  },
  {
    id: 6,
    title: "Data Science",
    icon: <FaChartBar />,
    instructor: "Tatiana Harrison"

  },
  {
    id: 7,
    title: "Web Development",
    icon: <FaGlobe />,
    instructor: "Tatiana Harrison"

  },
  {
    id: 8,
    title: "Cybersecurity",
    icon: <FaShieldAlt />,
    instructor: "Tatiana Harrison"

  },
  {
    id: 9,
    title: "Technical Writing",
    icon: <FaBook />,
    instructor: "Tatiana Harrison"

  },
  {
    id: 10,
    title: "Project Management",
    icon: <FaTasks />,
    instructor: "Tatiana Harrison"

  },
  {
    id: 11,
    title: "Machine Learning",
    icon: <FaBrain />,
    instructor: "Tatiana Harrison"

  },
  {

    id: 12,
    title: "Data Visualization",
    icon: <FaChartLine />,
    instructor: "Tatiana Harrison"

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
