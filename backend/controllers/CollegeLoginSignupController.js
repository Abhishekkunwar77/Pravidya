import jwt from 'jsonwebtoken';
import College from '../models/CollegeLoginSignupModel.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register College
export const registerCollege = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await College.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists' });
    }

    const college = await College.create({ name, email, password });
    res.status(201).json({ success: true, token: generateToken(college._id) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login College
export const loginCollege = async (req, res) => {
  const { email, password } = req.body;
  try {
    const college = await College.findOne({ email });
    if (!college) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await college.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, token: generateToken(college._id) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
