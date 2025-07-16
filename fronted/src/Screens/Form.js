import React, {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import Navbar from './Navbar';


function Form() {
    const [form, setForm] = useState({email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Form submitted with: ", form); // ✅ Check form data
    try {
      const res = await api.post('/login', form);
      setMessage(res.data.message + ' | Welcome, ' + res.data.user.name);
    // ✅ Optional: store login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', res.data.user.email); // if needed
      localStorage.setItem('userName', res.data.user.name); 

      // ✅ Navigate to dashboard
      navigate('/dashboardhome', { replace: true });
    } 
    catch (err) {
       
      setMessage(err.response?.data?.message || 'Login failed');
    }
     
  };

  return (
    <div>
        <Navbar />
    <div id='formdiv'>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email:</label><br />
        <input 
          type="email" 
          name='email'
          value={form.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Password:</label><br />
        <input 
          type="password" 
          name='password'
          value={form.password} 
          onChange={handleChange} 
          required 
        />
      </div>
     
      <button type="submit">Login</button>
  
     <p className="signup-text">
  Don't have an account? <a href="/register" className="signup">Sign up here</a>
</p><br/>
<p id="forget"><a href="/forgetpass" id="forgetlink">Forget password</a></p>
 <p>{message}</p>
    </form>
    </div>
    </div>
  );
}

export default Form;
