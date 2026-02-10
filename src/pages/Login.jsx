import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
function Login() {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const navigate=useNavigate();

  const handleChange = (e) => {
    setLogData({
      ...logData,
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
      const data = JSON.parse(localStorage.getItem("blog_rdata"));
      if (
        data &&
        data.email === logData.email &&
        data.password === logData.password
      ) {
        localStorage.setItem("blog_ldata", JSON.stringify(logData));
          toast.success("done");
        navigate("/dashboard");
      } else {
        alert("Email And Password Not Match");
      }
    }
  };

  const validate = () => {
    const newError = {};

    if (!logData.email.trim()) {
      newError.email = "Email is Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logData.email)) {
      newError.email = "Invalide Email formate.";
    }
    if (!logData.password.trim()) {
      newError.password = "Password is Required.";
    } else if (logData.password.length < 6) {
      newError.password = "Minimum 6 Character Required.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  return (
    <div className="register-container">
      <h1>Welcome </h1>
      <p>Join Us And Start Our Journey</p>

      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={logData.email}
            placeholder="Enter Yoyr Email Address"
            onChange={handleChange}
          />
          {error.email && <span className="error-msg">{error.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={logData.password}
            onChange={handleChange}
          />
          {error.password && (
            <span className="error-msg">{error.password}</span>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
            <p>Don't have Account??<Link to="/register">Register</Link></p>

    </div>
  );
}

export default Login;