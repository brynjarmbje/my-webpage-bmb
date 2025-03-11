// pages/MusicCompositionsPage.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { musicData } from '../data/musicData';
import '../styles/MusicCompositionsPage.css';

const MusicCompositionsPage = () => {
  // Flatten all items if you want a single “player” controlling everything.
  // Alternatively, each section can have its own player.
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio());

  // Throttle progress updates so they don't fire too often
  const throttledSetProgress = useCallback(
    throttle((value) => {
      setProgress(value);
    }, 1000),
    []
  );

  useEffect(() => {
    const audio = audioRef.current;

    const setProgressData = () => {
      if (!audio.duration) return;
      throttledSetProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('loadeddata', setProgressData);
    audio.addEventListener('timeupdate', setProgressData);

    return () => {
      audio.removeEventListener('loadeddata', setProgressData);
      audio.removeEventListener('timeupdate', setProgressData);
      throttledSetProgress.cancel();
    };
  }, [throttledSetProgress]);

  const handleSongClick = (song) => {
    audioRef.current.pause();
    audioRef.current.src = song.url;
    audioRef.current.load();
    setCurrentSong(song);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!currentSong) return; // Don’t play if no song is selected
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Delay to avoid potential iOS issues
      setTimeout(() => {
        audioRef.current.play().catch((err) => {
          console.error('Playback prevented:', err);
          alert('Please tap the play button directly to start playback.');
        });
      }, 950);
      setIsPlaying(true);
    }
  };

  const handleProgressBarClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    const newTime = (offsetX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  // If you want “next” or “previous” for a single category, you'd need to store
  // which category's array you're in. Or flatten all data into one array
  // so that next/previous can cycle through everything. Below is a simplified
  // approach that only toggles play/pause.

  // Helper to render each category
  const renderCategorySection = (title, items) => {
    return (
      <div className="music-category-section" key={title}>
        <h2>{title}</h2>
        <div className="music-category-items">
          {items.map((song, index) => (
            <div
              key={index}
              className="song-item"
              onClick={() => handleSongClick(song)}
            >
              <h4>{song.title}</h4>
              <p>{song.author}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="music-compositions-page">
      <h1>Music Compositions</h1>

          {/* Music player at bottom (or anywhere you like) */}
          {currentSong && (
        <div
          className="music-player-container"
          style={{ backgroundImage: `url(${currentSong.backgroundImage})` }}
        >
          <div className="song-info">
            <h2>{currentSong.title}</h2>
            <h4>{currentSong.author}</h4>
          </div>
          <div
            className="progress-container"
            onClick={handleProgressBarClick}
          >
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="play-pause">
            <button onClick={togglePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      )}

      {/* Render each category in its own section */}
      {Object.entries(musicData).map(([categoryName, items]) =>
        renderCategorySection(categoryName, items)
      )}
    </div>
  );
};

export default MusicCompositionsPage;
