import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './Components/Footer';
import HomeContact from './Home/Contact/Contact';
import AboutUs from './Pages/AboutUs/Aboutus';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Navbar from './Components/Navbar';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import NewsLetter from './Home/NewsLetter/NewsLetter';
import OverallDashboard from './Pages/OverallDashboard/OverallDashboard';
import LandingPage from './Home/LandingPage/LandingPage.jsx';
import CreateStudentAccount from './Teacher/TeacherComponents/CreateStudentAccount.jsx';
import TeacherDashboard from './Teacher/TeacherComponents/TeacherDashboard.jsx';

// Example Home Component
const Home = () => {
  return (
    <>
    <LandingPage/>
      <NewsLetter />
      <HomeContact />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/overall-dashboard" element={<OverallDashboard />} />
        <Route
          path="/create-student-account"
          element={<CreateStudentAccount />}
        />
        <Route
          path="/teacher-dashboard"
          element={<TeacherDashboard />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer /> {/* visible on all pages */}
    </Router>
  );
};

export default App;
