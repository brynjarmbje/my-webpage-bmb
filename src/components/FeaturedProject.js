import React from 'react';

const FeaturedProject = () => (
  <div className="featured-project">
    <h3>Trailer <a href='/music'>music</a></h3>
    <iframe  className='responsive-iframe' width="560" height="315" src="https://www.youtube.com/embed/mlUvBIheVMc?si=6dS18SlLmSJniPV0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  </div>
);
export default FeaturedProject;