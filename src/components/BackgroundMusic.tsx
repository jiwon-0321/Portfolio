import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const MusicController = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  padding: 0.4rem 0.8rem;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(160, 174, 192, 0.2);
  transition: all 0.3s ease;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.2);
  }
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.3rem 0.6rem;
    gap: 0.3rem;
  }
`;

const PlayButton = styled.button<{ isPlaying: boolean }>`
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 0.6rem;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  @media (max-width: 768px) {
    gap: 0.2rem;
  }
`;

const VolumeSlider = styled.input`
  width: 50px;
  height: 3px;
  border-radius: 2px;
  background: rgba(160, 174, 192, 0.3);
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
  }
  
  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px rgba(102, 126, 234, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 40px;
  }
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 70px;
  
  @media (max-width: 768px) {
    min-width: 50px;
  }
`;

const SongTitle = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  color: #2D3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 1.5px;
  background: rgba(160, 174, 192, 0.3);
  border-radius: 1px;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  transition: width 0.1s ease;
`;

const VolumeIcon = styled.span`
  font-size: 0.7rem;
  color: #2D3748;
  opacity: 0.7;
`;

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/Bright Horizon.mp3" type="audio/mpeg" />
        브라우저가 오디오를 지원하지 않습니다.
      </audio>
      
      <MusicController className="slide-in-right">
        <PlayButton isPlaying={isPlaying} onClick={togglePlay}>
          {isPlaying ? '⏸️' : '▶️'}
        </PlayButton>
        
        <MusicInfo>
          <SongTitle>Bright Horizon</SongTitle>
          <ProgressBar>
            <Progress progress={progress} />
          </ProgressBar>
        </MusicInfo>
        
        <VolumeControl>
          <VolumeIcon>{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</VolumeIcon>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeControl>
      </MusicController>
    </>
  );
} 