const mongoose = require('mongoose');

const bmiRecordSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    ref: 'User'  // this is fine if email is the unique key in User
  },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  bmi: { type: Number, required: true },
  status: { type: String },
  dietType: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BmiRecord', bmiRecordSchema);
