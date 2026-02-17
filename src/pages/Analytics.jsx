import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

const Analytics = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(false); // State for loading state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const postsPerPage = 4; // Define how many posts per page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Placeholder data for chart
  const chartData = [
    { name: "Admin", posts: 5 },
    { name: "User", posts: 3 },
    { name: "Test", posts: 4 },
    { name: "Demo", posts: 2 },
  ];

  const headers = [
    { label: "ID", key: "id" },
    { label: "Author", key: "author" },
    { label: "Title", key: "title" },
    { label: "Date", key: "createdAt" },
    { label: "Action", key: "action" },
  ];

  const COLORS = ["#0088fe", "#00d49f", "#ffbb28", "#ff8042"];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Calculate posts per author
  const authorStats = posts.reduce((acc, post) => {
    const author = post.author || 'unknown';
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const chartDataUpdated = Object.keys(authorStats).map((author) => ({
    name: author,
    posts: authorStats[author],
  }));

  // Placeholder functions for edit and delete
  const handleEdit = (id) => {
    console.log("Edit post with ID:", id);
    // You can implement the actual logic here, e.g., navigate to an edit form
  };

  const handleDelete = (id) => {
    console.log("Delete post with ID:", id);
    // You can implement the actual delete logic here, e.g., making an API call to delete the post
  };

  // Fetch posts when the component mounts
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

        <div className="charts-container">
          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Posts per Author</h3>
            <div className="chart-wrapper">
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
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <h3>Distribution</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartDataUpdated}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="posts"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartDataUpdated.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="posts-table-section">
          <h3>All Posts</h3>
          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="loading-state">Loading posts...</div>
                ) : currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => (
                    <tr key={index}>
                      <td>{post.id}</td>
                      <td>{post.author || "Anonymous"}</td>
                      <td>{post.title}</td>
                      <td>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</td>
                      <td className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEdit(post.id)}>
                          ✏️
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="no-posts">
                    <p>No posts yet. Be the first to create a post!</p>
                  </div>
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
            {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
              <button
                key={index}
                className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
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