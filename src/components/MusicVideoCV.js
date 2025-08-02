import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import '../styles/MusicVideoCV.css';

const MusicVideoCV = () => {
  const { lang } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getThumbnailUrl = (video) => {
    // For YouTube videos, use hqdefault which is more reliable
    if (video.type === "youtube" && video.videoId) {
      return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    }

    // For GCS videos, use the provided thumbnail
    return video.thumbnail;
  };

  const videoProjects = [
    {
      id: 1,
      title: {
        en: "24 Hour Project",
        is: "24 Klukkustunda Verkefni"
      },
      description: {
        en: "A composition created for a 24-hour project showcase",
        is: "Tónsmíð búin til fyrir 24 klukkustunda verkefnasýningu"
      },
      type: "gcs", // Google Cloud Storage
      url: "https://storage.googleapis.com/music-files-mycreations-bmb/Brynjar-Mar-Bjornsson_CV_Composer/Scenes/Brynjar_24hourProject.mov",
      thumbnail: "https://storage.googleapis.com/music-files-mycreations-bmb/Brynjar-Mar-Bjornsson_CV_Composer/Thumbnails/Brynjar_24hourProject_thumb.jpg", // Add thumbnail path
      year: "2024"
    },
    {
      id: 2,
      title: {
        en: "Featured Composition",
        is: "Útvalin Tónsmíð"
      },
      description: {
        en: "A featured composition showcasing musical storytelling",
        is: "Útvalin tónsmíð sem sýnir tónlistarlega frásögn"
      },
      type: "youtube",
      url: "https://www.youtube.com/embed/mlUvBIheVMc?si=6dS18SlLmSJniPV0",
      videoId: "mlUvBIheVMc",
      thumbnail: "https://img.youtube.com/vi/mlUvBIheVMc/maxresdefault.jpg",
      year: "2024"
    }
  ];

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const renderVideoPlayer = (video) => {
    if (video.type === "youtube") {
      return (
        <iframe
          className="video-player"
          src={video.url}
          title={video.title[lang]}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      );
    } else if (video.type === "gcs") {
      return (
        <video
          className="video-player"
          controls
          preload="metadata"
        >
          <source src={video.url} type="video/mp4" />
          <source src={video.url} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="music-video-cv">
      <div className="cv-header">
        <h1 className="cv-title">
          {lang === 'is' ? 'Tónlist í Myndbönd' : 'Music for Video'}
        </h1>
        <p className="cv-subtitle">
          {lang === 'is' 
            ? 'Safn tónlistar sem ég hef búið til fyrir myndbönd og verkefni'
            : 'A collection of music I have created for videos and projects'
          }
        </p>
      </div>

      <div className="video-grid">
        {videoProjects.map((video) => (
          <div 
            key={video.id} 
            className="video-card"
            onClick={() => openVideoModal(video)}
          >
            <div className="video-thumbnail">
              {getThumbnailUrl(video) ? (
                <img 
                  src={getThumbnailUrl(video)} 
                  alt={video.title[lang]}
                  className="thumbnail-image"
                />
              ) : (
                <div className="thumbnail-placeholder">
                  <div className="play-icon">▶</div>
                  <div className="video-type-badge">
                    {video.type === 'youtube' ? 'YouTube' : 'Video'}
                  </div>
                </div>
              )}
              <div className="video-overlay">
                <div className="play-button">▶</div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title[lang]}</h3>
              <p className="video-description">{video.description[lang]}</p>
              <span className="video-year">{video.year}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideoModal}>×</button>
            <div className="modal-video-container">
              {renderVideoPlayer(selectedVideo)}
            </div>
            <div className="modal-info">
              <h2>{selectedVideo.title && selectedVideo.title[lang]}</h2>
              <p>{selectedVideo.description && selectedVideo.description[lang]}</p>
              <span className="modal-year">{selectedVideo.year}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicVideoCV;
