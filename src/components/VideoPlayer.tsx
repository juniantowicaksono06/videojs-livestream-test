// VideoPlayer.tsx
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";
import '@videojs/http-streaming';

interface VideoPlayerProps {
  src: string;
  type?: string;
  headers?: Record<string, string>;
}

declare module 'video.js' {
  export interface Tech {
    hls: any;
  }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, type = 'application/x-mpegURL'}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize the Video.js player if not already initialized
      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: 'auto',
          fluid: true,
        });
      }

      // Update the player's source when src or type changes
      playerRef.current.src({
        src,
        type,
      });

      // Cleanup function to dispose of the player on unmount or before reinitializing
      return () => {
        if (playerRef.current) {
        //   playerRef.current.dispose();
        //   playerRef.current = null;
        }
      };
    }
  }, [src, type]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
