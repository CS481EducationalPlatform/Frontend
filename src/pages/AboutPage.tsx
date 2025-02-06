import React from 'react';

interface AboutPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

const translations = {
  en: {
    title: "About Babushka Lessons",
    description: "Welcome to Babushka Lessons, where traditional wisdom meets modern education."
  },
  ru: {
    title: "О Бабушкиных Уроках",
    description: "Добро пожаловать в Бабушкины Уроки, где традиционная мудрость встречается с современным образованием."
  },
  es: {
    title: "Sobre Lecciones de Babushka",
    description: "Bienvenido a Lecciones de Babushka, donde la sabiduría tradicional se une a la educación moderna."
  },
  fr: {
    title: "À propos des Leçons de Babouchka",
    description: "Bienvenue aux Leçons de Babouchka, où la sagesse traditionnelle rencontre l'éducation moderne."
  },
  uk: {
    title: "Про Бабусині Уроки",
    description: "Ласкаво просимо до Бабусиних Уроків, де традиційна мудрість зустрічається з сучасною освітою."
  }
};

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  return (
    <div className="about-page">
      <h1>{translations[language].title}</h1>
      <p>{translations[language].description}</p>
    </div>
  );
};

export default AboutPage; 