
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface VideoCardProps {
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
}

const VideoCard = ({ 
  title, 
  description, 
  thumbnail, 
  duration = "5:30", 
  isPlaying = false,
  onPlayPause 
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
    <Card className="cartao-gradiente hover:scale-105 transition-all duration-300 group cursor-pointer">
      <div className="relative aspect-video bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg overflow-hidden mb-4">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-6xl opacity-30">🥁</div>
          </div>
        )}
        
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover:shadow-orange-500/50"
        >
          {playing ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          )}
        </button>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default VideoCard;
