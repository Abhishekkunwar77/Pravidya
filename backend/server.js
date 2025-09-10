const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const subscriberRoutes = require('./routes/subscriberRoutes.js');
const homeContactRoute = require('./routes/HomeContactRoute.js');
const collegeRoutes = require('./routes/CollegeLoginSignupRoutes.js');
const errorHandler = require('./middleware/errorMiddleware.js');
const studentRoutes= require('./routes/studentRoutes.js')
dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contacts', homeContactRoute);
app.use('/api/college', collegeRoutes);
app.use('/api/students', studentRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
