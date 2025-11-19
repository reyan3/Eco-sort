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
      {exp.length !== 0 ? (
        <div className="ecocont-grid-container">
          {exp.map((item, index) => {
            return (
              <div className="ecocont-card" key={index}>
                <div className="ecocont-text-content">{item.text}</div>
                <img
                  className="ecocont-image"
                  src={item.img}
                  alt="Contribution Illustration"
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
