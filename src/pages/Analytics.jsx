import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import "./Analytics.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "react-toastify";

const Analytics = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const COLORS = ["#0088fe", "#00d49f", "#ffbb28", "#ff8042"];

  // ✅ Fetch Posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/posts");

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Post
  const handleDeletePost = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (!confirmDelete) return;

      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    }
  };

  // ✅ Calculate Posts Per Author
  const authorStats = posts.reduce((acc, post) => {
    const author = post.author || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const chartDataUpdated = Object.keys(authorStats).map((author) => ({
    name: author,
    posts: authorStats[author],
  }));

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="analytics-page">
      <Navbar />

      <main className="analytics-main">
        <header className="analytics-header">
          <h1>Blog Analytics</h1>
          <p>Insights into your blog performance and activities</p>
        </header>

        {/* Charts Section */}
        <div className="charts-container">
          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Posts per Author</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartDataUpdated}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#8884d8" name="Number of Posts" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <h3>Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartDataUpdated}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="posts"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartDataUpdated.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <div className="posts-table-section">
          <h3>All Posts</h3>

          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="loading-state">
                      Loading posts...
                    </td>
                  </tr>
                ) : currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.author || "Anonymous"}</td>
                      <td>{post.title}</td>
                      <td>
                        {new Date(
                          post.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </td>
                      <td className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/edit-post/${post.id}`)
                          }
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-posts">
                      No posts yet. Be the first to create a post!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(Math.ceil(posts.length / postsPerPage))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`page-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              className="page-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(posts.length / postsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
