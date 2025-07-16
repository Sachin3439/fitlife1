import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import green from '../images/droplet.jpg';
import './Body.css';

export default function FitnessBody() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

    const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const handleSubscribe = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/subscribe', { email });
    setMessage(res.data.message || '✅ Thank you! A confirmation has been sent.');
    setEmail('');
  } catch (err) {
      // Handle duplicate or server errors
      if (err.response?.data?.message?.includes('already')) {
        setMessage('⚠️ This email is already subscribed.');
      } else {
        setMessage('❌ Subscription failed. Please try again later.');
       
      }
    }
    setTimeout(() => {
      setMessage('');
    }, 10000);
};

  const handleClick = () => {
    navigate('/login'); // route must exist
  };

  return (
    <div className="fitness-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1><span id='fitlife'  style={{
            backgroundImage: `url(${green})`,
          }}>FitLife</span><span className='begin'> Begins Here</span></h1><br/>
          <p>Build your body. Fuel your mind. Transform your life.</p><br />
          <button className="cta-btn" onClick={handleClick}>Start Now</button>
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section">
        <h2>Your Fitness Goals</h2>
        <div className="goals-container">
          <div className="goal-card animate-up">
            <h3>Lose Weight</h3>
            <p>Custom diet plans and calorie control to shed pounds safely.</p>
          </div>
          <div className="goal-card animate-up">
            <h3>Build Muscle</h3>
            <p>Lift smart with hypertrophy-focused programs and trackers.</p>
          </div>
          <div className="goal-card animate-up">
            <h3>Stay Active</h3>
            <p>Daily routines and challenges to stay mobile and energized.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section">
        <h2>Success Stories</h2>
        <div className="testimonial-container">
          <div className="testimonial-card animate-left">
            <p>"FitLife helped me lose 15kg in 4 months! Their tips and plans are super effective."</p>
            <h4>— Priya D.</h4>
          </div>
          <div className="testimonial-card animate-right">
            <p>"As a beginner, I felt overwhelmed. FitLife gave me structure, and now I feel amazing!"</p>
            <h4>— Aman S.</h4>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
       <section className="newsletter-section">
      <h2>Join Our Community</h2>
      <p>Subscribe for weekly fitness tips, diet plans, and motivation.</p>
      <form className="newsletter-form" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p className="subscribe-message">{message}</p>}
    </section>
    </div>
  );
}

