import "./Ecocont.css";
import { Link } from "react-router-dom";

const Ecocont = ({ exp }) => {
  return (
    <div className="no-contri-page">
      <div className="header-txt-contri">
        <h2 className="contri-h1">Your Recycling Journey So Far</h2>
        <p className="p-contri">
          See how your daily efforts are shaping a greener tomorrow.
        </p>
      </div>

      {exp && exp.length !== 0 ? (
        <div className="ecocont-grid-container">
          {/* 1. Sort by date (optional but recommended) */}
          {[...exp]
            .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
            .map((item) => {
              return (
                // 2. Use item.id from Firestore as the key instead of index
                <div className="ecocont-card" key={item.id}>
                  <div className="ecocont-text-content">
                    {/* 3. Handle potential markdown or multiline text from AI analysis */}
                    <p style={{marginBottom:"15px"}}>{item.text}</p>
                    {/* 4. Optional: Display the date if you stored serverTimestamp */}
                    {item.createdAt && (
                       <span className="contri-date" style={{textDecoration:"underline"}}>
                         {new Date(item.createdAt.seconds * 1000).toLocaleDateString()} <span>(MM-DD-YY)</span>
                       </span>
                    )}
                  </div>
                  <img
                    className="ecocont-image"
                    src={item.img}
                    alt="Contribution Illustration"
                    loading="lazy" // 5. Added for better performance with many images
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x250/CCCCCC/333333?text=Image+Missing";
                    }}
                  />
                </div>
              );
            })}
        </div>
      ) : (
        <div className="No-contri">
          <img src="/logo3.png" alt="nocontri-img" className="No-contri_icon" />
          <p className="No-contri_message">NO-CONTRIBUTION-YET</p>
          <Link className="No-contri_btn" to="/">Start Contributing Now</Link>
        </div>
      )}
    </div>
  );
};

export default Ecocont;