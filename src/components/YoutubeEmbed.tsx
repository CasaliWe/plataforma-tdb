import React from 'react';

interface YoutubeEmbedProps {
  videoUrl: string;
  title?: string;
  onPlay?: () => void;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoUrl, title = "Vídeo aula", onPlay }) => {
  // Adiciona parâmetros à URL do YouTube para melhorar a aparência
  const enhancedUrl = `${videoUrl}?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0`;
  
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={enhancedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeEmbed;
