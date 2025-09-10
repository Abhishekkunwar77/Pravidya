// Format generated lesson content for neat, theme-aligned display
function formatLessonContent(text) {
  if (!text) return '';
  // Replace **bold** with <b> and newlines with <br/>
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br/>');
  // Add extra spacing after Remember: and before lists
  html = html.replace(/Remember:/g, '<br/><b>Remember:</b>');
  // Format dashes as list items
  html = html.replace(/- ([^<\n]+)/g, '<li>$1</li>');
  // Wrap lists in <ul>
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  return html;
}



import React, { useState } from 'react';
import './Courses.css';

const YOUTUBE_API_KEY = 'AIzaSyD0_4V8ML0lgFbJcAyoXz71bk0LQSNGj9I';

// Text-based curriculum-aligned subjects for MVP

// Subjects and topics structure
const subjects = [
  {
    key: 'math',
    title: 'Mathematics',
    description: 'Basic to Advanced Math lessons for rural students, aligned with Punjab Board curriculum.',
    image: 'https://tse3.mm.bing.net/th/id/OIP.96E2mjSGv0v2jXVAbyQEtQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    topics: [
      'Numbers & Counting',
      'Addition & Subtraction',
      'Multiplication & Division',
      'Fractions & Decimals',
      'Geometry Basics',
    ],
  },
  {
    key: 'science',
    title: 'Science',
    description: 'Simple Physics, Chemistry, and Biology lessons for foundational understanding.',
    image: 'https://img.freepik.com/free-vector/colorful-science-objects-icons-vector-set_1308-131708.jpg',
    topics: [
      'Plants & Animals',
      'Human Body Basics',
      'States of Matter',
      'Energy (Heat, Light, Electricity)',
      'Simple Machines',
    ],
  },
  {
    key: 'social',
    title: 'Social Science',
    description: 'History, Civics, and Geography basics for young learners.',
    image: 'https://cdnsm5-ss14.sharpschool.com/UserFiles/Servers/Server_13547306/Image/Departments/Social%20Sciences/social%20science.png',
    topics: [
      'Indian History Basics',
      'Geography of Punjab',
      'Community & Society',
      'Government & Civics',
      'Culture & Traditions',
    ],
  },
  {
    key: 'english',
    title: 'English Language & Communication',
    description: 'Learn basic English words and sentences for daily use.',
    image: 'https://thumbs.dreamstime.com/z/learn-english-educational-travelling-concept-learning-english-vector-cartoon-illustration-set-fun-cartooning-objects-128434233.jpg',
    topics: [
      'Alphabets & Phonics',
      'Basic Grammar (Nouns, Verbs, Adjectives)',
      'Sentence Formation',
      'Everyday Communication',
      'Reading Short Stories',
    ],
  },
  {
    key: 'punjabi',
    title: 'Punjabi',
    description: 'Learn Punjabi alphabets and simple words.',
    image: 'https://tse4.mm.bing.net/th/id/OIP._Mp7U5b8FQLRvRqKZllwgwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    topics: [
      'Alphabets & Pronunciation',
      'Vocabulary Basics',
      'Sentence Formation',
      'Everyday Phrases',
      'Simple Stories',
    ],
  },
  {
    key: 'hindi',
    title: 'Hindi',
    description: 'Learn Hindi alphabets and simple sentences.',
    image: 'https://resize.indiatv.in/resize/newbucket/1200_-/2020/02/hindi-language-1582013825.jpg',
    topics: [
      'Alphabets & Pronunciation',
      'Vocabulary Basics',
      'Sentence Formation',
      'Everyday Phrases',
      'Simple Stories',
    ],
  },
];


const Courses = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [lesson, setLesson] = useState('');
  const [search, setSearch] = useState('');
  const [videoCourses, setVideoCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [topicLoading, setTopicLoading] = useState(false);

  // Groq API integration using llama-3-8b-chat
  const fetchGroqLesson = async (subject, topic) => {
    setTopicLoading(true);
    setLesson('');
    setError('');
    const apiKey = '';
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           model: 'llama-3.1-8b-instant',
          messages: [{
            role: 'user',
            content: `Explain the basics of "${topic}" for ${subject.title} in simple language for rural school students in Punjab. Keep it short, clear, and easy to understand.`
          }]
        })
      });
      const data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        setLesson(data.choices[0].message.content);
      } else if (data.error) {
        setLesson('Error: ' + (data.error.message || 'Groq API error.'));
      } else {
        setLesson('No text generated. See console for details.');
        console.error('Unexpected Groq API response:', data);
      }
    } catch (err) {
      setLesson('Request failed: ' + err.message);
    }
    setTopicLoading(false);
  };

  const handleCardClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic('');
    setLesson('');
  };

  const handleCloseModal = () => {
    setSelectedSubject(null);
    setSelectedTopic('');
    setLesson('');
  };

  const handleTopicSelect = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    if (topic) fetchGroqLesson(selectedSubject, topic);
  };

  const handleVideoSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setVideoCourses([]);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(search + ' course')}&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setVideoCourses(data.items);
        setError('');
      } else {
        setVideoCourses([]);
        setError('No matching video courses found.');
      }
    } catch (err) {
      setError('Failed to fetch video courses.');
      setVideoCourses([]);
    }
    setLoading(false);
  };

  return (
    <div className="courses-page">
      <h1 className="courses-title">Explore Text-Based Courses</h1>

      {/* Video Course Search Bar */}
      <form className="courses-search-bar" onSubmit={handleVideoSearch} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Find the video courses here (e.g., Math, Science, Coding...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search Videos</button>
      </form>
      {loading && <div className="courses-loading">Loading...</div>}
      {error && <div className="courses-error">{error}</div>}

      {/* Show YouTube video results if searched, else show text-based courses */}
      {videoCourses.length > 0 ? (
        <div className="courses-grid">
          {videoCourses.map((course) => (
            <div
              className="course-card"
              key={course.id.videoId}
              onClick={() => window.open(`https://www.youtube.com/watch?v=${course.id.videoId}`, '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <img src={course.snippet.thumbnails.high.url} alt={course.snippet.title} className="course-thumbnail" />
              <div className="course-info">
                <h3 className="course-title">{course.snippet.title}</h3>
                <p className="course-channel">{course.snippet.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="courses-grid">
          {subjects.map((subject) => (
            <div
              className="course-card"
              key={subject.key}
              onClick={() => handleCardClick(subject)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={subject.image} 
                alt={subject.title} 
                className="course-thumbnail" 
                style={{ background: '#f5f5f5', objectFit: 'contain', height: '140px', width: '100%' }}
                onError={e => { e.target.onerror = null; e.target.src = 'https://img.icons8.com/fluency/96/book.png'; }}
              />
              <div className="course-info">
                <h3 className="course-title">{subject.title}</h3>
                <p className="course-channel">{subject.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subject/topic modal with Gemini lesson */}
      {selectedSubject && (
        <div className="video-modal" onClick={handleCloseModal}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>×</button>
            <h2>{selectedSubject.title}</h2>
            <div style={{ margin: '1rem 0', fontSize: '1.1rem', color: '#444' }}>{selectedSubject.description}</div>
            <div style={{ margin: '1.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label htmlFor="topic-select" style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#3456b3', fontSize: '1.08rem' }}>Select a topic:</label>
              <select
                id="topic-select"
                value={selectedTopic}
                onChange={handleTopicSelect}
                style={{
                  padding: '0.7rem 1rem',
                  borderRadius: '8px',
                  border: '1.5px solid #4f8cff',
                  fontSize: '1.05rem',
                  background: '#f9faff',
                  color: '#222',
                  outline: 'none',
                  minWidth: '220px',
                  boxShadow: '0 2px 8px rgba(79,140,255,0.07)'
                }}
              >
                <option value="">-- Choose a topic --</option>
                {selectedSubject.topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
            {topicLoading && <div style={{ margin: '1.5rem 0', color: '#4f8cff', fontWeight: 500 }}>Loading lesson...</div>}
            {lesson && !topicLoading && (
              <div
                style={{
                  margin: '1.5rem 0',
                  fontSize: '1.13rem',
                  background: '#f7faff',
                  padding: '1.2rem',
                  borderRadius: '10px',
                  color: '#222',
                  border: '1px solid #e0e7ff',
                  boxShadow: '0 2px 12px rgba(79,140,255,0.07)',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                  fontFamily: 'inherit',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  maxHeight: '350px',
                  overflowY: 'auto',
                }}
                dangerouslySetInnerHTML={{ __html: formatLessonContent(lesson) }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
