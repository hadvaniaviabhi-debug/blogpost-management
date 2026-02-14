import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const user = JSON.parse(localStorage.getItem("authData"));
      
      if (user && loginData.email === user.email && loginData.password === user.password) {
        // Store only necessary data in loginData
        const loginSession = {
          email: loginData.email,
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("loginData", JSON.stringify(loginSession));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Welcome Back</h1>
      <p align="center">Please login to your account</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
  <label htmlFor="password">Password</label>
  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={loginData.password}
      placeholder="Enter your password"
      onChange={handleInputChange}
      className={errors.password ? "input-error" : ""}
    />
    <span
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "🐵" : "🙈"}
    </span>
  </div>
  {errors.password && <span className="error-msg">{errors.password}</span>}
</div>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="link-text">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;