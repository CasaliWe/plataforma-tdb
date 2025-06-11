
import { useState } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AudioCardProps {
  title: string;
  description?: string;
  duration?: string;
  bpm?: number;
  genre?: string;
  difficulty?: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
}

const AudioCard = ({ 
  title, 
  description, 
  duration = "3:30", 
  bpm = 120,
  genre = "Rock",
  difficulty = "Intermediário",
  isPlaying = false,
  onPlayPause 
}: AudioCardProps) => {
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
      <div className="relative aspect-video bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
        {/* Audio Visualization Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-gradient-to-t from-orange-600 to-red-600 rounded-full transition-all duration-300 ${
                  playing ? 'animate-pulse' : ''
                }`}
                style={{
                  height: `${Math.random() * 40 + 20}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Music Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Music className="w-20 h-20 text-primary" />
        </div>
        
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover:shadow-orange-500/50 z-10"
        >
          {playing ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          )}
        </button>

        {/* Duration and BPM Badges */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {bpm} BPM
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

export default AudioCard;
