import React, { useState } from 'react';
import './Contact.css';
import Navbard from './Navbard';
import axios from 'axios';


const Contact = () => {

  const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setError('');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error(err);
    }
  

    // Simulate form submission
    setSubmitted(true);
    setError('');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <Navbard />
      <div id='top'>
    <div className="contact-container">
      <h2>Contact Us</h2>
      {submitted && <p className="success-message">Thanks for contacting us!</p>}
       {submitted && <p className="success-message"> <a href="/dashboardhome" className="home-button">Go Back Home</a></p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
        />

        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
   
    </div>
    </div>
  );
};

export default Contact;
