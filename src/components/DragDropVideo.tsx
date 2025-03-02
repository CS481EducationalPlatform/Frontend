import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import CircularProgress from "@mui/material/CircularProgress";

interface DragDropVideoProps {
  onFileUploaded: (file: File) => void;
}

export const DragDropVideo: React.FC<DragDropVideoProps> = ({ onFileUploaded }) => {
  const fileTypes = ["MP4", "MOV", "AVI", "WMV"];
  const [file, setFile] = useState<File | null>(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(<></>);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleChange = (file: File) => {
    if (!file) return;
    
    setFile(file);
    setHasUploaded(true);
    setErrorMessage(<></>);
    onFileUploaded(file);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage(<div>Please select a file first</div>);
      return;
    }

    setIsUploading(true);
    try {
      const headers = {
        'Content-Type': file.type,
        'Content-Length': file.size.toString()
      };

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: file
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadUrl(data.url);
      setIsUploading(false);
    } catch (error) {
      setErrorMessage(<div>Upload failed: {error instanceof Error ? error.message : 'Unknown error'}</div>);
      setIsUploading(false);
    }
  };

  return (
    <>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      >
        <div
          style={{
            border: "2px dashed #cccccc",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer"
          }}
        >
          <p>Drag and drop a video file here, or click to select</p>
          <p>Supported formats: {fileTypes.join(", ")}</p>
        </div>
      </FileUploader>

      {hasUploaded && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected file: {file?.name}</p>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isUploading ? "not-allowed" : "pointer"
            }}
          >
            {isUploading ? <CircularProgress size={24} /> : "Upload"}
          </button>
        </div>
      )}

      {errorMessage}
    </>
  );
};
