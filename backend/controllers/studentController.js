const Student = require('../models/Student');

// Create student
const createStudent = async (req, res) => {
  const { name, email, password } = req.body;
  const collegeId = req.college._id; // Assuming you extract college from auth middleware

  try {
    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already registered' });
    }

    const student = new Student({ name, email, password, collegeId });
    await student.save();

    res
      .status(201)
      .json({ success: true, message: 'Student created successfully' });
  } catch (error) {
    console.error('Error creating student:', error);
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};

// Optionally other controllers e.g. get students for a college, update, delete...

module.exports = { createStudent };
