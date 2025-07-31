
import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../LanguageContext';
import '../styles/ProjectModal.css';

// Accept optional dashCaption and sensCaption for custom image subtitles
const ProjectModal = ({ open, onClose, dashImg, sensImg, description, dashCaption, sensCaption }) => {
  const { lang } = useLanguage();
  const [zoomImg, setZoomImg] = useState(null);

  // Close zoom on ESC
  useEffect(() => {
    if (!zoomImg) return;
    const handler = (e) => {
      if (e.key === 'Escape') setZoomImg(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomImg]);

  const handleImgClick = useCallback((img) => setZoomImg(img), []);
  const handleZoomClose = useCallback(() => setZoomImg(null), []);

  if (!open) return null;
  return createPortal(
    <>
      <div className="project-modal-overlay" onClick={onClose}>
        <div className="project-modal" onClick={e => e.stopPropagation()}>
          <button className="project-modal-close" onClick={onClose}>&times;</button>
          <div className="project-modal-images">
            <img
              src={dashImg}
              alt="Dashboard screenshot"
              className={typeof dashCaption === 'function' && dashCaption.toString().includes('Aðalskjár') ? 'fruma-modal-img' : 'project-modal-img'}
              onClick={() => handleImgClick(dashImg)}
              style={{ cursor: 'zoom-in' }}
            />
            <div className="project-modal-caption">
              {dashCaption !== undefined
                ? (typeof dashCaption === 'function' ? dashCaption(lang) : dashCaption)
                : (lang === 'is' ? 'Yfirlit: Byrjaðu að fylgjast með mæligögnum og fáðu viðvaranir' : 'Dashboard: Start monitoring sensor readings and show warnings')}
            </div>
            <img
              src={sensImg}
              alt="Sensor mapping screenshot"
              className={typeof sensCaption === 'function' && sensCaption.toString().includes('Innskráning') ? 'fruma-modal-img' : 'project-modal-img'}
              onClick={() => handleImgClick(sensImg)}
              style={{ cursor: 'zoom-in' }}
            />
            <div className="project-modal-caption">
              {sensCaption !== undefined
                ? (typeof sensCaption === 'function' ? sensCaption(lang) : sensCaption)
                : (lang === 'is' ? 'Skynjarar: Kortleggja skynjara á eignir og stilla viðmiðunarmörk' : 'Sensor page: Map sensors to assets and set thresholds')}
            </div>
          </div>
          <div className="project-modal-desc">{description}</div>
        </div>
      </div>
      {zoomImg && createPortal(
        <div className="project-modal-zoom-overlay" onClick={handleZoomClose}>
          <img src={zoomImg} alt="Zoomed" className="project-modal-zoom-img" />
        </div>,
        document.body
      )}
    </>,
    document.body
  );
};

export default ProjectModal;
