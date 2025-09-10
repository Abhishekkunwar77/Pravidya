import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './Faq.css';
import { useNavigate } from 'react-router-dom';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const navigate = useNavigate(); // must be inside the component

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };
  const faqData = {
    General: [
      {
        question: 'What is this Pravidya initiative about?',
        answer:
          'It’s a project to provide students in Nabha and nearby rural areas with digital lessons, offline access, and essential computer skills.',
      },
      {
        question: 'Who can use this platform?',
        answer:
          'The platform is built for rural school students, teachers, and administrators, but parents can also track learning progress.',
      },
      {
        question: 'Is the app free to use?',
        answer:
          'Yes. The learning app and resources are provided free to government school students and teachers.',
      },
      {
        question: 'Does it work without internet?',
        answer:
          'Yes. The app is designed to work offline so students can continue learning even without stable internet.',
      },
      {
        question: 'What devices are supported?',
        answer:
          'It runs on low-end smartphones, tablets, and school computers, so no expensive device is required.',
      },
      {
        question: 'Which subjects are covered?',
        answer:
          'The app includes digital literacy modules and interactive lessons in core school subjects like math, science, and languages.',
      },
    ],

    'Problem Description': [
      {
        question: 'What challenges do schools in Nabha face?',
        answer:
          'Most schools have outdated computer systems, poor internet, and limited access to modern digital content.',
      },
      {
        question: 'Why are students struggling with digital literacy?',
        answer:
          'Due to lack of exposure to computers and online tools, students are unable to build essential 21st-century skills.',
      },
      {
        question: 'How are teachers affected?',
        answer:
          'Teachers cannot use interactive or digital teaching methods effectively, as infrastructure and resources are lacking.',
      },
      {
        question: 'Does poor internet make it worse?',
        answer:
          'Yes, unreliable connectivity means even basic resources like online videos or e-books can’t be accessed smoothly.',
      },
      {
        question: 'What does this mean for students’ future?',
        answer:
          'They fall behind their urban peers, reducing chances of higher education and good career opportunities.',
      },
      {
        question: 'Is the issue only about devices?',
        answer:
          'No. It’s also about awareness, training, and providing content that students and teachers can actually use.',
      },
      {
        question: 'Why focus on Nabha and nearby rural areas?',
        answer:
          'These areas reflect the wider rural-urban divide in Punjab, making them a priority for digital upliftment.',
      },
    ],

    Impact: [
      {
        question: 'Why is solving this problem urgent?',
        answer:
          'If ignored, rural students will continue to lag in education and jobs, widening the gap with urban areas.',
      },
      {
        question: 'How will students benefit?',
        answer:
          'They gain digital skills, confidence, and equal access to modern educational resources.',
      },
      {
        question: 'What’s the impact on teachers?',
        answer:
          'Teachers can use better teaching tools and track student performance digitally.',
      },
      {
        question: 'How do parents benefit?',
        answer:
          'Parents see their children learning modern skills and preparing for future job opportunities.',
      },
      {
        question: 'What’s the broader social impact?',
        answer:
          'Digitally educated youth uplift rural communities, creating new opportunities and reducing migration pressures.',
      },
      {
        question: 'Will it improve employability?',
        answer:
          'Yes. Students gain the computer skills employers now expect in almost every profession.',
      },
      {
        question: 'Does this support equality in education?',
        answer:
          'Yes. It reduces the digital divide and gives rural students the same opportunities as urban ones.',
      },
    ],

    Outcomes: [
      {
        question: 'What will be delivered through this project?',
        answer:
          'A mobile and web-based learning app with offline mode, interactive lessons, and teacher dashboards.',
      },
      {
        question: 'How does offline access help?',
        answer:
          'Students can continue learning even in areas with poor or no internet connectivity.',
      },
      {
        question: 'Will local language content be included?',
        answer:
          'Yes. Lessons in Punjabi and other local languages will help students learn more effectively.',
      },
      {
        question: 'What support is there for teachers?',
        answer:
          'Teachers get dashboards to track progress and training to use digital tools confidently.',
      },
      {
        question: 'Can it run on school computers?',
        answer:
          'Yes. The app is lightweight and runs smoothly on low-end computers and smartphones.',
      },
      {
        question: 'Does it cover digital literacy?',
        answer:
          'Yes. Students learn basics like typing, safe browsing, and using educational apps.',
      },
      {
        question: 'Can this model scale to other regions?',
        answer:
          'Yes. Once successful in Nabha, it can be replicated across Punjab and beyond.',
      },
    ],

    Stakeholders: [
      {
        question: 'Who benefits the most?',
        answer:
          'Students in rural government schools benefit the most, gaining digital access and skills.',
      },
      {
        question: 'How do teachers gain?',
        answer:
          'Teachers get modern teaching resources and tools to better engage with students.',
      },
      {
        question: 'What about school administrators?',
        answer:
          'Administrators can track digital usage, student outcomes, and overall school performance.',
      },
      {
        question: 'Do parents have a role?',
        answer:
          'Yes. Parents can encourage children to use the app and track their learning progress.',
      },
      {
        question: 'How does the Punjab Education Department benefit?',
        answer:
          'It strengthens government schools and ensures education equality across the state.',
      },
      {
        question: 'Will communities see change?',
        answer:
          'Yes. Skilled students bring knowledge back to their villages, uplifting entire communities.',
      },
      {
        question: 'Can NGOs or partners get involved?',
        answer:
          'Yes. Collaborations are welcome to expand content, training, and reach more schools.',
      },
    ],
  };

  const categories = Object.keys(faqData);

  return (
    <div className="faq-wrapper">
      <div className="faq-header">
        <h1>Looking for answers?</h1>
        <p>
          Empowering Rural Students with Digital Skills – Your Questions
          Answered
        </p>
      </div>

      {/* Category Buttons */}
      <div className="faq-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`faq-category-btn ${
              selectedCategory === cat ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs */}
      {faqData[selectedCategory].map((faq, index) => (
        <div
          className="faq-item"
          key={index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <h3>
            {faq.question}
            <FaChevronDown
              className={openIndex === index ? 'rotate' : ''}
              style={{
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
              }}
            />
          </h3>
          <p className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
            {faq.answer}
          </p>
        </div>
      ))}
      <div className="faq-cta-card">
        <h3 className="faq-cta-title">Still have questions?</h3>
        <p className="faq-cta-text">
          Can't find the answer you need? Our team is here to help you.
        </p>
        <button onClick={handleContactClick} className="faq-contact-btn">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Faq;
