import React, { useEffect,useRef,useState } from 'react';
import './Chatbot.css';
import Navbard from './Navbard' 

const API_KEY = "AIzaSyDh1Lgw5ob1-BjSVpZXf7tJ4w2hd8VPKKk";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const messagesEndRef = useRef(null);

useEffect(() => {
  if (messages.length > 0) {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Bot thinking animation placeholder
    setMessages(prev => [...prev, { sender: 'bot', text: 'Thinking...', loading: true }]);
    

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Today's date is ${today}. ${input}` }]
          }]
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API Error');

      let reply = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/(\d{4}-\d{2}-\d{2})/, today)
        .trim();

      setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: 'Sorry, I encountered an error.' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
  <div>
    <Navbard />
   <div className="chat-page">
  <div className="chat-container">
    <h2>AI Chatbot 🤖</h2>
    <div className="messages"  >
      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.sender}`}>
          {msg.loading ? (
            <div className="thinking-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            msg.text
          )}
          
        </div>
      ))}
         <div ref={messagesEndRef} />
        </div>
    <div className="input-area">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendMessage}>Send 🚀</button>
    </div>
  </div>
  
</div>

</div>
  );
}
