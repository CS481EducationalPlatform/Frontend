import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/LessonPage.css"; 

const lessons = {
  1: [
    { id: 1, title: "Java Basics", videoUrl: "https://www.youtube.com/watch?v=GdzRzWymT4c", documents: ["Lesson1.pdf", "Lesson1.java"] },
    { id: 2, title: "UML Diagramming", videoUrl: "https://www.youtube.com/watch?v=WnMQ8HlmeXc", documents: ["Lesson2.pdf", "Lesson2.java"] },
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
    { id: 1, title: "Object-Oriented Programming", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["AdvancedProg1.pdf"] },
    { id: 2, title: "Design Patterns", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["AdvancedProg2.pdf"] },
    { id: 3, title: "Clean Code Principles", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["AdvancedProg3.pdf"] }
  ],
  3: [
    { id: 1, title: "Arrays and Lists", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DSA1.pdf"] },
    { id: 2, title: "Trees and Graphs", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DSA2.pdf"] },
    { id: 3, title: "Algorithm Analysis", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DSA3.pdf"] }
  ],
  4: [
    { id: 1, title: "Frontend Development", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["FullStack1.pdf"] },
    { id: 2, title: "Backend Development", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["FullStack2.pdf"] },
    { id: 3, title: "API Integration", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["FullStack3.pdf"] }
  ],
  5: [
    { id: 1, title: "Database Design", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DB1.pdf"] },
    { id: 2, title: "SQL Fundamentals", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DB2.pdf"] },
    { id: 3, title: "Database Optimization", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DB3.pdf"] }
  ],
  6: [
    { id: 1, title: "Data Analysis Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DataScience1.pdf"] },
    { id: 2, title: "Statistical Methods", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DataScience2.pdf"] },
    { id: 3, title: "Data Visualization", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DataScience3.pdf"] }
  ],
  7: [
    { id: 1, title: "HTML & CSS", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["WebDev1.pdf"] },
    { id: 2, title: "JavaScript Basics", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["WebDev2.pdf"] },
    { id: 3, title: "Responsive Design", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["WebDev3.pdf"] }
  ],
  8: [
    { id: 1, title: "Security Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Security1.pdf"] },
    { id: 2, title: "Network Security", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Security2.pdf"] },
    { id: 3, title: "Ethical Hacking", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Security3.pdf"] }
  ],
  9: [
    { id: 1, title: "Documentation Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["TechWriting1.pdf"] },
    { id: 2, title: "API Documentation", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["TechWriting2.pdf"] },
    { id: 3, title: "Style Guides", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["TechWriting3.pdf"] }
  ],
  10: [
    { id: 1, title: "Project Planning", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["ProjectMgmt1.pdf"] },
    { id: 2, title: "Agile Methods", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["ProjectMgmt2.pdf"] },
    { id: 3, title: "Risk Management", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["ProjectMgmt3.pdf"] }
  ],
  11: [
    { id: 1, title: "ML Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["ML1.pdf"] },
    { id: 2, title: "Supervised Learning", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["ML2.pdf"] },
    { id: 3, title: "Neural Networks", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["ML3.pdf"] }
  ],
  12: [
    { id: 1, title: "Data Viz Principles", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DataViz1.pdf"] },
    { id: 2, title: "Interactive Visualizations", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DataViz2.pdf"] },
    { id: 3, title: "Dashboard Design", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DataViz3.pdf"] }
  ],
  13: [
    { id: 1, title: "Mobile Dev Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["MobileDev1.pdf"] },
    { id: 2, title: "iOS Development", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["MobileDev2.pdf"] },
    { id: 3, title: "Android Development", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["MobileDev3.pdf"] }
  ],
  14: [
    { id: 1, title: "Cloud Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Cloud1.pdf"] },
    { id: 2, title: "AWS Services", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Cloud2.pdf"] },
    { id: 3, title: "Cloud Architecture", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Cloud3.pdf"] }
  ],
  15: [
    { id: 1, title: "DevOps Introduction", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DevOps1.pdf"] },
    { id: 2, title: "CI/CD Pipelines", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DevOps2.pdf"] },
    { id: 3, title: "Infrastructure as Code", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DevOps3.pdf"] }
  ],
  16: [
    { id: 1, title: "Testing Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Testing1.pdf"] },
    { id: 2, title: "Unit Testing", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Testing2.pdf"] },
    { id: 3, title: "Integration Testing", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Testing3.pdf"] }
  ],
  17: [
    { id: 1, title: "UI Design Principles", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["UIUX1.pdf"] },
    { id: 2, title: "User Research", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["UIUX2.pdf"] },
    { id: 3, title: "Prototyping", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["UIUX3.pdf"] }
  ],
  18: [
    { id: 1, title: "Network Security Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["NetSec1.pdf"] },
    { id: 2, title: "Threat Detection", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["NetSec2.pdf"] },
    { id: 3, title: "Security Protocols", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["NetSec3.pdf"] }
  ],
  19: [
    { id: 1, title: "Big Data Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["BigData1.pdf"] },
    { id: 2, title: "Data Processing", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["BigData2.pdf"] },
    { id: 3, title: "Data Analytics", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["BigData3.pdf"] }
  ],
  20: [
    { id: 1, title: "Blockchain Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Blockchain1.pdf"] },
    { id: 2, title: "Smart Contracts", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Blockchain2.pdf"] },
    { id: 3, title: "DApp Development", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Blockchain3.pdf"] }
  ],
  21: [
    { id: 1, title: "NLP Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["NLP1.pdf"] },
    { id: 2, title: "Text Processing", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["NLP2.pdf"] },
    { id: 3, title: "Language Models", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["NLP3.pdf"] }
  ],
  22: [
    { id: 1, title: "Computer Vision Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["CV1.pdf"] },
    { id: 2, title: "Image Processing", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["CV2.pdf"] },
    { id: 3, title: "Object Detection", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["CV3.pdf"] }
  ],
  23: [
    { id: 1, title: "IoT Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["IoT1.pdf"] },
    { id: 2, title: "Sensor Networks", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["IoT2.pdf"] },
    { id: 3, title: "IoT Security", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["IoT3.pdf"] }
  ],
  24: [
    { id: 1, title: "API Design", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["API1.pdf"] },
    { id: 2, title: "RESTful Services", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["API2.pdf"] },
    { id: 3, title: "API Security", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["API3.pdf"] }
  ],
  25: [
    { id: 1, title: "Architecture Patterns", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Arch1.pdf"] },
    { id: 2, title: "System Design", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Arch2.pdf"] },
    { id: 3, title: "Scalability", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Arch3.pdf"] }
  ],
  26: [
    { id: 1, title: "Microservices Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Micro1.pdf"] },
    { id: 2, title: "Service Discovery", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Micro2.pdf"] },
    { id: 3, title: "Event-Driven Architecture", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Micro3.pdf"] }
  ],
  27: [
    { id: 1, title: "Design Pattern Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Patterns1.pdf"] },
    { id: 2, title: "Creational Patterns", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Patterns2.pdf"] },
    { id: 3, title: "Structural Patterns", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Patterns3.pdf"] }
  ],
  28: [
    { id: 1, title: "Data Engineering Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DataEng1.pdf"] },
    { id: 2, title: "ETL Processes", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DataEng2.pdf"] },
    { id: 3, title: "Data Warehousing", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DataEng3.pdf"] }
  ],
  29: [
    { id: 1, title: "Deep Learning Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["DeepL1.pdf"] },
    { id: 2, title: "CNN Architecture", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["DeepL2.pdf"] },
    { id: 3, title: "RNN and LSTM", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["DeepL3.pdf"] }
  ],
  30: [
    { id: 1, title: "Quantum Computing Basics", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Quantum1.pdf"] },
    { id: 2, title: "Quantum Algorithms", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Quantum2.pdf"] },
    { id: 3, title: "Quantum Programming", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Quantum3.pdf"] }
  ]
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
      <div className="lesson-sidebar">
        <div className="lesson-sidebar-content">
          <h2>{translations[language].courseLessons}</h2>
          <div className="lesson-list">
            {courseLessons.map((lesson) => (
              <Lesson
                key={lesson.id}
                lesson={lesson}
                isActive={lesson.id === currentLesson?.id}
                onSelect={setCurrentLesson}
              />
            ))}
          </div>
        </div>
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate("/")}>
            {translations[language].backToCourses}
          </button>
        </div>
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
