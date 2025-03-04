import React, { useState } from "react";
import { DragDropVideo } from "../components/DragDropVideo";
import DragDropFiles from "../components/DragDropFiles";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPage.css";

interface Document {
  name: string;
  url: string;
  file: File;
}

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    // This is a placeholder - you would implement actual submission logic here
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Lesson uploaded successfully!");
      
      // Navigate back to lessons page
      navigate("/");
    } catch (error) {
      alert("Error uploading lesson");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="lesson-upload">
        <h2>Create New Lesson</h2>
        
        <div className="upload-sections-container">
          <div className="upload-section">
            <h3>Upload Video</h3>
            <DragDropVideo onFileUploaded={handleVideoUpload} />
            {videoUrl && (
              <div className="video-preview">
                <h4>Video Preview</h4>
                <video 
                  src={videoUrl} 
                  controls 
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "300px",
                    width: "auto",
                    height: "auto"
                  }} 
                />
              </div>
            )}
          </div>

          <div className="upload-section">
            <h3>Upload Supporting Documents</h3>
            <DragDropFiles onFileUploaded={handleDocumentUpload} />
          </div>
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

        <div className="button-container">
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmitting || (!videoUrl && documents.length === 0)}
          >
            {isSubmitting ? "Uploading..." : "Upload Lesson"}
          </button>
          
          <button 
            className="cancel-button"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;