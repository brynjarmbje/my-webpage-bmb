import React from 'react';
import '../styles/MusicPage.css';

const songs = [
    {
        title: "Gaman Saman",
        url: "https://storage.cloud.google.com/music-files-mycreations-bmb/SongsforSubmit/GamanSaman.mp3",
        type: "audio/mp3",
    },
    {
        title: "Bolem Dastnnu",
        url: "https://storage.cloud.google.com/music-files-mycreations-bmb/SongsforSubmit/BolemDastnnu.wav",
        type: "audio/wav",
    },
  // Add more songs as needed
];

const MusicPage = () => {
  return (
    <div className="music-page">
      {songs.map((song, index) => (
        <div className="music-player-container" key={index}>
          <h2 className="song-title">{song.title}</h2>
          <audio className="audio-player" controls src={song.url}></audio>
        </div>
      ))}
    </div>
  );
};

export default MusicPage;