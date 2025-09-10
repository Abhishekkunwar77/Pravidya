import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Courses.css';

// Format generated lesson content for neat, theme-aligned display
function formatLessonContent(text) {
  if (!text) return '';
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br/>');
  html = html.replace(/Remember:/g, '<br/><b>Remember:</b>');
  html = html.replace(/- ([^<\n]+)/g, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  return html;
}

const subjects = [
  {
    key: 'math',
    title: 'Mathematics',
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

const fetchGroqLesson = async (subject, topic, setLesson, setLoading) => {
  setLoading(true);
  setLesson('');
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
          content: `Explain the basics of "${topic}" for ${subject.title} in simple and clear language suitable for rural school students in Punjab. Make the explanation fun, engaging, and easy to remember. Use examples, stories, or illustrations wherever possible. Keep the content friendly, happy, and motivating, and try to cover enough details so that students can fully understand the topic without being overwhelmed.
`
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
  setLoading(false);
};

const CourseContent = () => {
  const { subjectKey, topicKey } = useParams();
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);

  // Find subject and topic
  const subject = subjects.find(s => s.key === subjectKey);
  // Try to match topic ignoring spaces/case
  const topic = subject?.topics.find(t => t.replace(/\s|&/g, '').toLowerCase() === topicKey.toLowerCase());

  useEffect(() => {
    if (subject && topic) {
      fetchGroqLesson(subject, topic, setLesson, setLoading);
    }
  }, [subjectKey, topicKey]);

  if (!subject || !topic) {
    return <div className="courses-page" style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f7e8ff 0%, #e0f7fa 100%)' }}><h2 style={{textAlign:'center',marginTop:'4rem',color:'#c62828'}}>Course or topic not found.</h2></div>;
  }

  return (
    <div className="lesson-theme-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f7e8ff 0%, #e0f7fa 100%)',
      color: '#222',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: 0,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 1.5rem',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2.5rem 0 1.2rem 0',
        }}>
          <img src={subject.image} alt={subject.title} style={{ width: 70, height: 70, borderRadius: '12px', objectFit: 'cover', border: '2.5px solid #4f8cff', background: '#fff' }} />
          <div>
            <h1 style={{ color: '#3456b3', fontWeight: 800, fontSize: '2.3rem', margin: 0, letterSpacing: '0.01em' }}>{subject.title}</h1>
            <div style={{ color: '#444', fontWeight: 500, fontSize: '1.18rem', marginTop: '0.2rem', letterSpacing: '0.01em' }}>{topic}</div>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '2px solid #e0e7ff', margin: '0 0 2.2rem 0' }} />
        <div style={{
          fontSize: '1.18rem',
          background: 'none',
          color: '#222',
          lineHeight: 1.85,
          letterSpacing: '0.01em',
          padding: '0 0 3rem 0',
          maxWidth: '100%',
          wordBreak: 'break-word',
          minHeight: 200,
        }}>
          {loading && <div style={{ color: '#4f8cff', fontWeight: 600, margin: '1.5rem 0', fontSize: '1.15rem', textAlign: 'center' }}>Loading lesson...</div>}
          {lesson && !loading && (
            <div
              style={{
                background: 'none',
                color: '#222',
                fontSize: '1.18rem',
                padding: 0,
                border: 'none',
                boxShadow: 'none',
                lineHeight: 1.85,
                letterSpacing: '0.01em',
                fontFamily: 'inherit',
                maxWidth: '100%',
                wordBreak: 'break-word',
                maxHeight: 'none',
                overflowY: 'visible',
              }}
              dangerouslySetInnerHTML={{ __html: formatLessonContent(lesson) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
