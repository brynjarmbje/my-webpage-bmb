

import React from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { musicData } from '../data/musicData';


const musicTracks = musicData.Songs;

const playerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.5 } },
};

const AnimatedMusicPlayer = () => {
  const [trackIndex, setTrackIndex] = React.useState(0);

  const handleClickNext = () => {
    setTrackIndex((current) => (current + 1) % musicTracks.length);
  };
  const handleClickPrev = () => {
    setTrackIndex((current) => (current - 1 + musicTracks.length) % musicTracks.length);
  };
  const handleEnded = () => {
    handleClickNext();
  };
  const handleSelectTrack = (idx) => {
    setTrackIndex(idx);
  };

  if (!musicTracks || musicTracks.length === 0) {
    return <div className="animated-music-player-empty">No songs available.</div>;
  }

  return (
    <motion.div
      className="animated-music-player"
      initial="hidden"
      animate="visible"
      variants={playerVariants}
      style={{
        background: 'linear-gradient(135deg, #f7f8fa 0%, #e3e7f1 100%)',
        borderRadius: '2rem',
        padding: '2rem 1.5rem',
        boxShadow: '0 8px 32px 0 #6c7a9222',
        maxWidth: 400,
        margin: '2rem auto',
        border: '1px solid #e3e7f1',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {musicTracks[trackIndex].backgroundImage && (
          <div
            style={{
              width: 140,
              height: 140,
              marginBottom: '1.2rem',
              borderRadius: '1.5rem',
              background: `url(${musicTracks[trackIndex].backgroundImage}) center/cover no-repeat`,
              boxShadow: '0 4px 24px 0 #6c7a9222',
              border: '3px solid #6c7a92',
            }}
          />
        )}
        <h3 style={{ color: '#1a223a', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.25rem', textAlign: 'center', textShadow: '0 2px 8px #e3e7f1' }}>
          {musicTracks[trackIndex].title}
        </h3>
        <h4 style={{ color: '#6c7a92', marginBottom: '0.7rem', fontWeight: 400, fontSize: '1rem', textAlign: 'center' }}>
          {musicTracks[trackIndex].author}
        </h4>
        <AudioPlayer
          src={musicTracks[trackIndex].url}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          onEnded={handleEnded}
          showSkipControls
          showJumpControls={false}
          style={{
            borderRadius: '1rem',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)',
            background: 'rgba(0,0,0,0.15)',
            margin: '0.5rem 0',
            width: '100%',
          }}
          header={null}
          footer={null}
        />
        <div style={{ marginTop: '0.7rem', color: '#23305a', fontSize: '0.98rem', letterSpacing: '0.03em', textAlign: 'center' }}>
          Track {trackIndex + 1} of {musicTracks.length}
        </div>
        {/* Song List */}
        <div style={{
          marginTop: '1.5rem',
          width: '100%',
          background: '#f7f8fa',
          borderRadius: '1rem',
          padding: '0.5rem 0.5rem 0.5rem 0.5rem',
          maxHeight: 220,
          overflowY: 'auto',
        }}>
          <div style={{ color: '#1a223a', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            Song List
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {musicTracks.map((track, idx) => (
              <li
                key={track.title + idx}
                onClick={() => handleSelectTrack(idx)}
                style={{
                  cursor: 'pointer',
                  padding: '0.45rem 0.7rem',
                  borderRadius: '0.7rem',
                  marginBottom: '0.2rem',
                  background: idx === trackIndex ? '#e3e7f1' : 'transparent',
                  color: idx === trackIndex ? '#1a223a' : '#6c7a92',
                  fontWeight: idx === trackIndex ? 700 : 400,
                  transition: 'background 0.2s, color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                }}
              >
                <span style={{ fontSize: '1.1em' }}>{track.title}</span>
                <span style={{ fontSize: '0.95em', opacity: 0.7 }}>({track.author})</span>
                {idx === trackIndex && <span style={{ marginLeft: 'auto', fontSize: '1.2em' }}>▶</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedMusicPlayer;
