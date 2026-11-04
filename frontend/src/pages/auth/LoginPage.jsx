
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Login API will be connected in the authentication phase.');
  };

  return (
    <main className="auth-page">

      <div className="auth-brand">
        <Link to="/">
          <Building2 size={28} />
          CityCivic
        </Link>
      </div>

      <section className="auth-card">

        <div className="auth-icon">
          <ShieldCheck size={30} />
        </div>

        <span className="auth-eyebrow">WELCOME BACK</span>
        <h1>Sign in to your account</h1>
        <p className="auth-description">
          Access your civic services and manage your complaints.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email address</label>
          <div className="auth-input-wrapper">
            <Mail size={19} />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="auth-input-wrapper">
            <Lock size={19} />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="auth-extra">
            <label className="remember-label">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="mailto:support@citycivic.example">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-submit">
            Sign In <ArrowRight size={18} />
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>

      </section>

      <p className="auth-bottom">
        <ShieldCheck size={15} /> Secure Civic Service Portal
      </p>

    </main>
  );
}

export default LoginPage;
