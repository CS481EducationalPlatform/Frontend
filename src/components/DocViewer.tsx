import React from 'react';

interface DocViewerProps {
  url: string;
  type?: string;
}

const DocViewer: React.FC<DocViewerProps> = ({ url, type }) => {
  const isImage = type?.startsWith('image/') || url.match(/\.(jpg|jpeg|png|gif)$/i);
  const isPDF = type === 'application/pdf' || url.endsWith('.pdf');

  if (isImage) {
    return <img src={url} alt="Document preview" style={{ maxWidth: '100%' }} />;
  }

  if (isPDF) {
    return (
      <iframe
        src={`${url}#view=FitH`}
        title="PDF document"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
      />
    );
  }

  // For other document types, provide a download link
  return (
    <div>
      <p>This document type cannot be previewed.</p>
      <a href={url} download className="download-link">
        Download Document
      </a>
    </div>
  );
};

export default DocViewer;