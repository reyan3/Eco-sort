import Home from "./components/Home";
import Map from "./components/Map";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Ecocont from "./components/Ecocont";
import AuthPage from "./components/AuthPage";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Get the Garbages 
  const [Contritab, setContritab] = useState(() => {
    const saved = localStorage.getItem("ecosort_contributions");
    return saved ? JSON.parse(saved) : [];
  });

  // Store The Garbages That Searched
  useEffect(() => {
    localStorage.setItem("ecosort_contributions", JSON.stringify(Contritab));
  }, [Contritab]);

  const [dropdownAvatar, setdropdownAvatar] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ecosort_loggedin"));
    if (saved) setUser(saved);
  }, []);

  if (!user) return <AuthPage onLogin={setUser} />;

  return (
    <Router>
      <Navbar
        authdetails={
          <div
            className="avatar-wrapper"
            onClick={() => setdropdownAvatar(!dropdownAvatar)}
          >
            <img className="avatar-img" src={user.avatar} alt="avatar" />
            <div
              className={`logout-dropdown ${
                dropdownAvatar ? "active-avatar" : ""
              }`}
            >
              <h3>Welcome, {user.name}</h3>
              <span
                onClick={() => {
                  localStorage.removeItem("ecosort_loggedin");
                  alert("Logout successful!");
                  setUser(null);
                }}
                className="log-out"
              >
                Logout
              </span>
            </div>
          </div>
        }
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              Onsave={(txt, imgFile) => {
                const reader = new FileReader();
                reader.onload = () => {
                  setContritab((prev) => [
                    ...prev,
                    {
                      text: txt,
                      img: reader.result, // base64 stored safely
                    },
                  ]);
                };
                reader.readAsDataURL(imgFile); // Convert to base64
              }}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />

        <Route path="/contri" element={<Ecocont exp={Contritab} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
