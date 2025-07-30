import React, { useRef } from 'react';
import { useTheme } from '../ThemeContext';

// ...existing code...
import { motion, useInView } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { musicData } from '../data/musicData';
import { useLanguage } from '../LanguageContext';


// We'll select tracks per language below

const playerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, delay: 1.1 } },
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.7, rotateY: 90 },
  visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.8, delay: 1.2 } },
};
const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.3 } },
};
const authorVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.4 } },
};
const trackInfoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.5 } },
};
const songListVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.6 } },
};
const songItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.5, delay: 1.7 + i * 0.07 } }),
};


const AnimatedMusicPlayer = () => {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const [trackIndex, setTrackIndex] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Section and UI strings
  const content = {
    is: {
      sectionTitle: 'Tónlist',
      songList: 'Lagalisti',
      trackOf: (idx, total) => `Lag ${idx} af ${total}`,
      noSongs: 'Engin lög tiltæk.',
    },
    en: {
      sectionTitle: 'Music',
      songList: 'Song List',
      trackOf: (idx, total) => `Track ${idx} of ${total}`,
      noSongs: 'No songs available.',
    },
  };
  const t = content[lang];

  // Always use the latest musicData
  const musicTracks = musicData.Songs;

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
    return <div className="animated-music-player-empty">{t.noSongs}</div>;
  }

  return (
    <motion.div
      ref={ref}
      key={lang}
      className="animated-music-player"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
          <motion.div
            className="music-track-image"
            style={{
              width: 140,
              height: 140,
              marginBottom: '1.2rem',
              borderRadius: '1.5rem',
              background: `url(${musicTracks[trackIndex].backgroundImage}) center/cover no-repeat`,
              boxShadow: '0 4px 24px 0 #6c7a9222',
              border: '3px solid #6c7a92',
            }}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            key={trackIndex + lang}
          />
        )}
        <motion.h3
          style={{ color: '#1a223a', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.25rem', textAlign: 'center', textShadow: '0 2px 8px #e3e7f1' }}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          key={trackIndex + lang + 'title'}
        >
          {musicTracks[trackIndex].title[lang]}
        </motion.h3>
        <motion.h4
          style={{ color: '#6c7a92', marginBottom: '0.7rem', fontWeight: 400, fontSize: '1rem', textAlign: 'center' }}
          initial="hidden"
          animate="visible"
          variants={authorVariants}
          key={trackIndex + lang + 'author'}
        >
          {musicTracks[trackIndex].author[lang]}
        </motion.h4>
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
        {/* Song List (no title, just the list) */}
        <motion.div
          className="animated-music-songlist"
          variants={songListVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ul className="new-music-list">
            {musicTracks.map((track, idx) => (
            <li
                key={track.title[lang] + idx}
                className={`new-music-item${trackIndex === idx ? ' active' : ''}`}
                onClick={() => handleSelectTrack(idx)}
                style={{
                background: trackIndex === idx
                  ? (theme === "dark" ? "#ffe082" : "#232526")
                  : undefined,
                color: trackIndex === idx
                  ? (theme === "dark" ? "#232526" : "#ffe082")
                  : undefined,
                fontWeight: trackIndex === idx ? 700 : 500,
                cursor: trackIndex === idx ? "default" : "pointer",
                pointerEvents: trackIndex === idx ? "none" : "auto",
                boxShadow: trackIndex === idx ? "0 2px 8px 0 rgba(0,0,0,0.10)" : undefined,
                border: trackIndex === idx ? (theme === "dark" ? "2px solid #ffe082" : "2px solid #232526") : undefined,
                transition: "background 0.2s, color 0.2s, border 0.2s",
                }}
              >
                {track.title[lang]}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedMusicPlayer;
