import React from 'react';

const MusicPlayer = () => {
    // Define your music tracks and their URLs here
    const tracks = [
        {
            title: "Gaman Saman",
            author: "Brynjar Már Björnsson",
            url: "https://storage.cloud.google.com/music-files-mycreations-bmb/SongsforSubmit/GamanSaman.mp3",
            type: "audio/mp3",
        },
        {
            title: "Bolem Dastnnu",
            author: "Brynjar Már Björnsson",
            url: "https://storage.cloud.google.com/music-files-mycreations-bmb/SongsforSubmit/BolemDastnnu.wav",
            type: "audio/wav",
        },
    ];

    const playAudio = (audioId) => {
        const audioEl = document.getElementById(audioId);
        if (audioEl && audioEl instanceof HTMLAudioElement) {
            audioEl.play();
        }
    };

    return (
        <div>
            {tracks.map((track, index) => (
                <div key={index}>
                    <h3>{track.title}</h3>
                    <h4>{track.author}</h4>
                    <audio id={`audio-${index}`} controls>
                        <source src={track.url} type={track.type} />
                        Your browser does not support the audio element.
                    </audio>
                    <button onClick={() => playAudio(`audio-${index}`)}>Spila</button>
                </div>
            ))}
        </div>
    );
};

export default MusicPlayer;