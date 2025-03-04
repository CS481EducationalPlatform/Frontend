import React, { useState, useEffect } from 'react';

interface YoutubeEmbedderProps {
  url: string;
  width?: number;
  height?: number;
  videoIndex?: number;
}

export const YoutubeEmbedder: React.FC<YoutubeEmbedderProps> = ({ 
  url, 
  width = 560, 
  height = 315,
  videoIndex
}) => {
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);

  useEffect(() => {
    const fetchVideoTitle = async () => {
      if (!videoId) {
        setError('Invalid YouTube URL');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Using the YouTube oEmbed API which doesn't require an API key
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch video title');
        }
        
        const data = await response.json();
        setVideoTitle(data.title);
        setError(null);
      } catch (err) {
        setError('Error fetching video title');
        console.error('Error fetching video title:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoTitle();
  }, [videoId]);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="youtube-video">
      {isLoading && <p>Loading video title...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <h3 className="video-title">
          {videoIndex ? `${videoIndex}. ${videoTitle}` : videoTitle}
        </h3>
      )}
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={videoTitle || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};