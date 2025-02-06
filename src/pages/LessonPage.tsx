import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YoutubeEmbedder } from "../components/YoutubeEmbedder";
import Lesson from "../components/Lesson";
import "../styles/lessonPage.css"; 

const lessons = {
  1: [
    { id: 1, title: "Lesson 1", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", documents: ["Lesson1.pdf"] },
    { id: 2, title: "Lesson 2", videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", documents: ["Lesson2.pdf"] },
  ],
  2: [
    { id: 1, title: "Lesson 1", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", documents: ["Lesson1_Django.pdf"] },
  ],
};

const LessonPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseLessons = lessons[courseId] || [];
  const [currentLesson, setCurrentLesson] = useState(null);

  return (
    <div className="lesson-page">
      {/* Sidebar with Lessons */}
      <div className="lesson-sidebar">
        <h2>Course Lessons</h2>
        {courseLessons.map((lesson) => (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            isActive={lesson.id === currentLesson?.id}
            onSelect={setCurrentLesson}
          />
        ))}
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Courses
        </button>
      </div>

      {/* Lesson Content Section */}
      <div className="lesson-content">
        {currentLesson ? (
          <>
            <h2>{currentLesson?.title}</h2>
            {currentLesson?.videoUrl && (
              <div className="video-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <YoutubeEmbedder url={currentLesson.videoUrl} width="100%" height="100%" />
                  </div>
                </div>
              </div>
            )}
            <h3>Course Documents</h3>
            {currentLesson?.documents.length > 0 ? (
              <ul className="document-list">
                {currentLesson.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            ) : (
              <p>No documents available.</p>
            )}
          </>
        ) : (
          <p>Select a lesson to view its content.</p>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
