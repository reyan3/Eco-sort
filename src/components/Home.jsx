import { useState } from "react";
import { Link } from "react-router-dom";

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_KEY = import.meta.env.VITE_API;

const Home = ({ Onsave }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Dragactive, setDragactive] = useState(false);

  if (loading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setResult("");
      setError("");
    }
  };

  const HandleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragactive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setResult("");
      setError("");
    } else {
      setError("Please drop a valid image file.");
    }
  };

  const HandleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragactive(true);
  };

  const HandleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragactive(false);
  };

  // Core: Send image to Gemini API
  const classifyGarbage = async () => {
    if (!image) return setError("Please upload an image first.");

    setLoading(true);
    setResult("");
    setError("");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;


      // For Adequate Use Of Api Extract Previous Stored Garbages
      const cachedResult = localStorage.getItem(base64Image);
      if (cachedResult) {
        setResult(cachedResult);
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      try {
        const maxRetries = 3;
        let attempt = 0;
        let response;

        // Retry logic with exponential backoff
        while (attempt < maxRetries) {
          response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Analyze the uploaded image and identify what type of object it is (e.g., plastic bottle, banana peel, cardboard box, aluminum can, etc.).
Then, determine whether it is recyclable or non-recyclable and provide:
1. A clear label like: ♻️ Recyclable or 🚫 Non-Recyclable.
2. A one-line reason why it is recyclable or not.
3. A short, clear guide on how to recycle or safely dispose of it (in 1–2 lines).
4. Keep the answer friendly and easy to read with relevant emojis.
Respond in plain text without using any markdown or formatting symbols.
Give These in the following format : 

Object Type : 

Recyclable Label : 

Reason : 

Disposal Guide : 
`,
                    },
                    {
                      inlineData: {
                        mimeType: image.type,
                        data: base64Image,
                      },
                    },
                  ],
                },
              ],
            }),
          });

          if (response.ok) break;

          if (!response.ok)
            throw new Error(`API request failed (status: ${response.status})`);

          attempt++;

          if (attempt < maxRetries) {
            await new Promise((r) => setTimeout(r, 1000));
          }
        }

        const data = await response.json();
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, the model could not analyze this image.";

        // base64Image Acts as key for for finding similar img and then store "text" in it  
        localStorage.setItem(base64Image, text);

        setResult(text);
        Onsave(text, image);
      } catch (err) {
        console.error("Gemini API Error:", err);
        setError("Failed to connect to the AI service. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image);
  };
  return (
    <>
      {loading && (
        <div className="loading">
          <img src="/loadinggif.gif" alt="load" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <div
        className="realdiv"
      >
        <div className="GarbageCard">
          <div className="headings">
            <h2>Your Green Impact Starts Here: Verify Recyclables</h2>
            <h4>Note : Please use high-resolution photos. This guarantees efficient analysis and prevents wasteful usage of API tokens.</h4>
          </div>

          <input
            type="file"
            accept="image/*"
            id="fileUpload"
            onChange={handleImageChange}
            hidden
          />
          <div
            onDragOver={HandleDragOver}
            onDragLeave={HandleLeave}
            onDrop={HandleDrop}
          >
            {image ? (
              <div className="image-display">
                <img src={URL.createObjectURL(image)} alt="img" />
                <button className="findBtn" onClick={classifyGarbage}>
                  Classify The Garbage
                </button>
              </div>
            ) : (
              <label htmlFor="fileUpload" className="NoImgdisplay">
                <p className="dropzone-icon">🖼️</p>
                <h3>
                  {Dragactive
                    ? "Drop Here!"
                    : "Drag & Drop Your Garbage Image Here"}
                </h3>
                <p className="dropzone-subtext">— OR —</p>
                <p className="dropzone-subtext">
                  Click "Choose File" above to select an image from your device.
                </p>
              </label>
            )}
          </div>

          {result && <div className="Explanation-tab">{result}</div>}

          {result && (
            <Link to="/map" className="DumpYardbtn">
              Search For Nearest Dumping Yard
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
