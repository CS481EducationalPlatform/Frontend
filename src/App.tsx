import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import "./styles/App.css";

function App() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show the chat bubble after 1 second
    const showTimer = setTimeout(() => {
      setShowText(true);

      // Hide the chat bubble after 30 seconds
      const hideTimer = setTimeout(() => {
        setShowText(false);
      }, 30000); // 30 seconds

      return () => clearTimeout(hideTimer);
    }, 1000); // 1 second delay

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Babushka Image at Bottom Left */}
        <img src="/babushka.png" alt="Logo" className="bottom-left-image" />

        {/* Chat Bubble Text Box (Appears above the image) */}
        {showText && <div className="chat-bubble">Welcome to Babushka Lessons!</div>}

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
