import React from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import './PostDetails.css'; // Ensure the path is correct
const PostDetails = () => {
   const navigate = useNavigate();  // Initialize the navigate function

 
  const handleBackClick = () => {
    navigate('/Dashboard');  // Navigate to the Dashboard page
  };
  return (
    <div className="post-details-page">
      <Navbar />
      <main className="post-details-container">
        <button className="back-btn" onClick={handleBackClick}>
          <FaArrowLeft />
          Back to Feed
        </button>
        <article className="full-post">
          <header className="post-header">
            <div className="post-category">Journal</div>
            <h1 className="full-post-tilte">Smaple blog post Title</h1>
            <div className="post-author-meta">
              <div className="author-info">
                <div className="author-avatar">A</div>
                <div>
                  <span className="author-name">Admin</span>
                  <div className="post-date-row">
                    <span>
                      <FaCalendarAlt /> 16/02/2026
                    </span>
                    <span>
                      <FaClock /> 5 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="pst-featured-image">
           <img src="" alt="post" />
          </div>
          <div className="post-body">
           <p>
            this is a static blog post content example.
            you can keep your full ui design without any javascript logic.
           </p>
           <p>
            this is a static blog post content example.
            you can keep your full ui design without any javascript logic.
           </p>
          </div>
          <footer className="post-footer">
           <div className="post-share">
            <span>Share this story:</span>
            <div className="share-buttons">
             <button className="share-btn">Twitter</button>
             <button className="share-btn">LinkedIn</button>
             <button className="share-btn">Link</button>

            </div>
           </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default PostDetails;