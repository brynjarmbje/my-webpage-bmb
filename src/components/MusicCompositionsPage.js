// pages/MusicCompositionsPage.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { musicData } from '../data/musicData';
import '../styles/MusicCompositionsPage.css';

const MusicCompositionsPage = () => {
  const [currentMedia, setCurrentMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Throttle progress updates
  const throttledSetProgress = useCallback(
    throttle((value) => {
      setProgress(value);
    }, 1000),
    []
  );

  // Update progress on media element
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const setProgressData = () => {
      if (!media.duration) return;
      throttledSetProgress((media.currentTime / media.duration) * 100 || 0);
    };

    media.addEventListener('loadeddata', setProgressData);
    media.addEventListener('timeupdate', setProgressData);

    return () => {
      media.removeEventListener('loadeddata', setProgressData);
      media.removeEventListener('timeupdate', setProgressData);
      throttledSetProgress.cancel();
    };
  }, [throttledSetProgress, currentMedia]);

  // Handle clicking a media item
  const handleMediaClick = (mediaItem) => {
    // For videos, open in modal
    if (mediaItem.type.startsWith('video')) {
      setCurrentMedia(mediaItem);
      setShowVideoModal(true);
    } else {
      // For audio, load into the fixed audio player
      if (mediaRef.current) {
        mediaRef.current.pause();
        mediaRef.current.src = mediaItem.url;
        mediaRef.current.load();
        setCurrentMedia(mediaItem);
        setIsPlaying(false);
      }
    }
  };

  // Toggle play/pause for audio
  const togglePlayPause = () => {
    if (!currentMedia) return;
    const media = mediaRef.current;
    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      // Slight delay for iOS
      setTimeout(() => {
        media.play().catch((err) => {
          console.error('Playback prevented:', err);
          alert('Please tap the play button directly to start playback.');
        });
      }, 950);
      setIsPlaying(true);
    }
  };

  // Handle clicks on the progress bar for seeking
  const handleProgressBarClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const duration = mediaRef.current.duration;
    const newTime = (offsetX / width) * duration;
    mediaRef.current.currentTime = newTime;
  };

  // Render each category section
  const renderCategorySection = (title, items) => {
    return (
      <div className="music-category-section" key={title}>
        <h2>{title}</h2>
        <div className="music-category-items">
          {items.map((item, index) => (
            <div key={index} className="song-item" onClick={() => handleMediaClick(item)}>
              <h4>{item.title}</h4>
              <p>{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="music-compositions-page">
      <h1>Music Compositions</h1>

      {/* Scrollable list of media items */}
      <div className="song-list">
        {Object.entries(musicData).map(([categoryName, items]) =>
          renderCategorySection(categoryName, items)
        )}
      </div>

      {/* Fixed Audio Player at Bottom */}
      {currentMedia && !currentMedia.type.startsWith('video') && (
        <div className="media-player-container fixed-player" style={{ backgroundImage: `url(${currentMedia.backgroundImage})` }}>
          <div className="media-info">
            <h2>{currentMedia.title}</h2>
            <h4>{currentMedia.author}</h4>
          </div>
          <div className="media-wrapper">
            <audio ref={mediaRef} controls style={{ width: '100%' }} />
          </div>
          <div className="progress-container" onClick={handleProgressBarClick}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="play-pause">
            <button onClick={togglePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && currentMedia && currentMedia.type.startsWith('video') && (
        <div className="video-modal">
          <div className="video-modal-content">
            <button className="close-button" onClick={() => setShowVideoModal(false)}>
              Close
            </button>
            <video ref={mediaRef} src={currentMedia.url} controls autoPlay style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCompositionsPage;
