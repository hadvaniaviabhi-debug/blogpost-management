import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import "./Favorites.css";
import { MdDeleteSweep, MdOpenInNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

const Favorites = () => {
  const navigate = useNavigate();
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite posts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteIds =
          JSON.parse(localStorage.getItem("favorites")) || [];

        const response = await fetch("http://localhost:3000/posts");
        const allPosts = await response.json();

        const filtered = allPosts.filter((post) =>
          favoriteIds.includes(post.id)
        );

        setFavoritePosts(filtered);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Remove single favorite
  const removeFavorite = (id) => {
    const updatedIds =
      JSON.parse(localStorage.getItem("favorites"))?.filter(
        (favId) => favId !== id
      ) || [];

    localStorage.setItem("favorites", JSON.stringify(updatedIds));

    setFavoritePosts(favoritePosts.filter((post) => post.id !== id));
  };

  // Clear all favorites
  const clearAll = () => {
    localStorage.removeItem("favorites");
    setFavoritePosts([]);
  };

  return (
    <div className="favorites-page-container">
      <Navbar />

      <main className="favorites-main">
        <div className="favorites-hero">
          <div className="hero-shape"></div>
          <div className="hero-content">
            <h1>Your Reading List</h1>
            <p>Enjoy the collection of stories you've curated</p>
          </div>
        </div>

        <div className="favorites-content">
          <div className="favorites-header">
            <h2>
              Curated Collection
              <span className="count-badge">
                {favoritePosts.length}
              </span>
            </h2>

            {favoritePosts.length > 0 && (
              <button className="clear-all-btn" onClick={clearAll}>
                <MdDeleteSweep size={20} /> Clear List
              </button>
            )}
          </div>

          {loading ? (
            <div className="fav-empty-state">
              <p>Loading favorites...</p>
            </div>
          ) : favoritePosts.length === 0 ? (
            <div className="fav-empty-state">
              <div className="empty-icon-wrapper">
                <FaRegStar className="empty-icon" />
              </div>
              <h3>Your list is empty</h3>
              <p>
                Discover interesting posts and save them to read later
              </p>
              <button
                className="browser-btn"
                onClick={() => navigate("/dashboard")}
              >
                Explore Stories
              </button>
            </div>
          ) : (
            <div className="favorites-grid">
              {favoritePosts.map((post) => (
                <div className="fav-card" key={post.id}>
                  <div className="fav-card-image">
                    <img
                      src={
                        post.image ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500"
                      }
                      alt={post.title}
                    />

                    <div className="fav-card-overlay">
                      <button
                        className="read-btn"
                        onClick={() =>
                          navigate(`/post-details/${post.id}`)
                        }
                      >
                        <MdOpenInNew /> Read Article
                      </button>
                    </div>
                  </div>

                  <div className="fav-card-body">
                    <div className="fav-meta">
                      <span className="fav-author">
                        {post.author || "Anonymous"}
                      </span>
                      <span className="fav-date">
                        {new Date(
                          post.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="fav-title">{post.title}</h3>

                    <p className="fav-excerpt">
                      {post.description ||
                        post.content ||
                        post.excerpt}
                    </p>

                    <button
                      className="remove-fav-btn"
                      onClick={() => removeFavorite(post.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;