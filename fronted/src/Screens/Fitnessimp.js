// src/components/FitnessImportance.jsx
import React from "react";
import "./Fitnessimp.css";

const benefits = [
  {
    title: "Physical Health",
    description:
      "Exercise strengthens your heart, improves circulation, and helps maintain a healthy weight while reducing the risk of chronic diseases.",
    icon: "💚",
  },
  {
    title: "Mental Well-being",
    description:
      "Fitness boosts endorphins, reduces stress, and improves sleep, confidence, and focus.",
    icon: "🧠",
  },
  {
    title: "Energy & Productivity",
    description:
      "Staying active improves energy levels and helps you remain productive throughout the day.",
    icon: "⚡",
  },
  {
    title: "Social Benefits",
    description:
      "Group workouts or sports help build friendships and foster a sense of community.",
    icon: "👥",
  },
];

const images = [
  "/image/man-2604149.jpg",
  "/image/muscle-2459720.jpg",
  "/image/yoga-6723315.jpg",
];

export default function FitnessImportance() {
  return (
    <div className="fitness-wrapper">
      {/* Header */}
      <div className="heading">
        <h2>
          Why <span>Fitness</span> is Important
        </h2>
        <p>
          Discover the life-changing benefits of staying active and living healthy.
        </p>
      </div>

      {/* Images */}
      <div className="image-grid">
        {images.map((img, i) => (
          <div key={i} className="image-card" style={{ animationDelay: `${i * 0.2}s` }}>
            <img src={img} alt={`fitness-${i}`} />
          </div>
        ))}
      </div>

      {/* Benefit Cards */}
      <div className="benefits">
        {benefits.map((item, i) => (
          <div key={i} className="benefit-card" style={{ animationDelay: `${i * 0.3}s` }}>
            <div className="icon">{item.icon}</div>
            <div className="text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
