import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AccountPage.css";
import "../styles/Pages.css";
import CourseTitle from "../components/CourseTitleComponent";
import { FaCode, FaLaptopCode } from 'react-icons/fa';
import { IoHardwareChip } from "react-icons/io5";

interface AccountPageProps {
    language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
    setIsLoggedIn: (isLoggedIn: boolean) => void;
  }
  const translations ={

    en:{
        logout: "Logout",
        welcome: "Welcome ",
        upload: "Upload"
    },
    ru:{
        logout: "Выйти",
        welcome: "Добро пожаловать ",
        upload: "Загрузить"
    },

    es: {
        logout: "Cerrar Sesión",
        welcome: "Bienvenido ",
        upload: "Subir"
    },

    fr: {
        logout: "Se déconnecter",
        welcome: "Bienvenue ",
        upload: "Télécharger"
    },

    uk: {
        logout: "Вийти",
        welcome: "Ласкаво просимо ",
        upload: "Завантажити"
    }

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
  }
];

const AccountPage: React.FC<AccountPageProps> = ({ language, setIsLoggedIn }) =>{
  const username = localStorage.getItem("username") || "Guest";
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username"); // Clear username on logout
  setIsLoggedIn(false);
  navigate("/login");
  };

  return (
    <div className="account-page">
      <h1> {translations[language].welcome}{username}!</h1>


      <button className="upload-page-button" onClick={() => navigate("/upload")}>
       + {translations[language].upload}
      </button>

      <button className="logout-button" onClick={handleLogout}> 
      {translations[language].logout}
      </button>

      <div className="course-grid">
        {courses.map((course) => (
          <CourseTitle key={course.id} {...course} description={course.description}/>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;