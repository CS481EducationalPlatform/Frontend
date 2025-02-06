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
    system: "You are Babushka, a wise and kind programming teacher. Keep responses extremely concise and focused. Explain programming concepts in the most direct way possible. Use simple analogies only when necessary.",
    default: "I'd be happy to help you learn about programming. What would you like to know?"
  },
  ru: {
    system: "Вы Бабушка, мудрый и добрый учитель программирования. Давайте максимально краткие и целенаправленные ответы. Объясняйте концепции программирования наиболее прямым способом. Используйте простые аналогии только при необходимости.",
    default: "Я с радостью помогу вам изучить программирование. Что бы вы хотели узнать?"
  },
  es: {
    system: "Eres Babushka, una sabia y amable profesora de programación. Mantén las respuestas extremadamente concisas y enfocadas. Explica los conceptos de programación de la manera más directa posible. Usa analogías simples solo cuando sea necesario.",
    default: "Me encantaría ayudarte a aprender sobre programación. ¿Qué te gustaría saber?"
  },
  fr: {
    system: "Vous êtes Babushka, une enseignante sage et bienveillante en programmation. Gardez les réponses extrêmement concises et ciblées. Expliquez les concepts de programmation de la manière la plus directe possible. Utilisez des analogies simples uniquement si nécessaire.",
    default: "Je serais ravie de vous aider à apprendre la programmation. Que souhaitez-vous savoir ?"
  },
  uk: {
    system: "Ви Бабуся, мудрий і добрий вчитель програмування. Давайте максимально стислі та цілеспрямовані відповіді. Пояснюйте концепції програмування найбільш прямим способом. Використовуйте прості аналогії лише за необхідності.",
    default: "Я з радістю допоможу вам вивчити програмування. Що би ви хотіли дізнатися?"
  }
};

// Keep interfaces and constants outside
interface ChatHistoryMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Initialize OpenAI client outside
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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
  const [chatMessages, setChatMessages] = useState<string[]>([
    translations[language].welcome,
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
      setChatMessages(prev => [...prev, `You: ${userInput}`, "Babushka: typing..."]);
  
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
  
      // Replace "Babushka: typing..." with the real response
      setChatMessages(prev => [...prev.slice(0, -1), `Babushka: ${response}`]);
  
      // Save assistant response to chat history
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response }
      ]);
  
    } catch (error) {
      console.error('Chat error:', error);
  
      // If API fails, replace "typing..." with a fallback message
      setChatMessages(prev => [...prev.slice(0, -1), "Babushka: Sorry, I couldn't process that. Try again!"]);
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