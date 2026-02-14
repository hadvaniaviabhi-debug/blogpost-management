import { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    Conform_pass: ""
  });
  const [showPassword, setShowPassword] = useState(false);
const [showConformPassword, setShowConformPassword] = useState(false);

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Login
const validate = () => {
  const newErrors = {};

  if (!loginData.name.trim()) {
    newErrors.name = "Full name is required.";
  } else if (loginData.name.length <= 6) {
    newErrors.name = "Minimum 6 characters required.";
  }

  if (!loginData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
    newErrors.email = "Invalid Email format";
  }

  if (!loginData.phone.trim()) {
    newErrors.phone = "Phone Number is required.";
  } else if (!/^[0-9]{10}$/.test(loginData.phone)) {
    newErrors.phone = "Phone must be 10 digits.";
  }

  if (!loginData.password.trim()) {
    newErrors.password = "Password is required.";
  } else if (loginData.password.length <= 6) {
    newErrors.password = "Minimum 6 characters required.";
  }

  if (!loginData.Conform_pass.trim()) {
    newErrors.Conform_pass = "Confirm Password is required.";
  } else if (loginData.Conform_pass.length <= 6) {
    newErrors.Conform_pass = "Minimum 6 characters required.";
  }

  // ✅ New check for matching passwords
  if (loginData.password && loginData.Conform_pass && loginData.password !== loginData.Conform_pass) {
    newErrors.Conform_pass = "Passwords do not match.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleInputChange = (e) => {
    //console.log(e.target.name,e.target.value)

    //e.target.name = e.target.value
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

     setErrors({
    ...errors,
    [e.target.name]: ""
  })

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()){
      localStorage.setItem('authData',JSON.stringify(loginData))
      toast.success("Successfull registration...!")
      navigate("/login")
  }
  };

  return (
    // Name Field
    <div className="form-container">
      <h1 className="form-title">REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={loginData.name}
            placeholder="Enter your full name"
            onChange={handleInputChange}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            placeholder="Enter your Email"
            onChange={handleInputChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={loginData.phone}
            placeholder="Enter your Phone"
            onChange={handleInputChange}
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

       <div className="form-group">
  <label htmlFor="password">Password</label>
  <div style={{ position: "relative" }}>
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={loginData.password}
      placeholder="Enter your password"
      onChange={handleInputChange}
      style={{ paddingRight: "40px" }}
    />
    <span
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      {showPassword ? "🐵" : "🙈"}
    </span>
  </div>
  {errors.password && <span className="error-msg">{errors.password}</span>}
</div>
<div className="form-group">
  <label htmlFor="Conform_pass">Conform Password</label>
  <div style={{ position: "relative" }}>
    <input
      type={showConformPassword ? "text" : "password"}
      id="Conform_pass"
      name="Conform_pass"
      value={loginData.Conform_pass}
      placeholder="Enter your password"
      onChange={handleInputChange}
      style={{ paddingRight: "40px" }}
    />
    <span
      className="toggle-password"
      onClick={() => setShowConformPassword(!showConformPassword)}
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      {showConformPassword ? "🐵" : "🙈"}
    </span>
  </div>
  {errors.Conform_pass && <span className="error-msg">{errors.Conform_pass}</span>}
</div>


        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>

      <p className="link-text">
        Already have an account? <Link to="/Login">Login Here</Link>
      </p>
    </div>
  )
}

export default Register