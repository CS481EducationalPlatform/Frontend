import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import AboutPage from "./pages/AboutPage";
import UploadPage from "./pages/UploadPage";
import "./styles/App.css";
import "./styles/Pages.css";
import OpenAI from 'openai';

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
    upload: "Upload",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
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
    upload: "Загрузить",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
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
    upload: "Subir",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
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
    upload: "Télécharger",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
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
    upload: "Завантажити",
    darkMode: "Темний режим",
    lightMode: "Світлий режим",
  }
};

// Type for chat message
interface ChatMessage {
  text: string;
  sender: 'user' | 'babushka';
}

// Educational topics we can recognize and respond to
const educationalTopics = {
  algorithms: ['algorithm', 'sort', 'search', 'complexity'],
  dataStructures: ['array', 'list', 'tree', 'graph', 'stack', 'queue'],
  programming: ['code', 'program', 'function', 'variable', 'class'],
  webDev: ['html', 'css', 'javascript', 'react', 'web'],
  database: ['sql', 'database', 'query', 'table', 'join'],
  general: ['help', 'learn', 'study', 'understand', 'explain']
};

// Helper function to detect topics in user message
const detectTopics = (message: string): string[] => {
  const lowercaseMsg = message.toLowerCase();
  return Object.entries(educationalTopics)
    .filter(([_, keywords]) => 
      keywords.some(keyword => lowercaseMsg.includes(keyword)))
    .map(([topic]) => topic);
};

// Add this type for language-specific prompts
interface LanguagePrompt {
  system: string;
  default: string;
}

// Add language-specific system prompts
const systemPrompts: Record<string, LanguagePrompt> = {
  en: {
    system: "You are Babushka, wise programming teacher. Speak in short proverbs and folk wisdom. 'As potato needs soil, code needs structure.' Give brief, memorable lessons.",
    default: "What wisdom do you seek, young coder?"
  },
  ru: {
    system: "Вы Бабушка, мудрый учитель программирования. Говорите короткими пословицами. 'Как картошке нужна земля, так коду нужна структура.' Давайте краткие, запоминающиеся уроки.",
    default: "Какой мудрости ищешь, молодой программист?"
  },
  es: {
    system: "Eres Babushka, sabia maestra de programación. Habla en proverbios cortos. 'Como la papa necesita tierra, el código necesita estructura.' Da lecciones breves y memorables.",
    default: "¿Qué sabiduría buscas, joven programador?"
  },
  fr: {
    system: "Vous êtes Babushka, sage professeure de programmation. Parlez en proverbes courts. 'Comme la pomme de terre a besoin de terre, le code a besoin de structure.' Donnez des leçons brèves et mémorables.",
    default: "Quelle sagesse cherches-tu, jeune codeur ?"
  },
  uk: {
    system: "Ви Бабуся, мудрий вчитель програмування. Говоріть короткими приказками. 'Як картоплі потрібна земля, так коду потрібна структура.' Давайте стислі, пам'ятні уроки.",
    default: "Якої мудрості шукаєш, молодий програміст?"
  }
};

// Keep interfaces and constants outside
interface ChatHistoryMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

//Simple variable to catch failure
let AI = false;
try {
  // Initialize OpenAI client outside
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  AI = true;
} catch (error){
  AI = false;
}

function App() {
  // Define language state first
  const [language, setLanguage] = useState<'en' | 'ru' | 'es' | 'fr' | 'uk'>('en');
  
  // Then use it in other state initializations
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    {
      role: 'system',
      content: systemPrompts[language].system
    }
  ]);

  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: translations[language].welcome, sender: 'babushka' }
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Add state and refs for resize handling
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Add dark mode to translations
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

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

  // Toggle dark mode handler
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Update useEffect for language changes
  useEffect(() => {
    // Update system message in chat history when language changes
    setMessages(prev => [
      {
        role: 'system',
        content: systemPrompts[language].system
      },
      ...prev.slice(1) // Keep all messages except the first system message
    ]);
  }, [language]);

  // Effect to handle theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Show the chat after 1 second
    const showTimer = setTimeout(() => {
      setShowChat(true);
    }, 1000);

    return () => clearTimeout(showTimer);
  }, []);

  const generateResponse = async (userInput: string) => {
    try {
      // Immediately update chat with user input
      setChatMessages(prev => [
        ...prev,
        { text: userInput, sender: 'user' },
        { text: "typing...", sender: 'babushka' }
      ]);
  
      // Prepare chat history for OpenAI API
      const updatedMessages = [
        ...messages,
        { role: 'user', content: userInput }
      ];
  
      setMessages(updatedMessages); // Keep state in sync
  
      // Call OpenAI API and WAIT for the response
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Use a model you have access to
        messages: updatedMessages,
        temperature: 0.7,
        max_tokens: 250
      });
  
      // Extract and validate response
      const response = completion?.choices?.[0]?.message?.content?.trim();
      
      if (!response) {
        throw new Error("No response received from OpenAI");
      }
  
      // Replace "typing..." with the real response
      setChatMessages(prev => [
        ...prev.slice(0, -1),
        { text: response, sender: 'babushka' }
      ]);
  
      // Save assistant response to chat history
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response }
      ]);
  
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [
        ...prev.slice(0, -1),
        { text: "Sorry, I couldn't process that. Try again!", sender: 'babushka' }
      ]);
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

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && userMessage.trim() !== "") {
      const input = userMessage.trim();
      setUserMessage(""); // Clear input field immediately
  
      // Wait for response before updating chat
      await generateResponse(input);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
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
            <button 
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? translations[language].lightMode : translations[language].darkMode}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
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
        {showChat && AI && (
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
                <div 
                  key={index} 
                  className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'babushka-message'}`}
                >
                  {msg.text}
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