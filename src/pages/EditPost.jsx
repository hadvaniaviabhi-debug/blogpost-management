import { useEffect, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaHeading,
  FaLink,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import "./CreatePost.css";

const EditPost = () => {
  const { id } = useParams(); // get post id from URL
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  });

  const [imageTab, setImageTab] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        setFormData({
          title: data.title,
          author: data.author,
          description: data.description,
          imageUrl: data.image,
        });

        setImagePreview(data.image);
      } catch (error) {
        toast.error("Failed to load post");
        navigate("/dashboard");
      }
    };

    fetchPost();
  }, [id, navigate]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle Image URL
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url || null);
  };

  // 🔹 Handle File Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Remove Image
  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, imageUrl: "" });
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  // 🔹 Submit Updated Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedPost = {
        ...formData,
        image:
          formData.imageUrl ||
          "https://via.placeholder.com/600x400",
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(
        `http://localhost:3000/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Post updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <Navbar
        onLogout={() => {
          localStorage.removeItem("authData");
          navigate("/login");
        }}
      />

      <div className="create-post-container">
        <header className="form-header">
          <h1>Edit Post</h1>
          <p>Update your post details</p>
        </header>

        <div className="post-form-card">
          <form onSubmit={handleSubmit}>
            
            {/* Title */}
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Author */}
            <div className="form-group">
              <label>Author Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Image Section */}
            <div className="form-group">
              <label>Cover Image</label>

              {!imagePreview && (
                <div className="image-source-tabs">
                  <button
                    type="button"
                    className={`tab-btn ${imageTab === "url" ? "active" : ""}`}
                    onClick={() => setImageTab("url")}
                  >
                    Image URL
                  </button>

                  <button
                    type="button"
                    className={`tab-btn ${imageTab === "file" ? "active" : ""}`}
                    onClick={() => setImageTab("file")}
                  >
                    Upload File
                  </button>
                </div>
              )}

              {imageTab === "url" && !imagePreview && (
                <div className="input-wrapper">
                  <FaLink className="input-icon" />
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={handleImageUrlChange}
                    className="form-control"
                  />
                </div>
              )}

              {imageTab === "file" && !imagePreview && (
                <div
                  className="image-upload-area"
                  onClick={() => fileInput.current.click()}
                >
                  <FaCloudUploadAlt className="upload-icon" />
                  <p>Click to upload image</p>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="form-actions-row">
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                <FaRegPaperPlane />
                {loading ? " Updating..." : " Update Post"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
