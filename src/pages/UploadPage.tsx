import React from 'react';

interface UploadPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

const translations = {
  en: {
    title: "Upload Content",
    description: "Share your educational materials with the Babushka community."
  },
  ru: {
    title: "Загрузить Контент",
    description: "Поделитесь своими учебными материалами с сообществом Бабушки."
  },
  es: {
    title: "Subir Contenido",
    description: "Comparte tus materiales educativos con la comunidad Babushka."
  },
  fr: {
    title: "Télécharger du Contenu",
    description: "Partagez vos supports pédagogiques avec la communauté Babouchka."
  },
  uk: {
    title: "Завантажити Контент",
    description: "Поділіться своїми навчальними матеріалами зі спільнотою Бабусі."
  }
};

const UploadPage: React.FC<UploadPageProps> = ({ language }) => {
  return (
    <div className="upload-page">
      <h1>{translations[language].title}</h1>
      <p>{translations[language].description}</p>
    </div>
  );
};

export default UploadPage; 