import React, {useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
// state to hold form data
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
phone: "",
});
// logic section
const [errors, setErrors] = useState({});
const navigate = useNavigate();

const validate = () => {
const newErrors = {};

if (!formData.name.trim()) {
  newErrors.name = "Full Name is required.";
} else if (formData.name.length <= 3) {
  newErrors.name = "Minimum 3 characters required.";
}
if (!formData.email.trim()) {
  newErrors.email = "Email is required.";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  newErrors.email = "Invalid Email format.";
}
if (!formData.phone.trim()) {
  newErrors.phone = "Phone Number is requried.";
} else if (!/^[0-9]{10}$/.test(formData.phone)) {
  newErrors.phone = "Phone must be in 10 digits.";
}
if (!formData.password.trim()) {
  newErrors.password = "Password is required.";
} else if (formData.password.length < 6) {
  newErrors.password = "Minimum 6 characters requried.";
}
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};
const handleInputChange = (e) => {
// console.log(e.target.name, e.target.value)
setFormData({
//e.target.name = e.target.value

  ...formData,
  [e.target.name]: e.target.value,
});
setErrors({
  ...errors,
  [e.target.name]: "",
});
};
const handleSubmit = (e) => {
e.preventDefault();
if (validate()) {
localStorage.setItem("authData", JSON.stringify(formData));
alert("Registration Successfull…!");
navigate("/login");
}
};

//useEffect(() =>{
// console.log(formData)
//},[formData])

//design section
return (
<>
<div className="form-container">
<h1 className="form-title">REGISTER</h1>
<form onSubmit={handleSubmit}>
{/*NAme field*/}
<div className="form-group">
<label htmlFor="name">Full Name</label>
<input
type="text"
id="name"
name="name"
value={formData.name}
placeholder="Enter your full name"
onChange={handleInputChange}
/>
{errors.name && <span className="error-msg">{errors.name}</span>}
</div>

      {/*Email field*/}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email address"
          onChange={handleInputChange}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>
      {/*phone Number Field*/}
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          placeholder="Enter your phone number"
          onChange={handleInputChange}
        />
        {errors.phone && <span className="error-msg">{errors.phone}</span>}
      </div>
      {/*password field*/}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
        {errors.password && (
          <span className="error-msg">{errors.password}</span>
        )}
      </div>
      {/*Submit Button*/}

      <button type="submit" className="btn-primary">
        Register
      </button>
    </form>

    <p className="link-text">
      Already have an account? <Link to="/login">Login here</Link>
    </p>
  </div>
</>
);
};

export default Register;