import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/LessonPage.css";
import { getCourseLessons } from "../services/courseService";

const API_BASE_URL = 'https://backend-4yko.onrender.com';

interface LessonType {
  id: number;
  title: string;
  videoUrl: string;
  documents: string[];
  tags: string[];
}

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
  const { courseId = '1' } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [courseLessons, setCourseLessons] = useState<LessonType[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const data = await getCourseLessons(parseInt(courseId));
        setCourseLessons(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCourseLessons([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonSelect = (lesson: LessonType) => {
    setCurrentLesson(lesson);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
                isActive={currentLesson?.id === lesson.id}
                onSelect={handleLessonSelect}
              />
            ))}
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="back-button"
          >
            {translations[language].backToCourses}
          </button>
        </div>
      </div>
      <div className="lesson-content">
        {currentLesson ? (
          <>
            <div className="video-container">
              <YoutubeEmbedder url={currentLesson.videoUrl} />
            </div>
            <div className="documents-section">
              <h3>{translations[language].courseDocuments}</h3>
              {currentLesson.documents.length > 0 ? (
                <ul>
                  {currentLesson.documents.map((doc: string, index: number) => (
                    <li key={index}>
                      <a href={`${API_BASE_URL}/api/documents/${doc}`} target="_blank" rel="noopener noreferrer">
                        {doc}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{translations[language].noDocuments}</p>
              )}
            </div>
          </>
        ) : (
          <div className="no-lesson-selected">
            <p>{translations[language].selectLesson}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
