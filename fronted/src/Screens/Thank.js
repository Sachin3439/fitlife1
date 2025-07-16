import React from 'react';
import './ThankYouPage.css';

function ThankYouPage() {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h1>🎉 Thank You!</h1>
        <p>Your form was submitted successfully.</p>
        <a href="/login" className="home-button">go to login page</a>
      </div>
    </div>
  );
}

export default ThankYouPage;
