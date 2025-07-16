import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbard from './Navbard';
import axios from 'axios';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [dietType, setDietType] = useState('');
  const [showDietOption, setShowDietOption] = useState(false);

  const navigate = useNavigate();

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!weight || !height || !age) {
      alert('Please fill in all fields!');
      return;
    }

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmiRaw = w / (h * h);
    const bmiValue = parseFloat(bmiRaw.toFixed(1));

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal weight';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obesity';

    // Set local state
    setBmi(bmiValue);
    setStatus(category);
    setShowDietOption(true);
  };

  const handleShowDiet = async () => {
    if (!dietType) {
      alert("Please select a diet preference.");
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (email) {
      try {
        await axios.post('http://localhost:5000/bmi', {
          email,
          weight,
          height,
          age,
          gender,
          bmi,
          status,
          dietType
        });
      } catch (err) {
        console.error('Error saving BMI:', err);
      }
    }

    navigate('/diet', {
      state: {
        bmi,
        dietType,
        age,
        gender
      }
    });
  };

  return (
    <div>
      <Navbard />
      <div id='top'>
      <div className="container">
        <h1>BMI Calculator</h1>
        <form onSubmit={calculateBMI}>
          <div>
            <label>Weight (kg):</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (cm):</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
          </div>
          <div>
            <label>Age:</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} />
          </div>
          <div>
            <label>Gender:</label>
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit">Calculate BMI</button>
        </form>

        {bmi && (
          <div>
            <h2>Your BMI: {bmi}</h2>
            <p>Status: {status}</p>
            <p>Age: {age}, Gender: {gender}</p>
          </div>
        )}

        {showDietOption && (
          <div style={{ marginTop: '20px' }}>
            <label>Diet Preference:</label>
            <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="nonVegetarian">Non-Vegetarian</option>
            </select>
            <button onClick={handleShowDiet} style={{ marginLeft: '10px' }}>
              View Diet Plan
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
