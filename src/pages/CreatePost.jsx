import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaHeading,
  FaLink,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import "./CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const fileInput = useRef(null);

  // Get current user
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");
  const defaultAuthor = authData?.username || "User";

  const [formData, setFormData] = useState({
    title: "",
    author: defaultAuthor,
    description: "",
    imageUrl: "",
  });

  const [imageTab, setImageTab] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle normal input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle URL image
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url || null);
  };

  // Handle File Upload
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

  // Remove Image
  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, imageUrl: "" });
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newPost = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        image:
          formData.imageUrl ||
          "https://via.placeholder.com/600x400",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error();

      toast.success("Post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  // Clear Form
  const handleClearForm = () => {
    setFormData({
      title: "",
      author: defaultAuthor,
      description: "",
      imageUrl: "",
    });
    setImagePreview(null);
    setImageTab("url");
    toast.info("Form cleared");
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
          <h1>Create New Post</h1>
          <p>Share your thoughts and stories with the world</p>
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

            {/* Cover Image */}
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
                {loading ? " Publishing..." : " Publish Post"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
