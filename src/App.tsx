import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import "./styles/App.css"; // Ensure styles are in App.css

function App() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Welcome to Babushka Lessons!",
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // Handle submission when pressing Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && userMessage.trim() !== "") {
      setChatMessages((prevMessages) => [
        ...prevMessages, // Keep messages in order (new at the bottom)
        `You: ${userMessage}`,
      ]);
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
              placeholder="Type your response..."
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