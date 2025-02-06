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
    instructor: "Tatiana Harrison",
    description: "Learn fundamental programming concepts and syntax"
  },
  {
    id: 2,
    title: "Advanced Programming",
    icon: <FaLaptopCode />,
    instructor: "Tatiana Harrison",
    description: "Master complex programming concepts and design patterns"
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    icon: <IoHardwareChip />,
    instructor: "Tatiana Harrison",
    description: "Study essential data structures and algorithmic techniques"
  },
  {
    id: 4,
    title: "Full-Stack Software Development", 
    icon: <FaProjectDiagram />,
    instructor: "Tatiana Harrison",
    description: "Build complete web applications from front to back end"
  },
  {
    id: 5,
    title: "Database Management",
    icon: <FaDatabase />,
    instructor: "TBD",
    description: "Learn database design and management principles"
  },
  {
    id: 6,
    title: "Data Science",
    icon: <FaChartBar />,
    instructor: "TBD",
    description: "Analyze and interpret complex data sets"
  },
  {
    id: 7,
    title: "Web Development",
    icon: <FaGlobe />,
    instructor: "TBD",
    description: "Create modern and responsive websites"
  },
  {
    id: 8,
    title: "Cybersecurity",
    icon: <FaShieldAlt />,
    instructor: "TBD",
    description: "Protect systems and networks from cyber threats"
  },
  {
    id: 9,
    title: "Technical Writing",
    icon: <FaBook />,
    instructor: "Tatiana Harrison",
    description: "Create clear and effective technical documentation"
  },
  {
    id: 10,
    title: "Project Management",
    icon: <FaTasks />,
    instructor: "Tatiana Harrison",
    description: "Lead and manage software development projects"
  },
  {
    id: 11,
    title: "Machine Learning",
    icon: <FaBrain />,
    instructor: "Alice Williams",
    description: "Implement machine learning algorithms and models"
  },
  {
    id: 12,
    title: "Data Visualization",
    icon: <FaChartLine />,
    instructor: "Alice Williams",
    description: "Create compelling visual representations of data"
  },
  {
    id: 13,
    title: "Mobile App Development",
    icon: <FaCode />,
    instructor: "Alice Williams",
    description: "Build native and cross-platform mobile applications"
  },
  {
    id: 14,
    title: "Cloud Computing",
    icon: <FaGlobe />,
    instructor: "TBD",
    description: "Deploy and manage cloud-based applications"
  },
  {
    id: 15,
    title: "DevOps Practices",
    icon: <FaProjectDiagram />,
    instructor: "TBD",
    description: "Implement continuous integration and deployment"
  },
  {
    id: 16,
    title: "Software Testing",
    icon: <FaTasks />,
    instructor: "Tatiana Harrison",
    description: "Master software testing methodologies"
  },
  {
    id: 17,
    title: "UI/UX Design",
    icon: <FaLaptopCode />,
    instructor: "Alice Williams",
    description: "Design intuitive user interfaces and experiences"
  },
  {
    id: 18,
    title: "Network Security",
    icon: <FaShieldAlt />,
    instructor: "TBD",
    description: "Secure network infrastructure and communications"
  },
  {
    id: 19,
    title: "Big Data Analytics",
    icon: <FaDatabase />,
    instructor: "Alice Williams",
    description: "Process and analyze large-scale data sets"
  },
  {
    id: 20,
    title: "Blockchain Development",
    icon: <FaProjectDiagram />,
    instructor: "TBD",
    description: "Build decentralized applications and smart contracts"
  },
  {
    id: 21,
    title: "Natural Language Processing",
    icon: <FaBrain />,
    instructor: "Alice Williams",
    description: "Process and analyze human language with AI"
  },
  {
    id: 22,
    title: "Computer Vision",
    icon: <FaBrain />,
    instructor: "Alice Williams",
    description: "Implement visual recognition and processing systems"
  },
  {
    id: 23,
    title: "IoT Development",
    icon: <IoHardwareChip />,
    instructor: "TBD",
    description: "Create connected device applications and systems"
  },
  {
    id: 24,
    title: "API Development",
    icon: <FaCode />,
    instructor: "Tatiana Harrison",
    description: "Design and implement robust API services"
  },
  {
    id: 25,
    title: "System Architecture",
    icon: <FaProjectDiagram />,
    instructor: "Tatiana Harrison",
    description: "Design scalable software architectures"
  },
  {
    id: 26,
    title: "Microservices",
    icon: <FaProjectDiagram />,
    instructor: "TBD",
    description: "Build distributed microservices architectures"
  },
  {
    id: 27,
    title: "Software Design Patterns",
    icon: <FaLaptopCode />,
    instructor: "Tatiana Harrison",
    description: "Apply proven software design solutions"
  },
  {
    id: 28,
    title: "Data Engineering",
    icon: <FaDatabase />,
    instructor: "Alice Williams",
    description: "Build and maintain data processing systems"
  },
  {
    id: 29,
    title: "Deep Learning",
    icon: <FaBrain />,
    instructor: "Alice Williams",
    description: "Implement neural networks and deep learning models"
  },
  {
    id: 30,
    title: "Quantum Computing",
    icon: <IoHardwareChip />,
    instructor: "TBD",
    description: "Explore quantum algorithms and computing principles"
  },
  {
    id: 31,
    title: "Agile Methodologies",
    icon: <FaTasks />,
    instructor: "Tatiana Harrison",
    description: "Apply agile practices in software development"
  },
  {
    id: 32,
    title: "Cloud Security",
    icon: <FaShieldAlt />,
    instructor: "TBD",
    description: "Secure cloud infrastructure and applications"
  },
  {
    id: 33,
    title: "Data Privacy",
    icon: <FaShieldAlt />,
    instructor: "TBD",
    description: "Implement data protection and privacy measures"
  },
  {
    id: 34,
    title: "Software Documentation",
    icon: <FaBook />,
    instructor: "Tatiana Harrison",
    description: "Create comprehensive software documentation"
  },
  {
    id: 35,
    title: "Business Intelligence",
    icon: <FaChartLine />,
    instructor: "Alice Williams",
    description: "Transform data into actionable business insights"
  }
];

const CoursePage: React.FC<CoursePageProps> = ({ language }) => {
  return (
    <div className="course-page">
      <h1 className="course-title">{translations[language].pageTitle}</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseTitle key={course.id} {...course} description={course.description}/>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
