// src/pages/Landing.jsx
import React from 'react';

const Landing = () => {
  return (
    <div className="container">
      <h1 className='mt-5'>Welcome to Shahariar's App</h1>
      <p>This is the landing page content. Here you can add any features or information you want to display to users when they first visit your site.</p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Feature 1: Description of feature 1.</li>
          <li>Feature 2: Description of feature 2.</li>
          <li>Feature 3: Description of feature 3.</li>
          <li>Feature 4: Description of feature 4.</li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;
