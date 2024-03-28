import React from 'react';
import { Link } from 'react-router-dom';

const AboutTeaser = () => (
  <div className="about-teaser">
    <h3>    <Link to="/bio">About Me</Link></h3>
    <p>A brief introduction to my educational and professional journey in music and technology.</p>
  </div>
);
export default AboutTeaser;