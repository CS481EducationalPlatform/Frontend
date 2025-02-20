import React, { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import { UploadVideoI, uploadYTvideo } from "../services/uploadService";
import Grid from "@mui/material/Grid2";

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
    thumbnailRequired: "Thumbnail image is required",
    addFiles: "Add Supporting Files",
    previewVideo: "Video Preview"
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
    previewVideo: "Предварительный Просмотр"
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
    previewVideo: "Vista Previa"
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
    previewVideo: "Aperçu Vidéo"
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
    previewVideo: "Попередній Перегляд"
  }
};

const UploadPage: React.FC<UploadPageProps> = ({ language }) => {
  //Kellen
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState({
    title: false,
    video: false,
    thumbnail: false
  });

  //Jace
  const [file, setFile] = useState<File | null>(null);
  const [videoInfo, setVideoInfo] = useState<UploadVideoI>({
    title: "",
    description: "",
    user_id: "1",
    course_id: "1",
    page_id: "1",
    accessToken: ""
  })

  //CHANGE to being pulled from database securely
  const CLIENT_ID = "178516670715-5l32e4c5lanhgvn8iv7sa7r23l57o2qq.apps.googleusercontent.com";

  useEffect(() => {
    // Initialize the Google API client
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/youtube.upload",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleSignIn = async () => {
    const authInstance = gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();
    const token = user.getAuthResponse().access_token;
    setVideoInfo({...videoInfo, accessToken: token});
    alert("Successfully signed in");
  };

  const handleUpload = async () => {
    console.log(1);
    if (!file) return alert("Please select a file");
    if (!videoInfo.accessToken) return alert("Please sign in first");

    alert("Beginning Upload");
    console.log(2);
    try {
      await uploadYTvideo(videoInfo, file);
      console.log(3);
      alert("Database Success : Uploading to YouTube");
    } catch (error) {
      alert("Upload Failed")
    }
  };

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
      console.log({ title, video, thumbnail, supportingFiles });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(file);
      
      // Create preview URL for video
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSupportingFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSupportingFiles(prev => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="upload-page" style={{alignItems:'center'}}>
      <h1>{translations[language].title}</h1>
      <p>{translations[language].description}</p>
      
      {/*<form onSubmit={handleSubmit} className="upload-form">
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

        {videoPreview && (
          <div className="video-preview">
            <h3>{translations[language].previewVideo}</h3>
            <video 
              controls 
              src={videoPreview}
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          </div>
        )}

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

        <div className="form-group">
          <label htmlFor="supporting-files">{translations[language].addFiles}</label>
          <input
            type="file"
            id="supporting-files"
            multiple
            onChange={handleSupportingFilesChange}
          />
          {supportingFiles.length > 0 && (
            <ul className="files-list">
              {supportingFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="upload-button">
          {translations[language].upload}
        </button>
      </form>
      */}

        {/* JACE */}
        <Grid direction="column" spacing={0} alignItems="center" container sx={{width:'250px'}}>
        {!videoInfo.accessToken && (
          <button onClick={handleSignIn} style={{height:'100px', width:'200px', borderRadius:'8px', border:'0px solid black'}}>Sign in with Google</button>
        )}
        <div style={{paddingLeft:'25px', }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{fontSize:'16px', width:'100%', height:'100px', border:'0px solid black',borderRadius:'8px', alignContent:'center'}}
          />
        </div>
        <input
          type="text"
          value={videoInfo.title}
          onChange={(e) => setVideoInfo({...videoInfo, title: e.target.value})}
          placeholder="Title"
          style={{height:'30px', width:'200px', borderRadius:'8px', border:'0px solid black'}}
        />
        <textarea
          value={videoInfo.description}
          style={{height:'100px', width:'200px', borderRadius:'8px', border:'0px solid black'}}
          onChange={(e) => setVideoInfo({...videoInfo, description: e.target.value})}
          placeholder="Description"
        />
        <button onClick={handleUpload} style={{height:'30px', width:'200px', borderRadius:'8px', border:'0px solid black'}}>Upload</button>
      </Grid>

    </div>
  );
};

export default UploadPage;