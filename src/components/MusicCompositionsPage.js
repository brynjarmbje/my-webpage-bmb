// pages/MusicCompositionsPage.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { musicData } from '../data/musicData';
import '../styles/MusicCompositionsPage.css';

const MusicCompositionsPage = () => {
  // Audio (Music) player state
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);

  // Video player state
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef(null);

  // Throttle audio progress updates
  const throttledSetAudioProgress = useCallback(
    throttle((value) => {
      setAudioProgress(value);
    }, 1000),
    []
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateAudioProgress = () => {
      if (!audio.duration) return;
      throttledSetAudioProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('loadeddata', updateAudioProgress);
    audio.addEventListener('timeupdate', updateAudioProgress);

    return () => {
      audio.removeEventListener('loadeddata', updateAudioProgress);
      audio.removeEventListener('timeupdate', updateAudioProgress);
      throttledSetAudioProgress.cancel();
    };
  }, [throttledSetAudioProgress, currentAudio]);

  // Event handlers for audio player
  const handleAudioClick = (item) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = item.url;
      audioRef.current.load();
      setCurrentAudio(item);
      setIsPlayingAudio(false);
    }
  };

  const toggleAudioPlayPause = () => {
    if (!currentAudio) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      setTimeout(() => {
        audioRef.current.play().catch((err) => {
          console.error('Playback prevented:', err);
          alert('Please tap the play button directly to start playback.');
        });
      }, 950);
      setIsPlayingAudio(true);
    }
  };

  const handleAudioProgressBarClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    const newTime = (offsetX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  // Event handler for video player
  const handleVideoClick = (item) => {
    setCurrentVideo(item);
    setShowVideoModal(true);
  };

  // Define which categories belong to each player
  const audioCategories = ['musicCues', 'podcastCues', 'radioCues', 'songs'];
  const videoCategories = ['trailers', 'shortFilms', 'scenes'];

  // Render function for a category section
  const renderCategorySection = (title, items, type) => {
    return (
      <div className="music-category-section" key={title}>
        <h2>{title}</h2>
        <div className="music-category-items">
          {items.map((item, index) => (
            <div
              key={index}
              className="song-item"
              onClick={() => type === 'audio' ? handleAudioClick(item) : handleVideoClick(item)}
            >
              <h4>{item.title}</h4>
              <p>{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render audio sections
  const renderAudioSections = () => {
    return audioCategories.map((categoryKey) => {
      if (musicData[categoryKey]) {
        // Capitalize category name if needed
        const title = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
        return renderCategorySection(title, musicData[categoryKey], 'audio');
      }
      return null;
    });
  };

  // Render video sections
  const renderVideoSections = () => {
    return videoCategories.map((categoryKey) => {
      if (musicData[categoryKey]) {
        const title = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
        return renderCategorySection(title, musicData[categoryKey], 'video');
      }
      return null;
    });
  };

  return (
    <div className="music-compositions-page">
      <h1>Music Compositions</h1>

      {/* Scrollable list with both audio and video sections */}
      <div className="song-list">
        {renderAudioSections()}
        {renderVideoSections()}
      </div>

      {/* Fixed Audio Player for music (non-video) items */}
      {currentAudio && (
        <div className="media-player-container fixed-player" style={{ backgroundImage: `url(${currentAudio.backgroundImage})` }}>
          <div className="media-info">
            <h2>{currentAudio.title}</h2>
            <h4>{currentAudio.author}</h4>
          </div>
          <div className="media-wrapper">
            <audio ref={audioRef} controls style={{ width: '100%' }} />
          </div>
          <div className="progress-container" onClick={handleAudioProgressBarClick}>
            <div className="progress-bar" style={{ width: `${audioProgress}%` }}></div>
          </div>
          <div className="play-pause">
            <button onClick={toggleAudioPlayPause}>
              {isPlayingAudio ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      )}

      {/* Video Modal for video items */}
      {showVideoModal && currentVideo && (
        <div className="video-modal">
          <div className="video-modal-content">
            <button className="close-button" onClick={() => setShowVideoModal(false)}>
              Close
            </button>
            <video ref={videoRef} src={currentVideo.url} controls autoPlay style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCompositionsPage;

