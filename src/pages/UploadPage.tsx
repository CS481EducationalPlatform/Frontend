import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DragDropVideo } from "../components/DragDropVideo";
import DragDropFiles from "../components/DragDropFiles";
import { UploadVideoI, uploadYTvideo, LinkVideoI, linkYTvideo } from "../services/uploadService";
import GoogleLoginComponent from '../components/GoogleLoginComponent';
import "../styles/UploadPage.css";

interface UploadPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

interface Document {
  name: string;
  url: string;
  file: File;
}

const translations = {
  en: {
    title: "Upload Content",
    description: "Share your educational materials with the Babushka community.",
    lessonTitle: "Lesson Title",
    video: "Video File", 
    thumbnailImage: "Thumbnail Image",
    upload: "Upload Lesson",
    titleRequired: "Title is required",
    videoRequired: "Video file is required",
    thumbnailRequired: "Thumbnail image is required",
    addFiles: "Add Supporting Files",
    previewVideo: "Video Preview",
    createNewLesson: "Create New Lesson",
    uploadVideo: "Upload Video",
    uploadDocuments: "Upload Supporting Documents",
    uploadedDocuments: "Uploaded Documents",
    uploading: "Uploading...",
    cancel: "Cancel"
  },
  ru: {
    title: "Загрузить Контент",
    description: "Поделитесь своими учебными материалами с сообществом Бабушки.",
    lessonTitle: "Название Урока",
    video: "Видео Файл",
    thumbnailImage: "Изображение Эскиза", 
    upload: "Загрузить Урок",
    titleRequired: "Требуется название",
    videoRequired: "Требуется видео файл",
    thumbnailRequired: "Требуется изображение эскиза",
    addFiles: "Добавить Файлы",
    previewVideo: "Предварительный Просмотр",
    createNewLesson: "Создать Новый Урок",
    uploadVideo: "Загрузить Видео",
    uploadDocuments: "Загрузить Дополнительные Документы",
    uploadedDocuments: "Загруженные Документы",
    uploading: "Загрузка...",
    cancel: "Отмена"
  },
  es: {
    title: "Subir Contenido",
    description: "Comparte tus materiales educativos con la comunidad Babushka.",
    lessonTitle: "Título de la Lección",
    video: "Archivo de Video",
    thumbnailImage: "Imagen en Miniatura",
    upload: "Subir Lección", 
    titleRequired: "Se requiere título",
    videoRequired: "Se requiere archivo de video",
    thumbnailRequired: "Se requiere imagen en miniatura",
    addFiles: "Agregar Archivos",
    previewVideo: "Vista Previa",
    createNewLesson: "Crear Nueva Lección",
    uploadVideo: "Subir Video",
    uploadDocuments: "Subir Documentos de Apoyo",
    uploadedDocuments: "Documentos Subidos",
    uploading: "Subiendo...",
    cancel: "Cancelar"
  },
  fr: {
    title: "Télécharger du Contenu",
    description: "Partagez vos supports pédagogiques avec la communauté Babouchka.",
    lessonTitle: "Titre de la Leçon",
    video: "Fichier Vidéo",
    thumbnailImage: "Image Miniature",
    upload: "Télécharger la Leçon",
    titleRequired: "Le titre est requis",
    videoRequired: "Le fichier vidéo est requis", 
    thumbnailRequired: "L'image miniature est requise",
    addFiles: "Ajouter des Fichiers",
    previewVideo: "Aperçu Vidéo",
    createNewLesson: "Créer une Nouvelle Leçon",
    uploadVideo: "Télécharger Vidéo",
    uploadDocuments: "Télécharger Documents de Support",
    uploadedDocuments: "Documents Téléchargés",
    uploading: "Téléchargement en cours...",
    cancel: "Annuler"
  },
  uk: {
    title: "Завантажити Контент",
    description: "Поділіться своїми навчальними матеріалами зі спільнотою Бабусі.",
    lessonTitle: "Назва Уроку",
    video: "Відео Файл",
    thumbnailImage: "Зображення Мініатюри",
    upload: "Завантажити Урок",
    titleRequired: "Потрібна назва",
    videoRequired: "Потрібен відео файл",
    thumbnailRequired: "Потрібне зображення мініатюри",
    addFiles: "Додати Файли",
    previewVideo: "Попередній Перегляд",
    createNewLesson: "Створити Новий Урок",
    uploadVideo: "Завантажити Відео",
    uploadDocuments: "Завантажити Документи Підтримки",
    uploadedDocuments: "Завантажені Документи",
    uploading: "Завантаження...",
    cancel: "Скасувати"
  }
};

const UploadPage: React.FC<UploadPageProps> = ({ language = 'en' }) => {
  const navigate = useNavigate();
  
  // Document management
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Video management
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    video: false
  });

  // YouTube integration
  const [videoInfo, setVideoInfo] = useState<UploadVideoI>({
    title: "",
    description: "",
    lesson_id: "1",
    accessToken: "",
  });
  const [linkInfo, setLinkInfo] = useState<LinkVideoI>({
    lesson_id: "1",
    video_url: ""
  });

  // OAuth handling
  const handleOauthChanged = (value: boolean) => {
    if(value){
      const token = localStorage.getItem("access_token");
      if(token){
        setVideoInfo({...videoInfo, accessToken: token});
      }
    }
  };

  // File handling functions
  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
  };

  const handleDocumentUpload = (file: File) => {
    setDocuments(prevDocs => [...prevDocs, {
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }]);
  };

  // Submit functions
  const handleYoutubeUpload = async () => {
    if (!videoFile) return alert("Please select a video file");
    if (!videoInfo.accessToken) return alert("Please sign in first");
    if (!title.trim()) {
      setErrors({...errors, title: true});
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Update videoInfo with title
      const updatedVideoInfo = {
        ...videoInfo,
        title: title,
        description: videoInfo.description || `Lesson: ${title}`
      };
      
      await uploadYTvideo(updatedVideoInfo, videoFile);
      alert("Upload successful! Your video is being processed on YouTube.");
      navigate("/");
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinking = async () => {
    if(!linkInfo.video_url) return alert("Please provide a link");
    
    setIsSubmitting(true);
    try {
      await linkYTvideo(linkInfo);
      alert("Link successful!");
      navigate("/");
    } catch (error) {
      alert("Linking failed. Please check the URL and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load access token on component mount
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token && access_token !== ""){
      setVideoInfo({...videoInfo, accessToken: access_token});
    }
  }, []);

  return (
    <div className="page-container">
      <div className="lesson-upload">
        <h2>{translations[language].createNewLesson}</h2>
        <p>{translations[language].description}</p>
        
        <div className="upload-sections-container">
          {/* Video Upload Section */}
          <div className="upload-section">
            <h3>{translations[language].uploadVideo}</h3>
            <DragDropVideo onFileUploaded={handleVideoUpload} />
            
            {videoPreview && (
              <div className="video-preview">
                <h4>{translations[language].previewVideo}</h4>
                <video 
                  src={videoPreview} 
                  controls 
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "300px",
                    width: "auto",
                    height: "auto"
                  }} 
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="title">{translations[language].lessonTitle}</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{translations[language].titleRequired}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={videoInfo.description}
                onChange={(e) => setVideoInfo({...videoInfo, description: e.target.value})}
                placeholder="Description"
              />
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="upload-section">
            <h3>{translations[language].uploadDocuments}</h3>
            <DragDropFiles onFileUploaded={handleDocumentUpload} />
            
            {documents.length > 0 && (
              <div className="documents-preview">
                <h4>{translations[language].uploadedDocuments}</h4>
                <ul>
                  {documents.map((doc, index) => (
                    <li key={index}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* YouTube Link Section */}
            <div className="form-group" style={{marginTop: '20px'}}>
              <label htmlFor="video-link">Or Link Existing YouTube Video</label>
              <input
                type="text"
                id="video-link"
                value={linkInfo.video_url}
                onChange={(e) => setLinkInfo({...linkInfo, video_url: e.target.value})}
                placeholder="YouTube URL"
              />
              <button 
                className="link-button"
                onClick={handleLinking}
                disabled={isSubmitting || !linkInfo.video_url}
              >
                Link Video
              </button>
            </div>
          </div>
        </div>
        
        {/* Google Login Section */}
        {!videoInfo.accessToken && (
          <div className="google-login-section">
            <h3>Connect with YouTube</h3>
            <p>To upload videos directly to YouTube, please sign in with your Google account</p>
            <GoogleLoginComponent onOauth={handleOauthChanged} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-container">
          <button 
            className="submit-button"
            onClick={handleYoutubeUpload}
            disabled={isSubmitting || !videoFile || !videoInfo.accessToken}
          >
            {isSubmitting ? translations[language].uploading : translations[language].upload}
          </button>
          
          <button 
            className="cancel-button"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
          >
            {translations[language].cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;