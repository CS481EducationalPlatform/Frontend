import React, { useState } from 'react';

interface UploadPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
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
    thumbnailRequired: "Thumbnail image is required"
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
    thumbnailRequired: "Требуется изображение эскиза"
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
    thumbnailRequired: "Se requiere imagen en miniatura"
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
    thumbnailRequired: "L'image miniature est requise"
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
    thumbnailRequired: "Потрібне зображення мініатюри"
  }
};

const UploadPage: React.FC<UploadPageProps> = ({ language }) => {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    video: false,
    thumbnail: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      title: !title,
      video: !video,
      thumbnail: !thumbnail
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.video && !newErrors.thumbnail) {
      // Handle form submission here
      console.log({ title, video, thumbnail });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <div className="upload-page">
      <h1>{translations[language].title}</h1>
      <p>{translations[language].description}</p>
      
      <form onSubmit={handleSubmit} className="upload-form">
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
          <label htmlFor="video">{translations[language].video}</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
            className={errors.video ? 'error' : ''}
          />
          {errors.video && <span className="error-message">{translations[language].videoRequired}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">{translations[language].thumbnailImage}</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className={errors.thumbnail ? 'error' : ''}
          />
          {errors.thumbnail && <span className="error-message">{translations[language].thumbnailRequired}</span>}
        </div>

        <button type="submit" className="upload-button">
          {translations[language].upload}
        </button>
      </form>
    </div>
  );
};

export default UploadPage;