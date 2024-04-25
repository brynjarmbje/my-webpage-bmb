import React, { useCallback, useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import '../styles/MusicPage.css';
import bmbLogo1 from '../images/bmb-logo1.png';
import bmbLogo2 from '../images/bmb-logo2.png';
import bmbLive1 from '../images/bmb-live1.png';
import bmbLive2 from '../images/bmb-live2.webp';

const songs = [
    {
        title: "Fuglar í móa",
        author: "Brynjar Már Björnsson",
        url: "https://storage.googleapis.com/music-files-mycreations-bmb/SongsforSubmit/Fuglar-i-moa.wav",
        backgroundImage: bmbLive1,
        type: "audio/wav",
    },
    {
      title: "Lil Sun Q",
      author: "Brynjar Már Björnsson",
      url: "https://storage.googleapis.com/music-files-mycreations-bmb/SongsforSubmit/LilSunQ_Betterv.wav",
      backgroundImage: bmbLive1,
      type: "audio/wav",
  },
    {
        title: "A Fair Spring",
        author: "Brynjar Már Björnsson",
        url: "https://storage.googleapis.com/music-files-mycreations-bmb/SongsforSubmit/Scoring9-Idea1-ending.wav",
        backgroundImage: bmbLive2,
        type: "audio/wav",
    },
    {
        title: "Gaman Saman",
        author: "Brynjar Már Björnsson",
        url: "https://storage.googleapis.com/music-files-mycreations-bmb/SongsforSubmit/GamanSaman.mp3",
        backgroundImage: bmbLogo1,
        type: "audio/mp3",
    },
    {
        title: "Bolem Dastnnu",
        author: "Brynjar Már Björnsson",
        url: "https://storage.googleapis.com/music-files-mycreations-bmb/SongsforSubmit/BolemDastnnu.wav",
        backgroundImage: bmbLogo2,
        type: "audio/wav",
    },
    {
        title: "Up in the Sky",
        author: "Brynjar Már Björnsson",
        url: "https://storage.googleapis.com/music-files-mycreations-bmb/SongsforSubmit/Brynjar_UpInTheSky.wav",
        backgroundImage: bmbLive1,
        type: "audio/wav",
    },
];

const MusicPage = () => {
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(new Audio(currentSong.url));
  
    // Throttled function to update progress
    const throttledSetProgress = useCallback(throttle((value) => {
      setProgress(value);
    }, 1000), []);
  
    useEffect(() => {
        const audio = audioRef.current;
      
        const setProgressData = () => {
          if (!audio.duration) return; // Ensure duration is loaded
          throttledSetProgress((audio.currentTime / audio.duration) * 100 || 0);
        };
      
        audio.addEventListener('loadeddata', setProgressData); // Might not need this if you handle data loading elsewhere
        audio.addEventListener('timeupdate', setProgressData);
      
        return () => {
          audio.removeEventListener('loadeddata', setProgressData);
          audio.removeEventListener('timeupdate', setProgressData);
          throttledSetProgress.cancel();
        };
      }, [throttledSetProgress]);
  
    const handleSongClick = (song) => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = song.url; // Set new source
          audioRef.current.load(); // Important to reload the audio element when changing source
          setCurrentSong(song);
          setIsPlaying(false); // Update isPlaying only after user starts the song
        }
      };
  
      const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // Use setTimeout to delay the play action just below the iOS limit
                setTimeout(() => {
                    audioRef.current.play().catch(err => {
                        console.error("Playback was prevented:", err);
                        // Optionally, inform the user they need to manually interact to play
                        alert("Please interact directly with the play button to start playback.");
                    });
                }, 950);  // Set to just under 1 second to stay within potential iOS thresholds
                setIsPlaying(true);
            }
        }
    };
  
    // These handle next and previous songs
    const changeSong = (next = true) => {
      let index = songs.findIndex(s => s.url === currentSong.url);
      index = next ? (index + 1) % songs.length : (index - 1 + songs.length) % songs.length;
      handleSongClick(songs[index]);
    };
  
    // Click on progress bar to seek
    const handleProgressBarClick = (e) => {
      const width = e.currentTarget.clientWidth;
      const offsetX = e.nativeEvent.offsetX;
      const duration = audioRef.current.duration;
      const currentTime = (offsetX / width) * duration;
      audioRef.current.currentTime = currentTime;
    };
  
    return (
      <div className="music-page">
        <div className="song-list">
          {songs.map((song, index) => (
            <div key={index} className="song-item" onClick={() => handleSongClick(song)}>
              <h2>{song.title}</h2>
              <h4>{song.author}</h4>
            </div>
          ))}
        </div>
        <div className="music-player-container" style={{ backgroundImage: `url(${currentSong.backgroundImage})` }}>
            <div className="controls">
                <div className="song-info">
                    <h2>{currentSong.title}</h2>
                    <h4>{currentSong.author}</h4>
                </div>
                <div className="progress-container" onClick={handleProgressBarClick}>
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
                <div className='play-pause'>
              <button onClick={() => changeSong(false)}>&#9198;</button> {/* Previous */}
              <button onClick={togglePlayPause}>{isPlaying ? '\u23F8' : '\u25B6'}</button> {/* Play/Pause */}
              <button onClick={() => changeSong()}>&#9197;</button> {/* Next */}
              </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MusicPage;