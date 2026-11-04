
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    alert('Registration API will be connected in the authentication phase.');
  };

  return (
    <main className="auth-page">

      <div className="auth-brand">
        <Link to="/">
          <Building2 size={28} />
          CityCivic
        </Link>
      </div>

      <section className="auth-card register-card">

        <div className="auth-icon">
          <User size={30} />
        </div>

        <span className="auth-eyebrow">JOIN CITYCIVIC</span>
        <h1>Create your account</h1>
        <p className="auth-description">
          Register to report and track civic complaints.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="fullName">Full name</label>
          <div className="auth-input-wrapper">
            <User size={19} />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="registerEmail">Email address</label>
          <div className="auth-input-wrapper">
            <Mail size={19} />
            <input
              id="registerEmail"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="phone">Phone number</label>
          <div className="auth-input-wrapper">
            <Phone size={19} />
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="registerPassword">Password</label>
          <div className="auth-input-wrapper">
            <Lock size={19} />
            <input
              id="registerPassword"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="auth-input-wrapper">
            <Lock size={19} />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Create Account <ArrowRight size={18} />
          </button>

        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Sign in</Link>
        </p>

      </section>

      <p className="auth-bottom">
        <ShieldCheck size={15} /> Your information is protected
      </p>

    </main>
  );
}

export default RegisterPage;
