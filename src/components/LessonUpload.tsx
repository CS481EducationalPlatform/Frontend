import React, { useState } from "react";
import DragDropVideo from "./DragDropVideo";
import DragDropFiles from "./DragDropFiles";

const LessonUpload = () => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleDocumentUpload = (file) => {
    setDocuments((prevDocs) => [...prevDocs, file]);
  };

  const getYoutubeEmbedUrl = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"\s?&]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const handleSubmit = async () => {
    if (!lessonTitle || (!videoFile && !youtubeLink)) {
      alert("Lesson must have a title and either a video upload or a YouTube link.");
      return;
    }

    const formData = new FormData();
    formData.append("lessonTitle", lessonTitle);
    if (videoFile) {
      formData.append("video", videoFile);
    } else if (youtubeLink) {
      formData.append("youtubeLink", youtubeLink);
    }
    documents.forEach((doc, index) => {
      formData.append(`document_${index}`, doc);
    });

    try {
      const response = await fetch("/api/upload-lesson/", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        alert("Lesson uploaded successfully!");
      } else {
        alert("Failed to upload lesson.");
      }
    } catch (error) {
      console.error("Error uploading lesson:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Lesson</h2>
      <input
        type="text"
        placeholder="Lesson Title"
        className="w-full p-2 border rounded mb-4"
        value={lessonTitle}
        onChange={(e) => setLessonTitle(e.target.value)}
        required
      />
      
      <h3 className="text-lg font-medium">Upload Video or Enter YouTube Link</h3>
      <DragDropVideo onFileUploaded={setVideoFile} />
      <input
        type="text"
        placeholder="Paste YouTube Link"
        className="w-full p-2 border rounded mt-2"
        value={youtubeLink}
        onChange={(e) => {
          setYoutubeLink(e.target.value);
          setVideoFile(null); // Clear file if entering a link
        }}
      />
      {youtubeLink && (
        <iframe
          className="w-full h-60 mt-2"
          src={getYoutubeEmbedUrl(youtubeLink)}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      
      <h3 className="text-lg font-medium mt-4">Upload Documents</h3>
      <DragDropFiles onFileUploaded={handleDocumentUpload} />
      
      <ul className="mt-2">
        {documents.map((doc, index) => (
          <li key={index} className="text-sm">📄 {doc.name}</li>
        ))}
      </ul>
      
      <button 
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        onClick={handleSubmit}
      >
        Submit Lesson
      </button>
    </div>
  );
};

export default LessonUpload;
