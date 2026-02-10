import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import{toast} from "react-toastify";
function Register() {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("blog_rdata", JSON.stringify(regData));
        toast.success("done");
      navigate("/login");
    } else {
      alert("somthing went wrong");
    }
  };

  const validate = () => {
    const newError = {};
    if (!regData.name.trim()) {
      newError.name = "Full name is Required.";
    } else if (regData.name.length <= 3) {
      newError.name = "Minimum 3 Character Required.";
    }
    if (!regData.email.trim()) {
      newError.email = "Email is Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regData.email)) {
      newError.email = "Invalide Email formate.";
    }
    if (!regData.password.trim()) {
      newError.password = "Password is Required.";
    } else if (regData.password.length < 6) {
      newError.password = "Minimum 6 Character Required.";
    }
    if (!regData.conPassword.trim()) {
      newError.conPassword = "Confirm Password is Required.";
    } else if (regData.conPassword.length < 6) {
      newError.conPassword = "Minimum 6 Character Required.";
    } else if (regData.password !== regData.conPassword) {
      newError.conPassword = "Password and Confirm Password are not same!!.";
    }
    if (!regData.phone.trim()) {
      newError.phone = "Phone is Required.";
    } else if (!/^[0-9]{10}$/.test(regData.phone)) {
      newError.phone = "Phone must be in 10 digit.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  return (
    <div className="register-container">
      <h1>Create Account</h1>
      <p>Join Us And Start Our Journey</p>

      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Yoyr Full Name"
            onChange={handleChange}
          />
          {error.name && <span className="error-msg">{error.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Yoyr Email Address"
            onChange={handleChange}
          />
          {error.email && <span className="error-msg">{error.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter Yoyr Phone Number"
            onChange={handleChange}
          />
          {error.phone && <span className="error-msg">{error.phone}</span>}
        </div>
        <div className="password-field">
          <label htmlFor="password">Password</label>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="******"
              onChange={handleChange}
            />

            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error.password && (
            <span className="error-msg">{error.password}</span>
          )}
        </div>

        <div className="password-field">
          <label htmlFor="password">Confirm Password</label>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="conPassword"
              id="conPassword"
              placeholder="******"
              onChange={handleChange}
            />

            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error.conPassword && (
            <span className="error-msg">{error.conPassword}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Alredy have Account ??<Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;