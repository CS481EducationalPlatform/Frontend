import React from 'react';

interface DocumentViewerProps {
  documentUrl: string;
  documentType: 'pdf' | 'doc' | 'docx' | 'txt';
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentUrl, documentType }) => {
  const renderDocument = () => {
    switch (documentType) {
      case 'pdf':
        return (
          <iframe
            src={documentUrl}
            title="PDF Document"
            className="w-full h-screen"
          />
        );
      case 'doc':
      case 'docx':
      case 'txt':
        // For these formats, we'll provide a download link since they can't be directly embedded
        return (
          <div className="text-center p-4">
            <p>This document type cannot be previewed directly.</p>
            <a
              href={documentUrl}
              download
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Download Document
            </a>
          </div>
        );
      default:
        return <div>Unsupported document type</div>;
    }
  };

  return (
    <div className="document-viewer">
      {renderDocument()}
    </div>
  );
};

export default DocumentViewer;