import React, { useState } from "react";
import { DragDropVideo } from "../components/DragDropVideo";
import DragDropFiles from "../components/DragDropFiles";

interface Document {
  name: string;
  url: string;
  file: File;
}

const UploadPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleDocumentUpload = (file: File) => {
    setDocuments(prevDocs => [...prevDocs, {
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }]);
  };

  const handleVideoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
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

export default UploadPage;