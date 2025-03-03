import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/LessonPage.css";
import { getCourseLessons } from "../services/courseService";
import type { Lesson as APILesson } from "../services/lessonService";

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
    noDocuments: "No documents available",
    noVideo: "No video available"
  },
  ru: {
    courseLessons: "Уроки Курса",
    backToCourses: "Назад к Курсам",
    selectLesson: "Выберите урок для просмотра",
    courseDocuments: "Документы Курса",
    noDocuments: "Документы недоступны",
    noVideo: "Видео недоступно"
  },
  es: {
    courseLessons: "Lecciones del Curso",
    backToCourses: "Volver a los Cursos",
    selectLesson: "Selecciona una lección para ver su contenido",
    courseDocuments: "Documentos del Curso",
    noDocuments: "No hay documentos disponibles",
    noVideo: "No hay video disponible"
  },
  fr: {
    courseLessons: "Leçons du Cours",
    backToCourses: "Retour aux Cours",
    selectLesson: "Sélectionnez une leçon pour voir son contenu",
    courseDocuments: "Documents du Cours",
    noDocuments: "Aucun document disponible",
    noVideo: "Aucune vidéo disponible"
  },
  uk: {
    courseLessons: "Уроки Курсу",
    backToCourses: "Назад до Курсів",
    selectLesson: "Виберіть урок для перегляду",
    courseDocuments: "Документи Курсу",
    noDocuments: "Документи недоступні",
    noVideo: "Відео недоступне"
  }
};

interface LessonPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

// Convert API lesson to UI lesson type
const convertAPILesson = (apiLesson: APILesson): LessonType => {
  const videoUpload = apiLesson.uploads?.find(upload => upload.videoURL);
  const documentUploads = apiLesson.uploads?.filter(upload => upload.fileBlob) || [];
  
  return {
    id: apiLesson.lessonID || 0,
    title: `${apiLesson.lessonName}${apiLesson.lessonDescription ? ` - ${apiLesson.lessonDescription}` : ''}`,
    videoUrl: videoUpload?.videoURL || '',
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
          <button onClick={() => navigate('/')} className="back-button">
            {translations[language].backToCourses}
          </button>
        </div>
      </div>
      <div className="lesson-content">
        {currentLesson ? (
          <>
            <div className="video-container">
              {currentLesson.videoUrl ? (
                <YoutubeEmbedder url={currentLesson.videoUrl} />
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
