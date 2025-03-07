import React, { useState } from "react";
import { DragDropVideo } from "./DragDropVideo";
import DragDropFiles from "./DragDropFiles";

interface Document {
  name: string;
  url: string;
  file: File;
}

const LessonUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleDocumentUpload = (file: File) => {
    setDocuments(prevDocs => [...prevDocs, {
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }]);
  };

  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please upload a video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    
    documents.forEach((doc, index) => {
      formData.append(`document_${index}`, doc.file);
    });

    try {
      const response = await fetch(process.env.REACT_APP_PLACEMENT == "Local" ? "https://localhost:5173/api/upload" :"https://backend-4yko.onrender.com/api/upload", {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert('Upload successful!');
    } catch (error) {
      alert('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="lesson-upload">
      <div className="upload-section">
        <h3>Upload Video</h3>
        <DragDropVideo onFileUploaded={handleVideoUpload} />
        {videoUrl && (
          <div className="video-preview">
            <h4>Video Preview</h4>
            <video src={videoUrl} controls width="400" />
          </div>
        )}
      </div>

      <div className="upload-section">
        <h3>Upload Supporting Documents</h3>
        <DragDropFiles onFileUploaded={handleDocumentUpload} />
      </div>

      {documents.length > 0 && (
        <div className="documents-preview">
          <h3>Uploaded Documents</h3>
          <ul>
            {documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        className="submit-button"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Upload Lesson
      </button>
    </div>
  );
};

export default LessonUpload;
