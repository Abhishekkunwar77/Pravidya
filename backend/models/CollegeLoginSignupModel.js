const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CollegeLoginSignupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// password hashing and methods same...

const College = mongoose.model('College', CollegeLoginSignupSchema);
module.exports = College;
