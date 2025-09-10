import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../TeacherStyles/TeacherDashboard.css'; // Your CSS styling

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="tc-dashboard-container">
      <h1 className="tc-dashboard-title">College Dashboard</h1>
      <div className="tc-dashboard-cards">
        <div
          className="tc-dashboard-card"
          onClick={() => navigate('/create-student-account')}
        >
          <h2 className="tc-dashboard-card-title">Create Student Account</h2>
          <p className="tc-dashboard-card-description">
            Add new students to your college
          </p>
        </div>

        <div
          className="tc-dashboard-card"
          onClick={() => navigate('/create-live-quiz')}
        >
          <h2 className="tc-dashboard-card-title">Create Live Quiz</h2>
          <p className="tc-dashboard-card-description">
            Engage students with quizzes in real-time
          </p>
        </div>

        <div
          className="tc-dashboard-card"
          onClick={() => navigate('/assign-assignments')}
        >
          <h2 className="tc-dashboard-card-title">Assign Assignments</h2>
          <p className="tc-dashboard-card-description">
            Assign homework and projects to your students
          </p>
        </div>

        {/* Add more cards as your features grow */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
