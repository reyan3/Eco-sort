import Home from "./components/Home";
import Map from "./components/Map";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Ecocont from "./components/Ecocont";
import AuthPage from "./components/AuthPage";
import { useEffect, useState } from "react";
import { auth } from "./Firebase.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./Firebase.js";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [dropdownAvatar, setdropdownAvatar] = useState(false);

  const [Contritab, setContritab] = useState([]);


  // 2. Fetch contributions from Firestore when user is logged in
  useEffect(() => {
    if (!user) return;

    // Query contributions where userId matches current logged-in user
    const q = query(
      collection(db, "contributions"), 
      where("userId", "==", user.uid)
    );
    // Real-time listener: updates UI automatically when DB changes
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContritab(data);
    });

    return () => unsubscribe();
  }, [user]);

// Save new contribution to Firestore
  const saveContribution = async (txt, imgFile) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await addDoc(collection(db, "contributions"), {
          text: txt,
          img: reader.result, // Base64 string
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error saving to Firestore:", err);
      }
    };
    reader.readAsDataURL(imgFile);
  };

// Listen for Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user object to match your UI needs
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${firebaseUser.email}`,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle Logout with Firebase
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Prevent flickering while checking auth state
  if (loading) return <div className="loading"><img src="/loadinggif.gif" alt="load"/></div>;

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
                onClick={handleLogout}
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
              Onsave={saveContribution}
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
