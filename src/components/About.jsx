import "./About.css";
import { Recycle, MapPin, Users, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
// npm install lucide-react

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-content">
          <h1>
            About <span>EcoSort</span>
          </h1>
          <p>
            EcoSort is a smart waste management initiative that uses AI and
            geolocation to make recycling and proper waste disposal effortless
            for everyone.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At EcoSort, we aim to create cleaner, greener cities by helping users
          identify, classify, and properly dispose of waste. Through intelligent
          recognition and nearby dumping yard suggestions, we simplify how
          people contribute to sustainability.
        </p>
      </section>

      <section className="about-features">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Recycle className="feature-icon" />
            <h3>Smart Waste Classifier</h3>
            <p>
              Upload an image, and EcoSort instantly identifies the waste type
              using AI and suggests proper disposal methods.
            </p>
          </div>

          <div className="feature-card">
            <MapPin className="feature-icon" />
            <h3>Nearby Dumping Yards</h3>
            <p>
              Automatically find the nearest safe dumping or recycling centers
              around your current location.
            </p>
          </div>

          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Community Driven</h3>
            <p>
              Join an eco-friendly community encouraging responsible waste
              management and environmental awareness.
            </p>
          </div>

          <div className="feature-card">
            <Globe2 className="feature-icon" />
            <h3>Sustainable Future</h3>
            <p>
              EcoSort’s goal is to reduce pollution and encourage circular
              economy practices through awareness and technology.
            </p>
          </div>
        </div>

        <section className="about-cta">
          <h2>Join the EcoSort Movement 🌱</h2>
          <p>
            Be part of the change — start sorting smarter and living greener
            today.
          </p>
          <Link to="/" className="cta-btn">Get Started</Link>
        </section>
      </section>
    </div>
  );
};

export default About;
