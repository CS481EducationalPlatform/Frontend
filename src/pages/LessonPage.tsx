import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/LessonPage.css"; 

const lessons = {
  1: [
    { id: 1, title: "Java Basics", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson1.pdf"] },
    { id: 2, title: "UML Diagramming", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson2.pdf"] },
    { id: 3, title: "Object-Oriented Programming", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson3.pdf"] },
    { id: 4, title: "Exception Handling", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson4.pdf"] },
    { id: 5, title: "Collections Framework", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson5.pdf"] },
    { id: 6, title: "File I/O", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson6.pdf"] },
    { id: 7, title: "Multithreading", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson7.pdf"] },
    { id: 8, title: "JDBC", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson8.pdf"] },
    { id: 9, title: "Java GUI with Swing", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson9.pdf"] },
    { id: 10, title: "Java Network Programming", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson10.pdf"] },
    { id: 11, title: "Java Generics", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson11.pdf"] },
    { id: 12, title: "Lambda Expressions", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson12.pdf"] },
    { id: 13, title: "Stream API", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson13.pdf"] },
    { id: 14, title: "Java Date and Time", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson14.pdf"] },
    { id: 15, title: "Java Reflection", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson15.pdf"] },
    { id: 16, title: "Java Annotations", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson16.pdf"] },
    { id: 17, title: "Java Serialization", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson17.pdf"] },
    { id: 18, title: "Design Patterns", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson18.pdf"] },
    { id: 19, title: "Testing with JUnit", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson19.pdf"] },
    { id: 20, title: "Maven Build Tool", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson20.pdf"] },
    { id: 21, title: "Spring Framework Intro", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson21.pdf"] },
    { id: 22, title: "Java Memory Management", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson22.pdf"] },
  ],
  2: [
    { id: 1, title: "Python Fundamentals", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Python1.pdf"] },
    { id: 2, title: "Advanced Python", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Python2.pdf"] },
  ],
  3: [
    { id: 1, title: "Binary Search Trees", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Web1.pdf"] },
    { id: 2, title: "Stacks and Queues", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Web2.pdf"] },
  ],
  4: [
    
    { id: 1, title: "React Fundamentals", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["React1.pdf"] },
    { id: 2, title: "React Hooks", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["React2.pdf"] },
  ],
  5: [
    { id: 1, title: "Database Design", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DB1.pdf"] },
    { id: 2, title: "SQL Basics", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DB2.pdf"] },
  ],
  6: [
    { id: 1, title: "Statistics with R", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DB1.pdf"] },
    { id: 2, title: "Data Visualization", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DB2.pdf"] },
  ],
};

// Add translations
const translations = {
  en: {
    courseLessons: "Course Lessons",
    backToCourses: "Back to Courses",
    selectLesson: "Select a lesson to view its content",
    courseDocuments: "Course Documents",
    noDocuments: "No documents available"
  },
  ru: {
    courseLessons: "Уроки Курса",
    backToCourses: "Назад к Курсам",
    selectLesson: "Выберите урок для просмотра",
    courseDocuments: "Документы Курса",
    noDocuments: "Документы недоступны"
  },
  es: {
    courseLessons: "Lecciones del Curso",
    backToCourses: "Volver a los Cursos",
    selectLesson: "Selecciona una lección para ver su contenido",
    courseDocuments: "Documentos del Curso",
    noDocuments: "No hay documentos disponibles"
  },
  fr: {
    courseLessons: "Leçons du Cours",
    backToCourses: "Retour aux Cours",
    selectLesson: "Sélectionnez une leçon pour voir son contenu",
    courseDocuments: "Documents du Cours",
    noDocuments: "Aucun document disponible"
  },
  uk: {
    courseLessons: "Уроки Курсу",
    backToCourses: "Назад до Курсів",
    selectLesson: "Виберіть урок для перегляду",
    courseDocuments: "Документи Курсу",
    noDocuments: "Документи недоступні"
  }
};

interface LessonPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

const LessonPage: React.FC<LessonPageProps> = ({ language }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseLessons = lessons[courseId] || [];
  const [currentLesson, setCurrentLesson] = useState(null);

  return (
    <div className="lesson-page">
      {/* Sidebar with Lessons */}
      <div className="lesson-sidebar">
        <h2>{translations[language].courseLessons}</h2>
        {courseLessons.map((lesson) => (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            isActive={lesson.id === currentLesson?.id}
            onSelect={setCurrentLesson}
          />
        ))}
        <button className="back-button" onClick={() => navigate("/")}>
          {translations[language].backToCourses}
        </button>
      </div>

      {/* Lesson Content Section */}
      <div className="lesson-content">
        {currentLesson ? (
          <>
            <h2>{currentLesson?.title}</h2>
            {currentLesson?.videoUrl && (
              <div className="video-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <YoutubeEmbedder url={currentLesson.videoUrl} width="100%" height="100%" />
                  </div>
                </div>
              </div>
            )}
            <h3>{translations[language].courseDocuments}</h3>
            {currentLesson?.documents.length > 0 ? (
              <ul className="document-list">
                {currentLesson.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            ) : (
              <p>{translations[language].noDocuments}</p>
            )}
          </>
        ) : (
          <p>{translations[language].selectLesson}</p>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
