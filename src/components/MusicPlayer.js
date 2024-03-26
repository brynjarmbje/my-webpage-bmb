import React from 'react';

const MusicPlayer = () => {
    // Define your music tracks and their URLs here
    const tracks = [
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
    ];

    return (
        <div>
            <h2>My Music</h2>
            {tracks.map((track, index) => (
                <div key={index}>
                    <h3>{track.title}</h3>
                    <audio controls>
                        <source src={track.url} type={track.type} />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ))}
        </div>
    );
};

export default MusicPlayer;