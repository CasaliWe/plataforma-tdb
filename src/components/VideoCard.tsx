
import { useState } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import YoutubeEmbed from './YoutubeEmbed';

interface VideoCardProps {
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  videoUrl?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isCompleted?: boolean;
}

const VideoCard = ({ 
  title, 
  description, 
  thumbnail, 
  duration = "5:30", 
  isPlaying = false,
  onPlayPause,
  videoUrl,
  isFavorite = false,
  onToggleFavorite,
  isCompleted = false
}: VideoCardProps) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (onPlayPause) {
      onPlayPause();
    } else {
      setLocalIsPlaying(!localIsPlaying);
    }
  };

  const playing = onPlayPause ? isPlaying : localIsPlaying;
  return (
    <Card className="cartao-gradiente hover:scale-105 transition-all duration-300 group cursor-pointer relative">
      {/* Status indicators */}
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        {isCompleted && (
          <span className="bg-green-600/90 text-white text-xs px-2 py-1 rounded-full">
            Concluída
          </span>
        )}
      </div>
      
      <div className="relative aspect-video bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg overflow-hidden mb-4">
        {playing && videoUrl ? (
          <YoutubeEmbed videoUrl={videoUrl} title={title} />
        ) : thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-6xl opacity-30">🥁</div>
          </div>
        )}
        
        {/* Play/Pause Button */}
        {!playing && (
          <button
            onClick={handlePlayPause}
            className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover:shadow-orange-500/50"
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </button>
        )}        {/* Duração removida conforme solicitado */}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2 flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        {onToggleFavorite && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }} 
            className="mt-1 p-1 rounded-full hover:bg-gray-200/10"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
            />
          </button>
        )}
      </div>
    </Card>
  );
};

export default VideoCard;
