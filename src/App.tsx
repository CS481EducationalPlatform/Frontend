import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import "./styles/App.css"; // Ensure styles are in App.css

// Translation dictionary
const translations = {
  en: {
    welcome: "Welcome to Babushka Lessons!",
    typeResponse: "Type your response...",
    backToCourses: "Back to Courses",
    toggleLanguage: "РУС",
  },
  ru: {
    welcome: "Добро пожаловать в Уроки Бабушки!",
    typeResponse: "Введите ваш ответ...",
    backToCourses: "Назад к курсам",
    toggleLanguage: "ENG",
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
  ]
};

function App() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [chatMessages, setChatMessages] = useState<string[]>([
    translations[language].welcome,
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Toggle language handler
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  // Update welcome message when language changes
  useEffect(() => {
    setChatMessages(prev => [
      translations[language].welcome,
      ...prev.slice(1)
    ]);
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

  return (
    <Router>
      <div className="App">
        {/* Language Toggle Button */}
        <button 
          className="language-toggle" 
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          {translations[language].toggleLanguage}
        </button>

        {/* Babushka Image Now in Bottom Right */}
        <img src="/babushka.png" alt="Logo" className="bottom-right-image" />

        {/* Chat Box Now Positioned to the Right Side */}
        {showChat && (
          <div className="chat-container">
            <button 
              className="chat-close" 
              onClick={handleCloseChat}
              aria-label="Close chat"
            >
              ×
            </button>
            <div className="chat-box" ref={chatContainerRef}>
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
          <Route path="/" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<LessonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;