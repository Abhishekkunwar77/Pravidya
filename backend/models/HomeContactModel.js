import mongoose from 'mongoose';

const homeContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Invalid phone number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [5, 'Message must be at least 5 characters'],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const HomeContact = mongoose.model('HomeContact', homeContactSchema);
export default HomeContact;
