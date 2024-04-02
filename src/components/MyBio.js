import React from 'react';
import '../styles/MyBio.css'; // Optional: Create a CSS file for styling if needed
import selfimg from '../images/bmb-self.png'; 

const MyBio = () => {
  return (
    <div className="bio-and-photo-container">
    <div className="my-bio-photo">
      <img src={selfimg} alt="BMB" />
      </div>
    <div className="my-bio-container">
      <h1>Brynjar Már Björnsson</h1>
      <p>Brynjar is a multifaceted professional with a rich background in musical composition and an emerging career in computer science and web development. Graduating in 2021 from the prestigious Musicians Institute with a Bachelor of Arts degree in Musical Composition for Visual Media, Brynjar has demonstrated an exceptional ability to blend creativity with technical skill. His expertise lies not only in creating emotive and dynamic compositions but also in applying his keen sense of sound to a variety of projects, ranging from soccer teams and kindergartens to podcast and radio program music.</p>
      <h4>A Diverse Portfolio of Soundscapes</h4>
      <p>Brynjar's journey in music has been marked by dedicated practice in music production, movie scores, along with commercial and trailer score compositions showcasing his versatility and innovative approach to sound design.</p>
      <h4>Bridging Notes and Codes</h4>
      <p>Expanding his horizons, Brynjar is currently pursuing a degree in Computer Science, further solidifying his foundation in technical knowledge and skills. His role as a web specialist at FlyPlay has been instrumental in marrying his creative passions with technology, where he has contributed to developing engaging, user-centric web experiences. This role has not only honed his technical abilities but has also underscored his adaptability and proficiency in navigating the digital landscape.</p>
      <h4>The Future Crescendo</h4>
      <p>As Brynjar looks forward to securing a programming job in the summer, his ambition is to leverage this opportunity to advance his expertise in software development. With most of his core Computer Science courses already completed, he is poised to graduate with a Bachelor of Science degree next spring. Brynjar Mar Bjornsson stands at the intersection of art and technology, embodying the essence of innovation. His journey reflects a relentless pursuit of excellence and a commitment to making a lasting mark in both the realms of music creation and programming.</p>
    </div>
    </div>
  );
};

export default MyBio;