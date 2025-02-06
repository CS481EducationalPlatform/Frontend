import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import AboutPage from "./pages/AboutPage";
import UploadPage from "./pages/UploadPage";
import "./styles/App.css";
import "./styles/Pages.css";

// Translation dictionary
const translations = {
  en: {
    welcome: "Welcome to Babushka Lessons!",
    typeResponse: "Type your response...",
    backToCourses: "Back to Courses",
    languageSelect: "Select Language",
    closeChat: "Close chat",
    toggleLanguageAriaLabel: "Select language",
    babushkaAlt: "Babushka Logo",
    english: "English",
    russian: "Russian",
    spanish: "Spanish",
    french: "French",
    ukrainian: "Ukrainian",
    about: "About",
    upload: "Upload"
  },
  ru: {
    welcome: "Добро пожаловать в Уроки Бабушки!",
    typeResponse: "Введите ваш ответ...",
    backToCourses: "Назад к курсам",
    languageSelect: "Выберите Язык",
    closeChat: "Закрыть чат",
    toggleLanguageAriaLabel: "Выберите язык",
    babushkaAlt: "Логотип Бабушки",
    english: "Английский",
    russian: "Русский",
    spanish: "Испанский",
    french: "Французский",
    ukrainian: "Украинский",
    about: "О нас",
    upload: "Загрузить"
  },
  es: {
    welcome: "¡Bienvenido a las Lecciones de Babushka!",
    typeResponse: "Escribe tu respuesta...",
    backToCourses: "Volver a los Cursos",
    languageSelect: "Seleccionar Idioma",
    closeChat: "Cerrar chat",
    toggleLanguageAriaLabel: "Seleccionar idioma",
    babushkaAlt: "Logo de Babushka",
    english: "Inglés",
    russian: "Ruso",
    spanish: "Español",
    french: "Francés",
    ukrainian: "Ucraniano",
    about: "Acerca de",
    upload: "Subir"
  },
  fr: {
    welcome: "Bienvenue aux Leçons de Babouchka !",
    typeResponse: "Écrivez votre réponse...",
    backToCourses: "Retour aux Cours",
    languageSelect: "Choisir la Langue",
    closeChat: "Fermer le chat",
    toggleLanguageAriaLabel: "Sélectionner la langue",
    babushkaAlt: "Logo de Babouchka",
    english: "Anglais",
    russian: "Russe",
    spanish: "Espagnol",
    french: "Français",
    ukrainian: "Ukrainien",
    about: "À propos",
    upload: "Télécharger"
  },
  uk: {
    welcome: "Ласкаво просимо до Уроків Бабусі!",
    typeResponse: "Введіть вашу відповідь...",
    backToCourses: "Назад до Курсів",
    languageSelect: "Вибрати Мову",
    closeChat: "Закрити чат",
    toggleLanguageAriaLabel: "Вибрати мову",
    babushkaAlt: "Логотип Бабусі",
    english: "Англійська",
    russian: "Російська",
    spanish: "Іспанська",
    french: "Французька",
    ukrainian: "Українська",
    about: "Про нас",
    upload: "Завантажити"
  }
};

// Babushka responses based on language
const babushkaResponses = {
  en: [
    "Ah, my sweet child! Just like my borscht, learning takes time to simmer!",
    "In my day, we had no fancy computers. But you, you are learning good!",
    "Reminds me of when I was young in old country. Keep going, малыш!",
    "*Adjusts headscarf* Yes, yes! You are getting stronger like bear!",
    "Babushka is proud! Here, have virtual пирожки for energy!",
    "Such wisdom you show! Like fresh potato from garden!",
    "*Pinches your cheek* So smart! You make Babushka's heart warm like fresh bread!",
    "In old country, we say: Knowledge is like good soup - better with time!"
  ],
  ru: [
    "Ах, мой сладкий! Как мой борщ, учение требует времени!",
    "В моё время компьютеров не было. Но ты хорошо учишься!",
    "Напоминает мне молодость в старой стране. Продолжай, малыш!",
    "*Поправляет платок* Да, да! Ты становишься сильным как медведь!",
    "Бабушка гордится! Держи виртуальные пирожки для энергии!",
    "Какая мудрость! Как свежая картошка с огорода!",
    "*Щипает за щёку* Такой умный! Греешь бабушкино сердце как свежий хлеб!",
    "В старой стране говорят: Знания как хороший суп - лучше со временем!"
  ],
  es: [
    "¡Ay, mi niño querido! ¡Como mi borscht, el aprendizaje necesita tiempo!",
    "En mis tiempos, no teníamos computadoras. ¡Pero tú estás aprendiendo bien!",
    "Me recuerda cuando era joven en mi país. ¡Sigue así, малыш!",
    "*Ajusta el pañuelo* ¡Sí, sí! ¡Te estás volviendo fuerte como un oso!",
    "¡Babushka está orgullosa! ¡Toma пирожки virtual para energía!",
    "¡Qué sabiduría muestras! ¡Como papa fresca del jardín!",
    "*Pellizca tu mejilla* ¡Tan inteligente! ¡Calientas el corazón de Babushka como pan fresco!",
    "En mi país decimos: ¡El conocimiento es como una buena sopa - mejor con tiempo!"
  ],
  fr: [
    "Ah, mon petit ! Comme mon bortsch, l'apprentissage prend du temps !",
    "De mon temps, nous n'avions pas d'ordinateurs. Mais toi, tu apprends bien !",
    "Ça me rappelle ma jeunesse au pays. Continue comme ça, малыш !",
    "*Ajuste son foulard* Oui, oui ! Tu deviens fort comme un ours !",
    "Babouchka est fière ! Tiens, prends des пирожки virtuels pour l'énergie !",
    "Quelle sagesse tu montres ! Comme une pomme de terre fraîche du jardin !",
    "*Pince ta joue* Si intelligent ! Tu réchauffes le cœur de Babouchka comme du pain frais !",
    "Dans mon pays, on dit : Le savoir est comme une bonne soupe - meilleur avec le temps !"
  ],
  uk: [
    "Ах, моя дитино! Як мій борщ, навчання потребує часу!",
    "У мій час комп'ютерів не було. Але ти добре вчишся!",
    "Нагадує мені молодість в рідному краю. Продовжуй, малятко!",
    "*Поправляє хустку* Так, так! Ти стаєш сильним як ведмідь!",
    "Бабуся пишається! Тримай віртуальні пиріжки для енергії!",
    "Яка мудрість! Як свіжа картопля з городу!",
    "*Щипає за щічку* Такий розумний! Грієш бабусине серце як свіжий хліб!",
    "У нашому краю кажуть: Знання як добрий суп - кращає з часом!"
  ]
};

// First, let's update the message mapping system to handle all languages
const createMessageMaps = () => {
  const maps: Record<string, Record<string, string>> = {};
  const languages = ['en', 'ru', 'es', 'fr', 'uk'] as const;

  // Create mappings between all language pairs
  languages.forEach(fromLang => {
    maps[fromLang] = {};
    languages.forEach(toLang => {
      if (fromLang !== toLang) {
        babushkaResponses[fromLang].forEach((msg, index) => {
          maps[fromLang][msg] = babushkaResponses[toLang][index];
        });
      }
    });
  });

  return maps;
};

// Create the message maps
const messageMaps = createMessageMaps();

function App() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [language, setLanguage] = useState<'en' | 'ru' | 'es' | 'fr' | 'uk'>('en');
  const [chatMessages, setChatMessages] = useState<string[]>([
    translations[language].welcome,
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Add state and refs for resize handling
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Toggle language handler
  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'en') return 'uk';
      if (prev === 'uk') return 'ru';
      if (prev === 'ru') return 'es';
      if (prev === 'es') return 'fr';
      return 'en';
    });
  };

  // Update welcome message and translate existing Babushka messages when language changes
  useEffect(() => {
    setChatMessages(prev => {
      return prev.map(msg => {
        // Keep user messages as they are
        if (msg.startsWith('You:')) {
          return msg;
        }

        // If it's a welcome message, show in current language
        if (Object.values(translations).map(t => t.welcome).includes(msg)) {
          return translations[language].welcome;
        }

        // If it's a Babushka message, translate to current language
        if (msg.startsWith('Babushka:')) {
          const content = msg.replace('Babushka: ', '');
          
          // Find which response index this message corresponds to
          let messageIndex = -1;
          for (const [lang, responses] of Object.entries(babushkaResponses)) {
            const index = responses.indexOf(content);
            if (index !== -1) {
              messageIndex = index;
              break;
            }
          }

          // If we found the message, return it in the current language
          if (messageIndex !== -1) {
            return `Babushka: ${babushkaResponses[language][messageIndex]}`;
          }
          
          // If we couldn't find the message, return it unchanged
          return msg;
        }

        return msg;
      });
    });
  }, [language]);

  useEffect(() => {
    // Show the chat after 1 second
    const showTimer = setTimeout(() => {
      setShowChat(true);
    }, 1000);

    return () => clearTimeout(showTimer);
  }, []);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  // Get random Babushka response
  const getBabushkaResponse = () => {
    const responses = babushkaResponses[language];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return `Babushka: ${responses[randomIndex]}`;
  };

  // Modified handle key down to include Babushka's response
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && userMessage.trim() !== "") {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        `You: ${userMessage}`,
      ]);
      
      // Add Babushka's response after a short delay
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          getBabushkaResponse()
        ]);
      }, 1000);

      setUserMessage(""); // Clear input field
    }
  };

  // Scroll to the latest message when chat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Scroll to bottom
    }
  }, [chatMessages]);

  // Add handler for closing chat
  const handleCloseChat = () => {
    setShowChat(false);
  };

  // Add resize handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only trigger if clicking near the top edge
    if (e.clientY <= (e.currentTarget as HTMLElement).getBoundingClientRect().top + 10) {
      setIsDragging(true);
      setStartY(e.clientY);
      setStartHeight(chatBoxRef.current?.offsetHeight || 0);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatBoxRef.current) {
      const deltaY = startY - e.clientY;
      const newHeight = Math.min(
        Math.max(startHeight + deltaY, 100), // min height
        window.innerHeight - 200 // max height
      );
      chatBoxRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, startHeight]);

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/" className="nav-brand">
            <img src="/babushka.png" alt={translations[language].babushkaAlt} className="nav-logo" />
            <span>Babushka Lessons</span>
          </Link>
          <div className="nav-items">
            <Link to="/upload" className="nav-link">{translations[language].upload}</Link>
            <Link to="/about" className="nav-link">{translations[language].about}</Link>
            <select 
              className="language-select" 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ru' | 'es' | 'fr' | 'uk')}
              aria-label={translations[language].toggleLanguageAriaLabel}
            >
              <option value="en">{translations[language].english}</option>
              <option value="uk">{translations[language].ukrainian}</option>
              <option value="ru">{translations[language].russian}</option>
              <option value="es">{translations[language].spanish}</option>
              <option value="fr">{translations[language].french}</option>
            </select>
          </div>
        </nav>

        {/* Babushka Image Now in Bottom Right */}
        <img src="/babushka.png" alt={translations[language].babushkaAlt} className="bottom-right-image" />

        {/* Chat Box */}
        {showChat && (
          <div className="chat-container">
            <button 
              className="chat-close" 
              onClick={handleCloseChat}
              aria-label={translations[language].closeChat}
            >
              ×
            </button>
            <div 
              ref={chatBoxRef}
              className="chat-box"
              onMouseDown={handleMouseDown}
            >
              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message">
                  {msg}
                </div>
              ))}
            </div>
            <input
              type="text"
              className="chat-input"
              placeholder={translations[language].typeResponse}
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<CoursePage language={language} />} />
          <Route path="/course/:courseId" element={<LessonPage language={language} />} />
          <Route path="/about" element={<AboutPage language={language} />} />
          <Route path="/upload" element={<UploadPage language={language} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;