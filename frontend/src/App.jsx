import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import LandingPage from './Home/LandingPage/LandingPage.jsx';
import NewsLetter from './Home/NewsLetter/NewsLetter';
import HomeContact from './Home/Contact/Contact';

import AboutUs from './Pages/AboutUs/Aboutus';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import OverallDashboard from './Pages/OverallDashboard/OverallDashboard';
import CreateStudentAccount from './Teacher/TeacherComponents/CreateStudentAccount.jsx';
import TeacherDashboard from './Teacher/TeacherComponents/TeacherDashboard.jsx';
import Faq from './Pages/Faqs/Faq.jsx';
import PageNotFound from './Pages/PageNotFound/PageNotFound';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Home component wrapped to handle scroll-to-contact from FAQ
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }, 300); // small delay for render
      }
      // Clear the state so it doesn't scroll again on back/refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <LandingPage />
      <NewsLetter />
      <HomeContact /> {/* Make sure this has id="contact" */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* scrolls to top on route change */}
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/overall-dashboard" element={<OverallDashboard />} />
        <Route
          path="/create-student-account"
          element={<CreateStudentAccount />}
        />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
