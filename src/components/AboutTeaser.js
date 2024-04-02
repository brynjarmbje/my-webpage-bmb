import React from 'react';
import { Link } from 'react-router-dom';

const AboutTeaser = () => (
  <div className="about-teaser">
    <h3>    <Link to="/bio">About Me</Link></h3>
    <p>A multifaceted professional with a rich background in musical composition and an emerging career in computer science and web development.</p>
  </div>
);
export default AboutTeaser;