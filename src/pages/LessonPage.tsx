import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/LessonPage.css"; 

interface LessonType {
  id: number;
  title: string;
  videoUrl: string;
  documents: string[];
  tags: string[];
}

const lessons: { [key: string]: LessonType[] } = {
  1: [
    { id: 1, title: "Java Basics", videoUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34", documents: ["Lesson1.pdf", "Lesson1.java"], tags: ["java", "basics", "programming"] },
    { id: 2, title: "UML Diagramming", videoUrl: "https://www.youtube.com/watch?v=UI6lqHOVHic", documents: ["Lesson2.pdf", "Lesson2.java"], tags: ["uml", "design", "diagrams"] },
    { id: 3, title: "Object-Oriented Programming", videoUrl: "https://www.youtube.com/watch?v=pTB0EiLXUC8", documents: ["Lesson3.pdf"], tags: ["oop", "java", "programming"] },
    { id: 4, title: "Exception Handling", videoUrl: "https://www.youtube.com/watch?v=W-N2ltgU-X4", documents: ["Lesson4.pdf"], tags: ["exceptions", "error-handling", "java"] },
    { id: 5, title: "Collections Framework", videoUrl: "https://www.youtube.com/watch?v=GdAon80-0KA", documents: ["Lesson5.pdf"], tags: ["collections", "data-structures", "java"] },
    { id: 6, title: "File I/O", videoUrl: "https://www.youtube.com/watch?v=H62Jfv1DJlU", documents: ["Lesson6.pdf"], tags: ["io", "files", "java"] },
    { id: 7, title: "Multithreading", videoUrl: "https://www.youtube.com/watch?v=TCd8QIS-2KI", documents: ["Lesson7.pdf"], tags: ["threads", "concurrency", "java"] },
    { id: 8, title: "JDBC", videoUrl: "https://www.youtube.com/watch?v=y_YxwyYRJek", documents: ["Lesson8.pdf"], tags: ["jdbc", "database", "java"] },
    { id: 9, title: "Java GUI with Swing", videoUrl: "https://www.youtube.com/watch?v=Kmgo00avvEw", documents: ["Lesson9.pdf"], tags: ["gui", "swing", "java"] },
    { id: 10, title: "Java Network Programming", videoUrl: "https://www.youtube.com/watch?v=BZi44GOD8kY", documents: ["Lesson10.pdf"], tags: ["networking", "sockets", "java"] },
    { id: 11, title: "Java Generics", videoUrl: "https://www.youtube.com/watch?v=K1iu1kXkVoA", documents: ["Lesson11.pdf"], tags: ["generics", "java", "programming"] },
    { id: 12, title: "Lambda Expressions", videoUrl: "https://www.youtube.com/watch?v=4HC_WyBSDGA", documents: ["Lesson12.pdf"], tags: ["lambda", "functional", "java"] },
    { id: 13, title: "Stream API", videoUrl: "https://www.youtube.com/watch?v=t1-YZ6bF-g0", documents: ["Lesson13.pdf"], tags: ["streams", "functional", "java"] },
    { id: 14, title: "Java Date and Time", videoUrl: "https://www.youtube.com/watch?v=0XgdX5hDL4U", documents: ["Lesson14.pdf"], tags: ["date", "time", "java"] },
    { id: 15, title: "Java Reflection", videoUrl: "https://www.youtube.com/watch?v=bhhMJSKNCQY", documents: ["Lesson15.pdf"], tags: ["reflection", "advanced", "java"] },
    { id: 16, title: "Java Annotations", videoUrl: "https://www.youtube.com/watch?v=DkZr7_c9ry8", documents: ["Lesson16.pdf"], tags: ["annotations", "metadata", "java"] },
    { id: 17, title: "Java Serialization", videoUrl: "https://www.youtube.com/watch?v=6B6vp0jZnb0", documents: ["Lesson17.pdf"], tags: ["serialization", "io", "java"] },
    { id: 18, title: "Design Patterns", videoUrl: "https://www.youtube.com/watch?v=v9ejT8FO-7I", documents: ["Lesson18.pdf"], tags: ["patterns", "design", "architecture"] },
    { id: 19, title: "Testing with JUnit", videoUrl: "https://www.youtube.com/watch?v=vZm0lHciFsQ", documents: ["Lesson19.pdf"], tags: ["testing", "junit", "java"] },
    { id: 20, title: "Maven Build Tool", videoUrl: "https://www.youtube.com/watch?v=x8sMN4tossY", documents: ["Lesson20.pdf"], tags: ["maven", "build", "tools"] },
    { id: 21, title: "Spring Framework Intro", videoUrl: "https://www.youtube.com/watch?v=If1Lw4pLLEo", documents: ["Lesson21.pdf"], tags: ["spring", "framework", "java"] },
    { id: 22, title: "Java Memory Management", videoUrl: "https://www.youtube.com/watch?v=WV2Ed1QTst8", documents: ["Lesson22.pdf"], tags: ["memory", "jvm", "java"] },
  ],
  2: [
    { id: 1, title: "Object-Oriented Programming", videoUrl: "https://www.youtube.com/watch?v=SiBw7os-_zI", documents: ["AdvancedProg1.pdf"], tags: ["oop", "programming", "advanced"] },
    { id: 2, title: "Design Patterns", videoUrl: "https://www.youtube.com/watch?v=v9ejT8FO-7I", documents: ["AdvancedProg2.pdf"], tags: ["patterns", "design", "architecture"] },
    { id: 3, title: "Clean Code Principles", videoUrl: "https://www.youtube.com/watch?v=7EmboKQH8lM", documents: ["AdvancedProg3.pdf"], tags: ["clean-code", "best-practices", "programming"] }
  ],
  3: [
    { id: 1, title: "Arrays and Lists", videoUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM", documents: ["DSA1.pdf"], tags: ["arrays", "lists", "data-structures"] },
    { id: 2, title: "Trees and Graphs", videoUrl: "https://www.youtube.com/watch?v=09_LlHjoEiY", documents: ["DSA2.pdf"], tags: ["trees", "graphs", "data-structures"] },
    { id: 3, title: "Algorithm Analysis", videoUrl: "https://www.youtube.com/watch?v=D6xkbGLQesk", documents: ["DSA3.pdf"], tags: ["algorithms", "analysis", "complexity"] }
  ],
  4: [
    { id: 1, title: "Frontend Development", videoUrl: "https://www.youtube.com/watch?v=mU6anWqZJcc", documents: ["FullStack1.pdf"], tags: ["frontend", "web", "development"] },
    { id: 2, title: "Backend Development", videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE", documents: ["FullStack2.pdf"], tags: ["backend", "server", "development"] },
    { id: 3, title: "API Integration", videoUrl: "https://www.youtube.com/watch?v=GZvSYJDk-us", documents: ["FullStack3.pdf"], tags: ["api", "integration", "web"] }
  ],
  5: [
    { id: 1, title: "Database Design", videoUrl: "https://www.youtube.com/watch?v=ztHopE5Wnpc", documents: ["DB1.pdf"], tags: ["database", "design", "sql"] },
    { id: 2, title: "SQL Fundamentals", videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY", documents: ["DB2.pdf"], tags: ["sql", "database", "basics"] },
    { id: 3, title: "Database Optimization", videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY", documents: ["DB3.pdf"], tags: ["optimization", "database", "performance"] }
  ],
  6: [
    { id: 1, title: "Data Analysis Basics", videoUrl: "https://www.youtube.com/watch?v=r-uOLxNrNk8", documents: ["DataScience1.pdf"], tags: ["data-analysis", "statistics", "basics"] },
    { id: 2, title: "Statistical Methods", videoUrl: "https://www.youtube.com/watch?v=xxpc-HPKN28", documents: ["DataScience2.pdf"], tags: ["statistics", "analysis", "methods"] },
    { id: 3, title: "Data Visualization", videoUrl: "https://www.youtube.com/watch?v=a9UrKTVEeZA", documents: ["DataScience3.pdf"], tags: ["visualization", "data", "charts"] }
  ],
  7: [
    { id: 1, title: "HTML & CSS", videoUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU", documents: ["WebDev1.pdf"], tags: ["html", "css", "web"] },
    { id: 2, title: "JavaScript Basics", videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk", documents: ["WebDev2.pdf"], tags: ["javascript", "web", "programming"] },
    { id: 3, title: "Responsive Design", videoUrl: "https://www.youtube.com/watch?v=srvUrASNj0s", documents: ["WebDev3.pdf"], tags: ["responsive", "design", "web"] }
  ],
  8: [
    { id: 1, title: "Security Fundamentals", videoUrl: "https://www.youtube.com/watch?v=z5nc9MDbvkw", documents: ["Security1.pdf"], tags: ["security", "basics", "cybersecurity"] },
    { id: 2, title: "Network Security", videoUrl: "https://www.youtube.com/watch?v=E03gh1huvW4", documents: ["Security2.pdf"], tags: ["network", "security", "protocols"] },
    { id: 3, title: "Ethical Hacking", videoUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", documents: ["Security3.pdf"], tags: ["hacking", "security", "ethical"] }
  ],
  9: [
    { id: 1, title: "Documentation Basics", videoUrl: "https://www.youtube.com/watch?v=t4vKPhjcMZg", documents: ["TechWriting1.pdf"], tags: ["documentation", "writing", "basics"] },
    { id: 2, title: "API Documentation", videoUrl: "https://www.youtube.com/watch?v=Yl_90YOZD-M", documents: ["TechWriting2.pdf"], tags: ["api", "documentation", "technical"] },
    { id: 3, title: "Style Guides", videoUrl: "https://www.youtube.com/watch?v=Hh_Ij6-3TZQ", documents: ["TechWriting3.pdf"], tags: ["style", "guides", "writing"] }
  ],
  10: [
    { id: 1, title: "Project Planning", videoUrl: "https://www.youtube.com/watch?v=MhLMVGXX1cE", documents: ["ProjectMgmt1.pdf"], tags: ["planning", "management", "project"] },
    { id: 2, title: "Agile Methods", videoUrl: "https://www.youtube.com/watch?v=502ILHjX9EE", documents: ["ProjectMgmt2.pdf"], tags: ["agile", "methodology", "management"] },
    { id: 3, title: "Risk Management", videoUrl: "https://www.youtube.com/watch?v=PD7YVn3VtqA", documents: ["ProjectMgmt3.pdf"], tags: ["risk", "management", "planning"] }
  ],
  11: [
    { id: 1, title: "ML Fundamentals", videoUrl: "https://www.youtube.com/watch?v=JcI5Vnw0b2c", documents: ["ML1.pdf"], tags: ["machine-learning", "ai", "basics"] },
    { id: 2, title: "Supervised Learning", videoUrl: "https://www.youtube.com/watch?v=4qVRBYAdLAo", documents: ["ML2.pdf"], tags: ["supervised", "ml", "algorithms"] },
    { id: 3, title: "Neural Networks", videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk", documents: ["ML3.pdf"], tags: ["neural-networks", "deep-learning", "ai"] }
  ],
  12: [
    { id: 1, title: "Data Viz Principles", videoUrl: "https://www.youtube.com/watch?v=5Zg-C8AAIGg", documents: ["DataViz1.pdf"], tags: ["visualization", "principles", "data"] },
    { id: 2, title: "Interactive Visualizations", videoUrl: "https://www.youtube.com/watch?v=xkBheRZTkaw", documents: ["DataViz2.pdf"], tags: ["interactive", "visualization", "d3"] },
    { id: 3, title: "Dashboard Design", videoUrl: "https://www.youtube.com/watch?v=_3loq22TxSc", documents: ["DataViz3.pdf"], tags: ["dashboard", "design", "visualization"] }
  ],
  13: [
    { id: 1, title: "Mobile Dev Basics", videoUrl: "https://www.youtube.com/watch?v=fis26HvvDII", documents: ["MobileDev1.pdf"], tags: ["mobile", "development", "basics"] },
    { id: 2, title: "iOS Development", videoUrl: "https://www.youtube.com/watch?v=F2ojC6TNwws", documents: ["MobileDev2.pdf"], tags: ["ios", "swift", "mobile"] },
    { id: 3, title: "Android Development", videoUrl: "https://www.youtube.com/watch?v=fis26HvvDII", documents: ["MobileDev3.pdf"], tags: ["android", "kotlin", "mobile"] }
  ],
  14: [
    { id: 1, title: "Cloud Fundamentals", videoUrl: "https://www.youtube.com/watch?v=3hLmDS179YE", documents: ["Cloud1.pdf"], tags: ["cloud", "basics", "infrastructure"] },
    { id: 2, title: "AWS Services", videoUrl: "https://www.youtube.com/watch?v=Z3SYDTMP3ME", documents: ["Cloud2.pdf"], tags: ["aws", "cloud", "services"] },
    { id: 3, title: "Cloud Architecture", videoUrl: "https://www.youtube.com/watch?v=a9__D53WsUs", documents: ["Cloud3.pdf"], tags: ["architecture", "cloud", "design"] }
  ],
  15: [
    { id: 1, title: "DevOps Introduction", videoUrl: "https://www.youtube.com/watch?v=Xrgk023l4lI", documents: ["DevOps1.pdf"], tags: ["devops", "basics", "automation"] },
    { id: 2, title: "CI/CD Pipelines", videoUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", documents: ["DevOps2.pdf"], tags: ["ci-cd", "pipelines", "automation"] },
    { id: 3, title: "Infrastructure as Code", videoUrl: "https://www.youtube.com/watch?v=POPP2WTJ8es", documents: ["DevOps3.pdf"], tags: ["iac", "infrastructure", "automation"] }
  ],
  16: [
    { id: 1, title: "Testing Fundamentals", videoUrl: "https://www.youtube.com/watch?v=u-HgzgYe8KA", documents: ["Testing1.pdf"], tags: ["testing", "qa", "basics"] },
    { id: 2, title: "Unit Testing", videoUrl: "https://www.youtube.com/watch?v=7r4xVDI2vho", documents: ["Testing2.pdf"], tags: ["unit-testing", "testing", "automation"] },
    { id: 3, title: "Integration Testing", videoUrl: "https://www.youtube.com/watch?v=FKaZB-eCwTo", documents: ["Testing3.pdf"], tags: ["integration", "testing", "qa"] }
  ],
  17: [
    { id: 1, title: "UI Design Principles", videoUrl: "https://www.youtube.com/watch?v=a5KYlHNKQB8", documents: ["UIUX1.pdf"], tags: ["ui", "design", "principles"] },
    { id: 2, title: "User Research", videoUrl: "https://www.youtube.com/watch?v=bAARmsv1tms", documents: ["UIUX2.pdf"], tags: ["research", "ux", "user"] },
    { id: 3, title: "Prototyping", videoUrl: "https://www.youtube.com/watch?v=qpH7-KFWZRI", documents: ["UIUX3.pdf"], tags: ["prototyping", "design", "ui"] }
  ],
  18: [
    { id: 1, title: "Network Security Basics", videoUrl: "https://www.youtube.com/watch?v=z5nc9MDbvkw", documents: ["NetSec1.pdf"], tags: ["network", "security", "basics"] },
    { id: 2, title: "Threat Detection", videoUrl: "https://www.youtube.com/watch?v=Dk-ZqQ-bfy4", documents: ["NetSec2.pdf"], tags: ["threat", "security", "detection"] },
    { id: 3, title: "Security Protocols", videoUrl: "https://www.youtube.com/watch?v=E03gh1huvW4", documents: ["NetSec3.pdf"], tags: ["protocols", "security", "network"] }
  ],
  19: [
    { id: 1, title: "Big Data Fundamentals", videoUrl: "https://www.youtube.com/watch?v=1LMBUwqZPYE", documents: ["BigData1.pdf"], tags: ["big-data", "basics", "analytics"] },
    { id: 2, title: "Data Processing", videoUrl: "https://www.youtube.com/watch?v=bAyrObl7TYE", documents: ["BigData2.pdf"], tags: ["processing", "data", "etl"] },
    { id: 3, title: "Data Analytics", videoUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30", documents: ["BigData3.pdf"], tags: ["analytics", "data", "analysis"] }
  ],
  20: [
    { id: 1, title: "Blockchain Basics", videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4", documents: ["Blockchain1.pdf"], tags: ["blockchain", "crypto", "basics"] },
    { id: 2, title: "Smart Contracts", videoUrl: "https://www.youtube.com/watch?v=ooN6kZ9vqNQ", documents: ["Blockchain2.pdf"], tags: ["smart-contracts", "blockchain", "solidity"] },
    { id: 3, title: "DApp Development", videoUrl: "https://www.youtube.com/watch?v=CgXQC4dbGUE", documents: ["Blockchain3.pdf"], tags: ["dapp", "blockchain", "development"] }
  ],
  21: [
    { id: 1, title: "NLP Fundamentals", videoUrl: "https://www.youtube.com/watch?v=8S3qHHUKqYk", documents: ["NLP1.pdf"], tags: ["nlp", "ai", "basics"] },
    { id: 2, title: "Text Processing", videoUrl: "https://www.youtube.com/watch?v=xvqsFTUsOmc", documents: ["NLP2.pdf"], tags: ["text", "processing", "nlp"] },
    { id: 3, title: "Language Models", videoUrl: "https://www.youtube.com/watch?v=4jl_txxYQEA", documents: ["NLP3.pdf"], tags: ["language-models", "nlp", "ai"] }
  ],
  22: [
    { id: 1, title: "Computer Vision Basics", videoUrl: "https://www.youtube.com/watch?v=hRYnp-yqgpE", documents: ["CV1.pdf"], tags: ["computer-vision", "ai", "basics"] },
    { id: 2, title: "Image Processing", videoUrl: "https://www.youtube.com/watch?v=mRM5Js3VLKc", documents: ["CV2.pdf"], tags: ["image", "processing", "vision"] },
    { id: 3, title: "Object Detection", videoUrl: "https://www.youtube.com/watch?v=yqkISICHH-U", documents: ["CV3.pdf"], tags: ["detection", "vision", "ai"] }
  ],
  23: [
    { id: 1, title: "IoT Fundamentals", videoUrl: "https://www.youtube.com/watch?v=h0gWfVCSGQQ", documents: ["IoT1.pdf"], tags: ["iot", "basics", "embedded"] },
    { id: 2, title: "Sensor Networks", videoUrl: "https://www.youtube.com/watch?v=LlhmzVL5bm8", documents: ["IoT2.pdf"], tags: ["sensors", "networks", "iot"] },
    { id: 3, title: "IoT Security", videoUrl: "https://www.youtube.com/watch?v=h1iwpkOh8p8", documents: ["IoT3.pdf"], tags: ["security", "iot", "privacy"] }
  ],
  24: [
    { id: 1, title: "API Design", videoUrl: "https://www.youtube.com/watch?v=Q-BpqyOT3a8", documents: ["API1.pdf"], tags: ["api", "design", "rest"] },
    { id: 2, title: "RESTful Services", videoUrl: "https://www.youtube.com/watch?v=7YcW25PHnAA", documents: ["API2.pdf"], tags: ["rest", "api", "services"] },
    { id: 3, title: "API Security", videoUrl: "https://www.youtube.com/watch?v=t4AUxNuIc5g", documents: ["API3.pdf"], tags: ["security", "api", "authentication"] }
  ],
  25: [
    { id: 1, title: "Architecture Patterns", videoUrl: "https://www.youtube.com/watch?v=FLtqAi7WNBY", documents: ["Arch1.pdf"], tags: ["architecture", "patterns", "design"] },
    { id: 2, title: "System Design", videoUrl: "https://www.youtube.com/watch?v=Y3RG5j8L4Ls", documents: ["Arch2.pdf"], tags: ["system", "design", "architecture"] },
    { id: 3, title: "Scalability", videoUrl: "https://www.youtube.com/watch?v=xpDnVSmNFX0", documents: ["Arch3.pdf"], tags: ["scalability", "performance", "architecture"] }
  ],
  26: [
    { id: 1, title: "Microservices Basics", videoUrl: "https://www.youtube.com/watch?v=j1gU2oGFayY", documents: ["Micro1.pdf"], tags: ["microservices", "architecture", "basics"] },
    { id: 2, title: "Service Discovery", videoUrl: "https://www.youtube.com/watch?v=GboiMJm6WlA", documents: ["Micro2.pdf"], tags: ["discovery", "microservices", "networking"] },
    { id: 3, title: "Event-Driven Architecture", videoUrl: "https://www.youtube.com/watch?v=SnO9dTbF6hM", documents: ["Micro3.pdf"], tags: ["event-driven", "architecture", "messaging"] }
  ],
  27: [
    { id: 1, title: "Design Pattern Basics", videoUrl: "https://www.youtube.com/watch?v=v9ejT8FO-7I", documents: ["Patterns1.pdf"], tags: ["patterns", "design", "basics"] },
    { id: 2, title: "Creational Patterns", videoUrl: "https://www.youtube.com/watch?v=EcFVTgRHJLM", documents: ["Patterns2.pdf"], tags: ["creational", "patterns", "design"] },
    { id: 3, title: "Structural Patterns", videoUrl: "https://www.youtube.com/watch?v=lPsSL6_7NBg", documents: ["Patterns3.pdf"], tags: ["structural", "patterns", "design"] }
  ],
  28: [
    { id: 1, title: "Data Engineering Basics", videoUrl: "https://www.youtube.com/watch?v=qWru-b6m030", documents: ["DataEng1.pdf"], tags: ["data", "engineering", "basics"] },
    { id: 2, title: "ETL Processes", videoUrl: "https://www.youtube.com/watch?v=OW5OXLEEWIc", documents: ["DataEng2.pdf"], tags: ["etl", "data", "processing"] },
    { id: 3, title: "Data Warehousing", videoUrl: "https://www.youtube.com/watch?v=J326LIUrZM8", documents: ["DataEng3.pdf"], tags: ["warehousing", "data", "storage"] }
  ],
  29: [
    { id: 1, title: "Deep Learning Basics", videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk", documents: ["DeepL1.pdf"], tags: ["deep-learning", "ai", "basics"] },
    { id: 2, title: "CNN Architecture", videoUrl: "https://www.youtube.com/watch?v=FmpDIaiMIeA", documents: ["DeepL2.pdf"], tags: ["cnn", "neural-networks", "deep-learning"] },
    { id: 3, title: "RNN and LSTM", videoUrl: "https://www.youtube.com/watch?v=WCUNPb-5EYI", documents: ["DeepL3.pdf"], tags: ["rnn", "lstm", "deep-learning"] }
  ],
  30: [
    { id: 1, title: "Quantum Computing Basics", videoUrl: "https://www.youtube.com/watch?v=F_Riqjdh2oM", documents: ["Quantum1.pdf"], tags: ["quantum", "computing", "basics"] },
    { id: 2, title: "Quantum Algorithms", videoUrl: "https://www.youtube.com/watch?v=0ORqGkBQn2w", documents: ["Quantum2.pdf"], tags: ["algorithms", "quantum", "computing"] },
    { id: 3, title: "Quantum Programming", videoUrl: "https://www.youtube.com/watch?v=Rs2TzarBX5I", documents: ["Quantum3.pdf"], tags: ["programming", "quantum", "qiskit"] }
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
            {courseLessons.map((lesson: LessonType) => (
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
