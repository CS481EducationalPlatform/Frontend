import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import UploadIcon from '@mui/icons-material/Upload';
import { SvgIcon } from '@mui/material';

interface DragDropVideoProps {
  onFileUploaded: (file: File) => void;
}

export const DragDropVideo: React.FC<DragDropVideoProps> = ({ onFileUploaded }) => {
  const fileTypes = ["MP4", "MOV", "AVI", "WMV"];
  const [file, setFile] = useState<File | null>(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(<></>);

  const handleChange = (file: File) => {
    if (!file) return;
    
    setFile(file);
    setHasUploaded(true);
    setErrorMessage(<></>);
    onFileUploaded(file);
  };

  const handleBadSize = () => {
    setHasUploaded(false);
    setErrorMessage(<p className="error-message">File size limited to 100 MB</p>);
  };

  const handleBadType = () => {
    setHasUploaded(false);
    setErrorMessage(<p className="error-message">File types limited to {fileTypes.join(', ')}</p>);
  };

  return (
    <div className="drag-drop-container">
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        maxSize={100}
        onSizeError={handleBadSize}
        onTypeError={handleBadType}
      >
        <div className="upload-dropzone">
          <SvgIcon 
            component={UploadIcon} 
            className="upload-icon" 
            sx={{ 
              color: hasUploaded ? '#4caf50' : '#757575',
              fontSize: 60,
              opacity: 0.5
            }} 
          />
          
          <div className="upload-text">
            {hasUploaded ? (
              <>
                <p className="file-name">{file?.name}</p>
                <p className="success-message">Video added successfully</p>
                <p className="upload-another">Click to upload a different video</p>
              </>
            ) : (
              <>
                <p className="drag-instructions">Drag and drop a video file here</p>
                <p className="or-text">- or -</p>
                <p className="click-instructions">Click to browse files</p>
                <p className="formats">Supported formats: {fileTypes.join(", ")}</p>
              </>
            )}
          </div>
        </div>
      </FileUploader>

      {errorMessage}
    </div>
  );
};

export default DragDropVideo;
