import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { FaInstagram, FaEnvelope , FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section brand">
          <h3>Eco-Sort</h3>
          <p>Making waste management easier, cleaner, and smarter.</p>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <a className="footers-links" href="mailto:clan6229@gmail.com" style={{display:"flex" , alignItems:"center" , justifyContent:"center" , gap:"5px"}}><FaEnvelope /> clan6229@gmail.com</a>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://github.com/reyan3" target="_main"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/reyan-hussain-235a1733b" target="_main"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 Eco-Sort · All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
