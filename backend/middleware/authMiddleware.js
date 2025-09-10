const jwt = require('jsonwebtoken');
const College = require('../models/CollegeLoginSignupModel');

const protectCollege = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.college = await College.findById(decoded.id).select('-password');

    if (!req.college) {
      return res
        .status(401)
        .json({ success: false, message: 'College not found' });
    }

    next();
  } catch (error) {
    console.error('JWT verify error:', error.message);
    return res
      .status(401)
      .json({ success: false, message: `Token failed: ${error.message}` });
  }
};

module.exports = protectCollege;
