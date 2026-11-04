
import { Link } from 'react-router-dom';
import {
  Building2,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Trash2,
  Construction,
  Lightbulb,
  Droplets,
  ClipboardList,
  Clock3,
  Users,
  CheckCircle2,
  Menu,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: <Construction />,
    title: 'Road Problems',
    description: 'Report potholes, damaged roads and infrastructure issues.'
  },
  {
    icon: <Trash2 />,
    title: 'Waste Management',
    description: 'Report garbage accumulation and sanitation problems.'
  },
  {
    icon: <Lightbulb />,
    title: 'Street Lighting',
    description: 'Report broken streetlights and electrical issues.'
  },
  {
    icon: <Droplets />,
    title: 'Water Supply',
    description: 'Report water leakage, drainage and supply problems.'
  }
];

const features = [
  {
    icon: <ClipboardList />,
    title: 'Easy Complaint Submission',
    description: 'Submit civic complaints with descriptions, locations and photographs.'
  },
  {
    icon: <Clock3 />,
    title: 'Real-time Tracking',
    description: 'Follow your complaint progress through different resolution stages.'
  },
  {
    icon: <Users />,
    title: 'Accountable Administration',
    description: 'Connect citizens with municipal staff and administrators.'
  }
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="home-page">

      <header className="home-navbar">
        <div className="home-nav-container">

          <Link to="/" className="home-brand" onClick={closeMenu}>
            <span className="home-brand-icon">
              <Building2 size={25} />
            </span>
            <span>
              <strong>CityCivic</strong>
              <small>CITIZEN SERVICE PORTAL</small>
            </span>
          </Link>

          <button
            className="home-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={`home-nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>

            <Link to="/login" className="home-login" onClick={closeMenu}>
              Login <ArrowRight size={16} />
            </Link>
          </nav>

        </div>
      </header>

      <main>

        <section className="home-hero" id="home">
          <div className="home-hero-content">

            <span className="home-eyebrow">
              <span className="home-status-dot" />
              SMART CIVIC SERVICE PLATFORM
            </span>

            <h1>
              Building Better Cities,
              <span> Together.</span>
            </h1>

            <p>
              A smarter way to connect citizens with municipal
              services. Report civic problems, track complaints
              and contribute towards a better community.
            </p>

            <div className="home-hero-actions">
              <Link to="/register" className="home-primary-btn">
                Get Started <ArrowRight size={18} />
              </Link>

              <Link to="/login" className="home-secondary-btn">
                Track Complaint
              </Link>
            </div>

            <div className="home-trust">
              <ShieldCheck size={18} />
              Transparent. Accountable. Citizen-focused.
            </div>

          </div>

          <div className="home-hero-visual">
            <div className="home-city-card">
              <span className="home-card-label">YOUR CITY, YOUR VOICE</span>
              <Building2 size={65} strokeWidth={1.3} />
              <h2>Better Communities Start Here.</h2>
              <p>Every complaint is an opportunity to improve our city.</p>

              <div className="home-card-footer">
                <CheckCircle2 size={18} />
                Citizen-powered progress
              </div>
            </div>

            <div className="home-floating-card">
              <MapPin size={22} />
              <div>
                <strong>Report an Issue</strong>
                <span>Help improve your neighbourhood</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-services" id="services">
          <div className="home-section-heading">
            <span>OUR SERVICES</span>
            <h2>What would you like to report?</h2>
            <p>Select a civic service category to learn more.</p>
          </div>

          <div className="home-service-grid">
            {services.map((service) => (
              <article className="home-service-card" key={service.title}>
                <div className="home-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/register">
                  Report an issue <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="home-about" id="about">
          <div className="home-about-content">
            <span>ABOUT CITYCIVIC</span>
            <h2>Technology for a better public experience.</h2>
            <p>
              CityCivic provides a structured digital platform
              for citizens to report civic issues and communicate
              with municipal authorities.
            </p>

            <div className="home-feature-list">
              {features.map((feature) => (
                <div className="home-feature" key={feature.title}>
                  <div className="home-feature-icon">{feature.icon}</div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-about-visual">
            <Building2 size={75} strokeWidth={1.2} />
            <h2>Better Cities Start With Us.</h2>
            <p>Every report can make a difference.</p>
          </div>
        </section>

        <section className="home-contact" id="contact">
          <div>
            <span>GET IN TOUCH</span>
            <h2>Let's improve our city together.</h2>
            <p>Connect with our civic service team for assistance.</p>
          </div>

          <div className="home-contact-details">
            <div><Mail size={19} /> support@citycivic.example</div>
            <div><Phone size={19} /> Municipal support centre</div>
          </div>
        </section>

      </main>

      <footer className="home-footer">
        <Link to="/" className="home-footer-brand">
          <Building2 size={22} /> CityCivic
        </Link>
        <p>© {new Date().getFullYear()} CityCivic. All rights reserved.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

    </div>
  );
}

export default HomePage;
