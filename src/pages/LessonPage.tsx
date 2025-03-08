import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/LessonPage.css";
import { getCourseLessons } from "../services/courseService";
import type { Lesson as APILesson } from "../services/lessonService";

const API_BASE_URL = process.env.REACT_APP_PLACEMENT == "Local" ? "https://localhost:5173" :"https://backend-4yko.onrender.com";

interface LessonType {
  id: number;
  title: string;
  videoUrls: string[];
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
    noDocuments: "No documents available",
    noVideo: "No video available",
    noLessons: "This course has no lessons yet"
  },
  ru: {
    courseLessons: "Уроки Курса",
    backToCourses: "Назад к Курсам",
    selectLesson: "Выберите урок для просмотра",
    courseDocuments: "Документы Курса",
    noDocuments: "Документы недоступны",
    noVideo: "Видео недоступно",
    noLessons: "В этом курсе пока нет уроков"
  },
  es: {
    courseLessons: "Lecciones del Curso",
    backToCourses: "Volver a los Cursos",
    selectLesson: "Selecciona una lección para ver su contenido",
    courseDocuments: "Documentos del Curso",
    noDocuments: "No hay documentos disponibles",
    noVideo: "No hay video disponible",
    noLessons: "Este curso aún no tiene lecciones"
  },
  fr: {
    courseLessons: "Leçons du Cours",
    backToCourses: "Retour aux Cours",
    selectLesson: "Sélectionnez une leçon pour voir son contenu",
    courseDocuments: "Documents du Cours",
    noDocuments: "Aucun document disponible",
    noVideo: "Aucune vidéo disponible",
    noLessons: "Ce cours n'a pas encore de leçons"
  },
  uk: {
    courseLessons: "Уроки Курсу",
    backToCourses: "Назад до Курсів",
    selectLesson: "Виберіть урок для перегляду",
    courseDocuments: "Документи Курсу",
    noDocuments: "Документи недоступні",
    noVideo: "Відео недоступне",
    noLessons: "У цьому курсі ще немає уроків"
  }
};

interface LessonPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

// Convert API lesson to UI lesson type
const convertAPILesson = (apiLesson: APILesson): LessonType => {
  const videoUploads = apiLesson.uploads?.filter(upload => upload.videoURL) || [];
  const documentUploads = apiLesson.uploads?.filter(upload => upload.fileBlob) || [];
  
  return {
    id: apiLesson.lessonID || 0,
    title: `${apiLesson.lessonName}${apiLesson.lessonDescription ? ` - ${apiLesson.lessonDescription}` : ''}`,
    videoUrls: videoUploads.map(upload => upload.videoURL || ''),
    documents: documentUploads.map(doc => `${doc.fileID}`),
    tags: apiLesson.tags || []
  };
};

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
        const convertedLessons = data.map(convertAPILesson);
        setCourseLessons(convertedLessons);
        setError(null);
      } catch (err) {
        // Check if it's a 404 error
        if (err instanceof Error && err.message.includes('404')) {
          setError(translations[language].noLessons);
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
        setCourseLessons([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [courseId, language]);

  const handleLessonSelect = (lesson: LessonType) => {
    // Find the full lesson data to set as current
    const fullLesson = courseLessons.find(l => l.id === lesson.id);
    if (fullLesson) {
      setCurrentLesson(fullLesson);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="lesson-page">
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button onClick={() => navigate('/')} className="back-button">
            {translations[language].backToCourses}
          </button>
        </div>
      </div>
    );
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
          <button onClick={() => navigate('/')} className="back-button">
            {translations[language].backToCourses}
          </button>
        </div>
      </div>
      <div className="lesson-content">
        {currentLesson ? (
          <>
            <h1 className="lesson-title-header">{currentLesson?.title || ''}</h1>
            <div className="videos-container">
              {currentLesson.videoUrls.length > 0 ? (
                currentLesson.videoUrls.map((url, index) => (
                  <div key={index} className="video-container">
                    <YoutubeEmbedder url={url} videoIndex={index + 1} />
                  </div>
                ))
              ) : (
                <p>{translations[language].noVideo}</p>
              )}
            </div>
            <div className="documents-section">
              <h3>{translations[language].courseDocuments}</h3>
              {currentLesson.documents.length > 0 ? (
                <ul>
                  {currentLesson.documents.map((docId: string, index: number) => (
                    <li key={index}>
                      <a href={`${API_BASE_URL}/api/documents/${docId}`} target="_blank" rel="noopener noreferrer">
                        Document {index + 1}
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
