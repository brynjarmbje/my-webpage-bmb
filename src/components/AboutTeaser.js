import React from 'react';
import { Link } from 'react-router-dom';

const AboutTeaser = () => (
  <div className="about-teaser">
    <h3>About Me</h3>
    <p>A brief introduction to my educational and professional journey in music and technology.</p>
    <Link to="/bio">Learn more about me →</Link>
  </div>
);
export default AboutTeaser;