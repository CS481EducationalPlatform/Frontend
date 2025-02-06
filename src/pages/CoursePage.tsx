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
    instructor: "TBD"
  },
  {
    id: 6,
    title: "Data Science",
    icon: <FaChartBar />,
    instructor: "TBD"
  },
  {
    id: 7,
    title: "Web Development",
    icon: <FaGlobe />,
    instructor: "TBD"
  },
  {
    id: 8,
    title: "Cybersecurity",
    icon: <FaShieldAlt />,
    instructor: "TBD"
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
    instructor: "Alice Williams"
  },
  {
    id: 12,
    title: "Data Visualization",
    icon: <FaChartLine />,
    instructor: "Alice Williams"
  },
  {
    id: 13,
    title: "Mobile App Development",
    icon: <FaCode />,
    instructor: "Alice Williams"
  },
  {
    id: 14,
    title: "Cloud Computing",
    icon: <FaGlobe />,
    instructor: "TBD"
  },
  {
    id: 15,
    title: "DevOps Practices",
    icon: <FaProjectDiagram />,
    instructor: "TBD"
  },
  {
    id: 16,
    title: "Software Testing",
    icon: <FaTasks />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 17,
    title: "UI/UX Design",
    icon: <FaLaptopCode />,
    instructor: "Alice Williams"
  },
  {
    id: 18,
    title: "Network Security",
    icon: <FaShieldAlt />,
    instructor: "TBD"
  },
  {
    id: 19,
    title: "Big Data Analytics",
    icon: <FaDatabase />,
    instructor: "Alice Williams"
  },
  {
    id: 20,
    title: "Blockchain Development",
    icon: <FaProjectDiagram />,
    instructor: "TBD"
  },
  {
    id: 21,
    title: "Natural Language Processing",
    icon: <FaBrain />,
    instructor: "Alice Williams"
  },
  {
    id: 22,
    title: "Computer Vision",
    icon: <FaBrain />,
    instructor: "Alice Williams"
  },
  {
    id: 23,
    title: "IoT Development",
    icon: <IoHardwareChip />,
    instructor: "TBD"
  },
  {
    id: 24,
    title: "API Development",
    icon: <FaCode />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 25,
    title: "System Architecture",
    icon: <FaProjectDiagram />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 26,
    title: "Microservices",
    icon: <FaProjectDiagram />,
    instructor: "TBD"
  },
  {
    id: 27,
    title: "Software Design Patterns",
    icon: <FaLaptopCode />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 28,
    title: "Data Engineering",
    icon: <FaDatabase />,
    instructor: "Alice Williams"
  },
  {
    id: 29,
    title: "Deep Learning",
    icon: <FaBrain />,
    instructor: "Alice Williams"
  },
  {
    id: 30,
    title: "Quantum Computing",
    icon: <IoHardwareChip />,
    instructor: "TBD"
  },
  {
    id: 31,
    title: "Agile Methodologies",
    icon: <FaTasks />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 32,
    title: "Cloud Security",
    icon: <FaShieldAlt />,
    instructor: "TBD"
  },
  {
    id: 33,
    title: "Data Privacy",
    icon: <FaShieldAlt />,
    instructor: "TBD"
  },
  {
    id: 34,
    title: "Software Documentation",
    icon: <FaBook />,
    instructor: "Tatiana Harrison"
  },
  {
    id: 35,
    title: "Business Intelligence",
    icon: <FaChartLine />,
    instructor: "Alice Williams"
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
