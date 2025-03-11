import React from 'react';
import { Link } from 'react-router-dom';

const AboutTeaser = () => (
  <div className="about-teaser">
    <h3>    <Link to="/bio">Brynjar Már Björnsson</Link></h3>
    <p>"Blending a vibrant background in musical composition with robust web development skills, I navigate seamlessly between the creative realms of music and the logical demands of computer science. With years of experience from the stages of Whisky a Go Go to coding at the cutting edge with Fly PLAY, I thrive in dynamic environments that challenge both my artistic and technical prowess."</p>
  </div>
);
export default AboutTeaser;