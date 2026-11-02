import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface MinimalVideoPlayerProps {
  src: string;
}

export function MinimalVideoPlayer({ src }: MinimalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
  };

  return (
    <div className="minimal-video-player">
      <video
        ref={videoRef}
        src={src}
        aria-label="ABIZK video editing and motion graphics project"
        controls={false}
        controlsList="nodownload nofullscreen noplaybackrate"
        disablePictureInPicture
        disableRemotePlayback
        playsInline
        preload="metadata"
        muted={isMuted}
        onContextMenu={(event) => event.preventDefault()}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the video element.
      </video>

      <div className="minimal-video-controls" role="group" aria-label="Video controls">
        <button
          type="button"
          aria-label="Play or pause video"
          aria-pressed={isPlaying}
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <Pause size={18} strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Play size={18} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          aria-label="Mute or unmute video"
          aria-pressed={isMuted}
          onClick={() => setIsMuted((muted) => !muted)}
        >
          {isMuted ? (
            <VolumeX size={18} strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Volume2 size={18} strokeWidth={2.2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
