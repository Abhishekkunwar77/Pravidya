import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import Courses from './Pages/Courses/Courses.jsx';
import CourseContent from './Pages/Courses/CourseContent.jsx';

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
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state to prevent repeated scrolling on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  return (
    <>
      <LandingPage />
      <NewsLetter />
      <HomeContact /> {/* Ensure this has id="contact" */}
    </>
  );
};


const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
];

const App = () => {
  const { t, i18n } = useTranslation();

  // Set language and remember in localStorage
  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      {/* Language Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.2rem',
        background: 'linear-gradient(90deg, #e0e7ff 0%, #f7e8ff 100%)',
        padding: '0.7rem 0 0.7rem 0',
        borderBottom: '1.5px solid #e0e7ff',
      }}>
        <span style={{ fontWeight: 600, color: '#3456b3', fontSize: '1.08rem' }}>{t('welcome')}</span>
        <span style={{ color: '#aaa', fontSize: '1.1rem' }}>|</span>
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              background: i18n.language === l.code ? '#4f8cff' : '#fff',
              color: i18n.language === l.code ? '#fff' : '#3456b3',
              border: '1.5px solid #4f8cff',
              borderRadius: '7px',
              padding: '0.35rem 1.1rem',
              fontWeight: 600,
              fontSize: '1.01rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
            }}
          >
            {l.label}
          </button>
        ))}
        <span style={{ color: '#aaa', fontSize: '1.1rem' }}>|</span>
        <span style={{ color: '#3456b3', fontWeight: 500 }}>{t('startLesson')}</span>
      </div>
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
        <Route path="/courses" element={<Courses />} />
        {/* Dynamic route for course content */}
        <Route path="/courses/:subjectKey/:topicKey" element={<CourseContent />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
