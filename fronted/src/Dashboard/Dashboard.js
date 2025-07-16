import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbard from './Navbard';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { dietPlans } from './Dietdata'; // make sure you have this or paste the object here
import './Dashboard.css';
import green from '../images/green.jpg';

function Dashboard() {
  const navigate = useNavigate();

  const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

  // Check login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const [bmiData, setBmiData] = useState(null);
  const [showDiet, setShowDiet] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      api.get(`/bmi/${email}`)
        .then(res => setBmiData(res.data))
        .catch(err => console.error('Error fetching BMI:', err));
    }
  }, [api]);

  const bmiChartData = bmiData ? [{
    date: new Date(bmiData.updatedAt || bmiData.createdAt).toLocaleDateString('en-GB'),
    bmi: bmiData.bmi,
  }] : [];

  const getBMICategory = (bmi) => {
    if (bmi < 18.5 && bmi > 0) return "underweight";
    if (bmi < 25 && bmi >= 18.5) return "normal";
    if (bmi < 30 && bmi >= 25) return "overweight";
    return "obese";
  };

  return (
    <div className="dashboard-wrapper">
      <Navbard />
      <div className="dashboard-container">
        <h1 id="user">Welcome, <span id='userlo' style={{
            backgroundImage: `url(${green})`,
          }}>{localStorage.getItem('userName') || 'User'}</span></h1>

        <div className="grid">
          {/* BMI Summary */}
          <div className="card chart-card">
            <h2>BMI Summary</h2>
            {bmiData ? (
              <>
                <div className="bmi-value">{bmiData.bmi}</div>
                <p className="bmi-date">Last updated: {new Date(bmiData.updatedAt || bmiData.createdAt).toDateString()}</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={bmiChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[15, 40]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bmi" stroke="#00bcd4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </>
            ) : (
              <p className="no-data">No BMI data yet.</p>
            )}
          </div>

          {/* Diet Plan */}
          <div className="card diet-card">
            <h2>Current Diet Plan</h2>
            {bmiData?.dietType && bmiData?.bmi ? (
              <>
                {!showDiet ? (
                  <button onClick={() => setShowDiet(true)}>Show My 7-Day Diet Plan</button>
                ) : (
                  (() => {
                    const categoryKey = getBMICategory(bmiData.bmi);
                    const plan = dietPlans[categoryKey]?.[bmiData.dietType];

                    if (!plan) return <p>No matching plan found.</p>;

                    return (
                      <>
                        <h4>{plan.category}</h4>
                        <table border="1" cellPadding="8">
                          <thead>
                            <tr>
                              <th>Day</th>
                              <th>Breakfast</th>
                              <th>Lunch</th>
                              <th>Dinner</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 7 }).map((_, i) => (
                              <tr key={i}>
                                <td>Day {i + 1}</td>
                                <td>{plan.meals.breakfast[i]}</td>
                                <td>{plan.meals.lunch[i]}</td>
                                <td>{plan.meals.dinner[i]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    );
                  })()
                )}
              </>
            ) : (
              <p>No diet plan selected yet. <a href="/diet">Choose a diet plan</a></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
