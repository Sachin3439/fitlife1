import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import  "./Register.css";



function Register() {
      const [form, setForm] = useState({ name: '', email: '', password: '' ,confirmpass:''});
      const [message,setMessage]=useState('');
      const navigate = useNavigate();

  
       const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

       const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await api.post('/register', form);
       if(res.status ===201){
        setMessage(res.data.message);
        setForm({ name: '', email: '', password: '' ,confirmpass:''}); // ✅ clear form after success
        navigate('/thank-you');
      }
    } catch (err) {
  
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
   <div id='bg'>
     <Navbar />
     <div id='regdiv'>
   <form onSubmit={handleSubmit}>
         <h2>Register</h2>
         <div>
            <label>Name:</label><br />
           <input
             type="name"
             name="name"
             value={form.name}
             onChange={handleChange}
             required
           />
           
         </div>
         <div>
           <label>Email:</label><br />
           <input 
             type="email" 
             name="email"
             value={form.email} 
             onChange={handleChange} 
             required 
           />
         </div>
         <div>
           <label>Password:</label><br />
           <input 
             type="password" 
             name="password"
             value={form.password} 
             onChange={handleChange} 
             required 
           />
         </div>
          <div>
           <label>Confirm Password:</label><br />
           <input 
             type="password" 
             name='confirmpass'
             value={form.confirmpass} 
             onChange={handleChange} 
             required 
           />
         </div>
         <button type="submit">Submit</button>
          <p>{message}</p>
       </form>
        </div>
       </div>
  );
}

export default Register