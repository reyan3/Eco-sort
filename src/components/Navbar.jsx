import "./Navbar.css";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
const Navbar = ({ authdetails }) => {
  const [Darkmode, setDarkmode] = useState(false);
  const [Hamburger, setHamburger] = useState(false);

  document.body.classList = Darkmode ? "dark" : "";

  if (Hamburger) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <div className="navbar-container">
        <div className="logo">
          <img src="/logo3.png" alt="Logo" className="logo-img" />
          <span>Eco-Sort</span>
        </div>
        <div className="desktop-links">
          <ul className="navbar-ul">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/contri">Eco-Contri</Link>
            </li>
          </ul>
          <button onClick={() => setDarkmode(!Darkmode)} className="darkBtn">
            {Darkmode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>

        {authdetails}

        <button className="hamburger" onClick={() => setHamburger(!Hamburger)}>
          <GiHamburgerMenu />
        </button>
      </div>

      <div className={`mobile-links ${Hamburger ? "SliderOn" : ""}`}>
        <button className="close-btn" onClick={() => setHamburger(!Hamburger)}>
          <RxCross2 />
        </button>
        <ul className="navbar-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/contri">Eco-Contri</Link>
          </li>
        </ul>
        <button
          onClick={() => setDarkmode(!Darkmode)}
          className="darkBtn darkBtn-mobile"
        >
          {Darkmode ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </>
  );
};

export default Navbar;
