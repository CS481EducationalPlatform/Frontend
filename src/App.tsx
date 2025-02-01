import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<LessonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
