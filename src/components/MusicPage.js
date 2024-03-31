import React, { useEffect, useRef } from 'react';
import '../styles/MusicPage.css';

const songs = [
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
    // Add more songs as needed
];

const MusicPage = () => {
    const songRefs = useRef([]);

    useEffect(() => {
        songRefs.current = songRefs.current.slice(0, songs.length);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.play().catch(err => console.error("Error trying to play the song:", err));
                    } else {
                        entry.target.pause();
                    }
                });
            },
            { threshold: 0.5 } // This threshold triggers the callback when 50% of the item is visible
        );

        songRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            songRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className="music-page">
            {songs.map((song, index) => (
                <section className="music-player-container" key={index}>
                    <h2 className="song-title">{song.title}</h2>
                    <h4>{song.author}</h4>
                    <audio
                        ref={el => songRefs.current[index] = el}
                        className="audio-player"
                        controls
                        src={song.url}
                        preload="none"
                    ></audio>
                </section>
            ))}
        </div>
    );
};

export default MusicPage;