import React, { useState, useEffect, useRef } from 'react';
import './Aboutus.css';
import aboutAnimation from '../../assets/AboutStudentAnimation.json';
import visionImage from '../../assets/vision.png';
import missionImage from '../../assets/mission.png';
import value1 from '../../assets/value1.png';
import value2 from '../../assets/value2.png';
import value3 from '../../assets/value3.png';
import value4 from '../../assets/value4.png';
import Lottie from 'lottie-react';

const AboutUs = () => {
  const [counters, setCounters] = useState({
    years: 0,
    schools: 0,
    students: 0,
    teachers: 0,
  });

  const targetCounters = {
    years: 2,
    schools: 50,
    students: 1200,
    teachers: 80,
  };
  const statsSectionRef = useRef(null);

  const animateCounters = () => {
    setCounters({ years: 0, schools: 0, students: 0, teachers: 0 });

    const duration = 2000;
    const startTime = performance.now();

    const animateCount = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounters({
        years: Math.floor(progress * targetCounters.years),
        schools: Math.floor(progress * targetCounters.schools),
        students: Math.floor(progress * targetCounters.students),
        teachers: Math.floor(progress * targetCounters.teachers),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      if (statsSectionRef.current) {
        observer.unobserve(statsSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-image">
          <Lottie
            animationData={aboutAnimation}
            loop={true}
            style={{ width: '100%', maxWidth: '550px', height: 'auto' }}
          />
        </div>

        <div className="about-content">
          <h1>Bridging the Education Gap for Rural India</h1>
          <p>
            Pravidya is a digital learning platform built to bring quality
            education, resources, and interactive tools to rural schools,
            ensuring no student is left behind. Our platform combines engaging
            content with user-friendly technology, making learning simple and
            accessible for both students and teachers. With offline-first access
            and localized support, Pravidya empowers rural communities to
            overcome barriers and unlock their true potential.
          </p>

          <a href="#key-achievements" className="about-button-discover">
            Discover More
          </a>
          <a href="#about-contact-form" className="about-button-quote">
            Join the Mission
          </a>
        </div>
      </div>

      <div className="about-services-section">
        {/* Vision */}
        <div className="about-vision-section">
          <div className="about-vision-text">
            <h2>Our Vision</h2>
            <p>
              To create an inclusive digital ecosystem where every child in
              rural India has equal access to knowledge, technology, and
              opportunities. We believe in transforming villages into hubs of
              learning that nurture curiosity, skills, and lifelong success.
            </p>
          </div>
          <div className="about-vision-image">
            <img
              src={visionImage}
              alt="Vision illustration"
              className="about-vision-image-style"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="about-mission-section">
          <div className="about-mission-image">
            <img
              src={missionImage}
              alt="Mission illustration"
              className="about-mission-image-style"
            />
          </div>
          <div className="about-mission-text">
            <h2>Our Mission</h2>
            <p>
              We aim to equip rural schools with digital learning platforms,
              teacher training, and interactive resources that bring education
              alive. By building offline-ready content, multilingual resources,
              and scalable technology, we ensure that no student is left behind
              because of geography or infrastructure challenges.
            </p>
          </div>
        </div>

        {/* Stats */}
        <h2 id="key-achievements" className="key-achievements">
          Our Impact
        </h2>
        <div className="about-stats-section" ref={statsSectionRef}>
          <div className="stat-card">
            <span className="stat-number">{counters.years}+</span>
            <span className="stat-label">Years of Work</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{counters.schools}+</span>
            <span className="stat-label">Schools Reached</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{counters.students}+</span>
            <span className="stat-label">Students Impacted</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{counters.teachers}+</span>
            <span className="stat-label">Teachers Trained</span>
          </div>
        </div>

        {/* Values */}
        <h2 className="value-card-titles">The Pillars of Our Work</h2>
        <section className="about-values-section">
          <div className="value-card">
            <img src={value1} alt="Collaboration" className="value-image" />
            <h3 className="value-title">Collaboration</h3>
            <p className="value-description">
              We work hand-in-hand with schools, teachers, and communities to
              co-create meaningful learning experiences that last beyond the
              classroom.
            </p>
          </div>
          <div className="value-card">
            <img src={value2} alt="Accessibility" className="value-image" />
            <h3 className="value-title">Accessibility</h3>
            <p className="value-description">
              Education should be for everyone. Our resources are affordable,
              offline-friendly, and available in local languages to ensure
              inclusivity.
            </p>
          </div>
          <div className="value-card">
            <img src={value3} alt="Integrity" className="value-image" />
            <h3 className="value-title">Integrity</h3>
            <p className="value-description">
              We commit to ethical practices, transparent partnerships, and a
              student-first approach in everything we do.
            </p>
          </div>
          <div className="value-card">
            <img src={value4} alt="Innovation" className="value-image" />
            <h3 className="value-title">Innovation</h3>
            <p className="value-description">
              From gamified learning to AI-driven assessments, we bring modern
              technology to rural classrooms to spark curiosity and creativity.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
