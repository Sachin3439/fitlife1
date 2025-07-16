const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('./models/User'); // ✅ Make sure this exists
const BmiRecord = require('./models/BmiRecord');
const Subscriber = require('./models/Subscriber');
const otpStore = {}; 

const app = express();
app.use(cors({
  origin: [ 'https://fitlife1.vercel.app'],
  methods:["POST","GET"],
  credentials:true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));


  // ✅ GLOBAL TRANSPORTER (accessible in all routes)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



// Register route

app.post('/register', async (req, res) => {
  try {
    const { name, email, password,confirmpass } = req.body;

    // Validation
    if (!name || !email || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(password!==confirmpass){
        return res.status(400).json({message:'password and confirm password must be same!'});
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    


  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Login Route
app.post('/login', async (req, res) => {
  const {email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
     
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// BMI Route
app.post('/bmi', async (req, res) => {
  const { email, weight, height, age, gender, bmi, status, dietType } = req.body;

  console.log('Incoming BMI data:', req.body);  // 👈 Add this

  try {
    const existing = await BmiRecord.findOne({ email });

    if (existing) {
      await BmiRecord.updateOne(
        { email },
        { $set: { weight, height, age, gender, bmi, status, dietType, updatedAt: Date.now() } }
      );
      console.log('BMI record updated for', email);  // 👈
      return res.json({ message: 'BMI record updated successfully' });
    } else {
      const newRecord = new BmiRecord({ email, weight, height, age, gender, bmi, status, dietType });
      await newRecord.save();
      console.log('New BMI record saved for', email);  // 👈
      return res.json({ message: 'BMI record saved successfully' });
    }
  } catch (err) {
    console.error('BMI save error:', err);
    res.status(500).json({ message: 'Server error saving BMI data' });
  }
});

//bmi data fetch
app.get('/bmi/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const record = await BmiRecord.findOne({ email });
    if (!record) {
      return res.status(404).json({ message: 'No BMI record found' });
    }
    res.json(record);
  } catch (err) {
    console.error('Fetch BMI error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Subscribe route
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  console.log("📩 Incoming subscription request for:", email);

  try {
    let existing = await Subscriber.findOne({ email });

    if (!existing) {
      await Subscriber.create({ email });
      console.log("✅ Email saved to database");
    } else {
      console.log("⚠️ Email already exists, still sending confirmation email...");
    }

    // Email transporter config
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"FitLife" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Thank You for Subscribing to FitLife!',
      text: `Welcome to FitLife!\n\nWe're excited to have you on board. Look out for weekly fitness tips, diet plans, and motivation.\n\nStay strong 💪,\nTeam FitLife`,
    };

    // 🛡️ Separate email send block to catch issues clearly
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Confirmation email sent to:", email);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      return res.status(500).json({ message: 'Email sending failed. Try again later.' });
    }

    res.status(200).json({
      success: true,
      message: existing
        ? 'Already subscribed. Confirmation email resent.'
        : 'Subscribed and confirmation email sent.',
    });

  } catch (error) {
    console.error('❌ Database or general error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Optional: For debugging in browser
app.get('/subscribe', (req, res) => {
  res.send('🔒 This route is only for POST. Please submit the subscription form from the frontend.');
});



// Send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"FitLife" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Reset Password
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { $set: { password: hashedPassword } });
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update password' });
  }
});



// ✅ API Route to Send Mail
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
   
  // ✅ GLOBAL TRANSPORTER (accessible in all routes)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
  const mailOptions = {
    from: email,
    to: 'careerladder2025@gmail.com', // your receiving email
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});


// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
