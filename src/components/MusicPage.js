import React, { useEffect, useRef } from 'react';
import '../styles/MusicPage.css';
import * as THREE from 'three';

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
    const canvasRefs = useRef([]);

    useEffect(() => {
        songRefs.current = songRefs.current.slice(0, songs.length);

        const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                const target = entry.target;
                if (entry.isIntersecting && target instanceof HTMLAudioElement) {
                    target.play().catch(err => console.error("Error trying to play the song:", err));
                } else if (target instanceof HTMLAudioElement) {
                    target.pause();
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

    useEffect(() => {
      canvasRefs.current.forEach((canvas, index) => {
          if (!canvas) return;
  
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
          camera.position.z = 50; // Adjust camera position to fit the entire particle system
  
          // Create particle geometry
          const particles = new THREE.BufferGeometry();
          const particleCount = 3000; // Adjust the number of particles
  
          const posArray = new Float32Array(particleCount); // Multiply by 3 for x, y, z coordinates for each particle
          for(let i = 0; i < particleCount * 3; i++) {
              // posArray[i] = Math.random() - 0.5; // Random positions for each particle
              // Create a more dispersed effect
              posArray[i] = (Math.random() - 0.5) * 100; // Spread particles wider
          }
          particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
          // Create particle material
          const particleMaterial = new THREE.PointsMaterial({
              size: 0.5,
              color: '#000000',
          });
  
          // Create particle mesh and add it to the scene
          const particleMesh = new THREE.Points(particles, particleMaterial);
          scene.add(particleMesh);
  
          // Animation loop
          const animate = function () {
              requestAnimationFrame(animate);
              
              particleMesh.rotation.z -= 0.001; // Rotate the particle system for visual effect
              particleMesh.rotation.x -= 0.001; // Rotate the particle system for visual effect

              // Optional: Add more dynamic movement to particles here
  
              renderer.render(scene, camera);
          };
  
          animate();
      });
  }, []);

    return (
        <div className="music-page">
            {songs.map((song, index) => (
                <section className="music-player-container" key={index}>
                  <canvas className="canvas" ref={el => canvasRefs.current[index] = el}></canvas>
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