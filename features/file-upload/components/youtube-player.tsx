import YouTube, { YouTubeProps } from 'react-youtube';
import { getYouTubeID } from '@/features/projects/utils';
import { cn } from '@/lib/utils';

interface YouTubePlayerProps {
  url: string;
  className?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  url,
  className
}) => {
  const videoId = getYouTubeID(url);
  if (!videoId) return null;

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      modestbranding: 1,
      rel: 0
    }
  };

  return (
    <div className={cn('relative h-full w-full', className)}>
      {/* @ts-ignore - YouTube component type definition issue with React 18 */}
      <YouTube
        videoId={videoId}
        opts={opts}
        className="absolute inset-0"
        iframeClassName="w-full h-full"
      />
    </div>
  );
};
