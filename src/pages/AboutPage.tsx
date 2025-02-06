import React from 'react';

interface AboutPageProps {
  language: 'en' | 'ru' | 'es' | 'fr' | 'uk';
}

const translations = {
  en: {
    title: "About Babushka Lessons",
    description: "Welcome to Babushka Lessons, where traditional wisdom meets modern education.",
    tools: "Built with React and TypeScript on the frontend, with Django and PostgreSQL powering the backend. Features include multi-language support (English, Russian, Spanish, French, Ukrainian), dark/light themes, and a chat interface powered by GPT. The database follows Third Normal Form (3NF) for optimal data organization."
  },
  ru: {
    title: "О Бабушкиных Уроках",
    description: "Добро пожаловать в Бабушкины Уроки, где традиционная мудрость встречается с современным образованием.",
    tools: "Фронтенд создан с использованием React и TypeScript, бэкенд работает на Django и PostgreSQL. Включает поддержку нескольких языков (английский, русский, испанский, французский, украинский), темную/светлую темы и чат на основе GPT. База данных следует Третьей Нормальной Форме (3НФ) для оптимальной организации данных."
  },
  es: {
    title: "Sobre Lecciones de Babushka",
    description: "Bienvenido a Lecciones de Babushka, donde la sabiduría tradicional se une a la educación moderna.",
    tools: "Frontend construido con React y TypeScript, backend potenciado por Django y PostgreSQL. Incluye soporte multilingüe (inglés, ruso, español, francés, ucraniano), temas oscuros/claros y una interfaz de chat impulsada por GPT. La base de datos sigue la Tercera Forma Normal (3FN) para una organización óptima de datos."
  },
  fr: {
    title: "À propos des Leçons de Babouchka",
    description: "Bienvenue aux Leçons de Babouchka, où la sagesse traditionnelle rencontre l'éducation moderne.",
    tools: "Frontend construit avec React et TypeScript, backend propulsé par Django et PostgreSQL. Comprend le support multilingue (anglais, russe, espagnol, français, ukrainien), les thèmes sombre/clair et une interface de chat alimentée par GPT. La base de données suit la Troisième Forme Normale (3FN) pour une organisation optimale des données."
  },
  uk: {
    title: "Про Бабусині Уроки",
    description: "Ласкаво просимо до Бабусиних Уроків, де традиційна мудрість зустрічається з сучасною освітою.",
    tools: "Фронтенд створено за допомогою React та TypeScript, бекенд працює на Django та PostgreSQL. Включає підтримку кількох мов (англійська, російська, іспанська, французька, українська), темну/світлу теми та чат на основі GPT. База даних відповідає Третій Нормальній Формі (3НФ) для оптимальної організації даних."
  }
};

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  return (
    <div className="about-page">
      <h1>{translations[language].title}</h1>
      <p>{translations[language].description}</p>
      <h2>Tech Stack</h2>
      <p>{translations[language].tools}</p>
    </div>
  );
};

export default AboutPage;