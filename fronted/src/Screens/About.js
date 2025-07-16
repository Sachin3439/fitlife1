import React from 'react';
import './About.css';
import Navbar from './Navbar';

export default function About() {
  return (
    <div>
        <Navbar />
    <div className="about-wrapper">
      <div className="about-container">
        <h1 className="about-title">
          <span className="glow">FitLife</span> — Your Wellness Journey
        </h1>
        <p className="about-subtitle">Transforming lives through health, habits, and harmony.</p>

        <div className="about-features">
          <div className="feature-card slide-in-left">
            <div className="icon-circle">💡</div>
            <h3>Innovative Goals</h3>
            <p>Set personalized health goals and reach them with real-time tracking and AI-powered suggestions.</p>
          </div>

          <div className="feature-card zoom-in">
            <div className="icon-circle">📊</div>
            <h3>Smart Insights</h3>
            <p>Visualize progress with intelligent graphs, tailored feedback, and health tips curated just for you.</p>
          </div>

          <div className="feature-card slide-in-right">
            <div className="icon-circle">🌿</div>
            <h3>Whole-Body Wellness</h3>
            <p>Nutrition meets fitness. Balanced meal plans, BMI tracking, and mindfulness in one intuitive dashboard.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
