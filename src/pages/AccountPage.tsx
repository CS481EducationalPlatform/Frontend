import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AccountPage.css";
import "../styles/Pages.css";
import CourseTitle from "../components/CourseTitleComponent";
import { FaCode, FaLaptopCode } from 'react-icons/fa';
import { IoHardwareChip } from "react-icons/io5";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

interface Course {
  id:number;
  title:string;
  icon:JSX.Element;
  instructor:string;
  description:string;
}

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


const AccountPage: React.FC<AccountPageProps> = ({ language, setIsLoggedIn }) =>{
  const username = localStorage.getItem("username") || "Guest";
  const navigate = useNavigate();
  const [openCreateCourseModal, setOpenCreateCourseModal] = useState(false);

  const courses: Course[] = [
    {
      id: 1,
      title: username,
      icon: <FaCode />,
      instructor: "Tatiana Harrison",
      description: "Learn fundamental programming concepts and syntax"
    },
    {
      id: 2,
      title: "Advanced Programming",
      icon: <FaLaptopCode />,
      instructor: username,
      description: "Master complex programming concepts and design patterns"
    },
    {
      id: 3,
      title: "Data Structures and Algorithms",
      icon: <IoHardwareChip />,
      instructor: username,
      description: "Study essential data structures and algorithmic techniques"
    }
  ];

  const newCourse = {
    id: Number.MAX_SAFE_INTEGER,
    title: "Add New Course",
    icon: <NoteAddIcon />,
    instructor: username,
    description: "Add Description"
  }
  const [editingCourse, setEditingCourse] = useState<Course>(newCourse)
  const [moreCourses, addMoreCourses] = useState<Course[]>([])

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username"); // Clear username on logout
  setIsLoggedIn(false);
  navigate("/login");
  };

  const callMulti = (...functions: React.SetStateAction<any>[]) => (event:any) => {
    const value = event.target.value;
    functions.forEach((func) => func(value));
  }

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
        {moreCourses.map((course, index) => (
          <button
            className="course-button"
            onClick={() => navigate(`/course/${31}`)}
            key={course.id - index}
          >
            <div className="course-icon">{course.icon}</div>
            <div className="course-title-text">
              <strong>{course.title}</strong>
              <p className="course-instructor">Instructor: {course.instructor}</p>
              <p className="course-description">{course.description}</p>
            </div>
          </button>
        ))}
        <button
          className="course-button"
          onClick={() => setOpenCreateCourseModal(true)}
        >
          <div className="course-icon">{newCourse.icon}</div>
          <div className="course-title-text">
            <strong>{newCourse.title}</strong>
            <p className="course-instructor">Instructor: {newCourse.instructor}</p>
            <p className="course-description">{newCourse.description}</p>
          </div>
        </button>
      </div>

      {openCreateCourseModal ? 
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-header">Create New Course</h2>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  className="form-input"
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                  placeholder="Enter course title"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Course Description</label>
                <input
                  className="form-input"
                  type="text"
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                  placeholder="Enter course description"
                />
              </div>
              <div className="modal-button-group">
                <button 
                  className="modal-button cancel-button" 
                  onClick={() => setOpenCreateCourseModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-button update-button"
                  onClick={() => {
                    const newId = courses.length + moreCourses.length;
                    const updatedCourse = {...editingCourse, id: newId};
                    callMulti(
                      addMoreCourses([...moreCourses, updatedCourse]),
                      setEditingCourse(newCourse),
                      setOpenCreateCourseModal(false)
                    )
                  }} 
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      : <></>}
    </div>
  );
};

export default AccountPage;