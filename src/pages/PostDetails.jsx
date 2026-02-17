import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./PostDetails.css";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="loading-state">Loading post...</div>;
  }

  if (!post) {
    return <div className="error-state">Post not found</div>;
  }

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

            <h1 className="full-post-title">{post.title}</h1>

            <div className="post-author-meta">
              <div className="author-info">
                <div className="author-avatar">
                  {post.author?.charAt(0).toUpperCase() || "A"}
                </div>

                <div>
                  <span className="author-name">
                    {post.author || "Anonymous"}
                  </span>

                  <div className="post-date-row">
                    <span>
                      <FaCalendarAlt />{" "}
                      {post.date ||
                        new Date(
                          post.createdAt || Date.now()
                        ).toLocaleDateString()}
                    </span>

                    <span>
                      <FaClock /> 5 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="post-featured-image">
            <img
              src={
                post.image ||
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
              }
              alt={post.title}
            />
          </div>

          <div className="post-body">
            <p>{post.content || post.description}</p>
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
