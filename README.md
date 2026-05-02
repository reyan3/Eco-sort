# Eco-Sort

> Detects whether a piece of garbage is recyclable (or not) and shows the nearest dumping yard. Built with React, Firebase, and modern web APIs — with cloud-based user authentication and contribution tracking.
> **Live site:** https://ecosortnew.netlify.app/

---

## Demo

<img width="700" height="400" alt="Screenshot 2025-11-20 191652" src="https://github.com/user-attachments/assets/adf9469a-bae0-4abf-89ef-85d120564114" />
<img width="700" height="400" alt="Screenshot 2025-11-20 191639" src="https://github.com/user-attachments/assets/92fbbb87-6d6a-4548-8c27-88b5d4d2a52b" />
<img width="700" height="400" alt="Screenshot 2025-11-20 191706" src="https://github.com/user-attachments/assets/090bb663-b6e1-49f2-b08d-cc0a6e38d6c0" />
<img width="700" height="400" alt="Screenshot 2025-11-20 191730" src="https://github.com/user-attachments/assets/1c91ebc8-7bec-44af-83cd-744a7f3c6dfa" />
<img width="700" height="400" alt="Screenshot 2025-11-20 191719" src="https://github.com/user-attachments/assets/a66ec97f-9d5b-4f15-90ca-a5e90e249a92" />

---

## Features

* **Firebase Authentication** - Secure user login and registration
* **Password Reset** - Email-based password recovery via Firebase
* **Cloud Storage** - User contributions synced to Firebase Firestore
* Image / camera-based garbage detection (uses Gemini API for model inference)
* Shows whether an item is **Recyclable / Non-recyclable**
* Finds and displays the **nearest dumping yard** using `react-leaflet` maps
* Cloud-based contribution history (date, image, detected label) synced across devices
* User avatar generation with DiceBear API
* Dark mode (user-toggle, persisted)
* Mobile-friendly & accessible UI
* Clean icons via `react-icons` and `lucide-react`

---

## Live website

**URL:** https://ecosortnew.netlify.app/

---

## Tech Stack

* **Frontend:** React
* **Backend & Auth:** Firebase (Authentication, Firestore Database)
* **Routing:** react-router-dom
* **Maps:** react-leaflet + Leaflet
* **Detection model:** Google Gemini API (vision model for garbage classification)
* **Icons:** react-icons, lucide-react
* **Avatars:** DiceBear API
* **Storage:** Firebase Firestore (cloud-based user contributions)
* **Other:** REST API endpoints for server-side needs

---

## Getting started (local)

1. **Clone the repo**

   ```bash
   git clone https://github.com/<your-username>/eco-sort.git
   cd eco-sort
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up Firebase**

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** with Email/Password provider
   - Enable **Firestore Database** in production mode
   - Copy your Firebase config object

4. **Create environment variables**

   Create a `.env` file in the project root:

   ```env
   # Gemini API
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   
   # Map Configuration
   REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
   REACT_APP_MAP_TILE_ATTR="&copy; OpenStreetMap contributors"
   ```

   **Important:** Do NOT commit API keys to git. Use environment variables or your hosting secret manager.

5. **Configure Firestore Security Rules**

   In your Firebase Console, set up Firestore security rules:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/contributions/{contributionId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

6. **Run locally**

   ```bash
   npm start
   # or
   yarn start
   ```

7. **Build for production**

   ```bash
   npm run build
   # or
   yarn build
   ```

---

## Firebase Features

### Authentication
- **Sign Up:** Users can create accounts with email and password
- **Sign In:** Secure login with Firebase Authentication
- **Password Reset:** Email-based password recovery
- **Session Management:** Automatic token refresh and secure logout

### Cloud Database (Firestore)
- User contributions are stored in Firestore under `/users/{userId}/contributions`
- Each contribution includes:
  - Timestamp
  - Image URL or data
  - Detection result (recyclable/non-recyclable)
  - Item classification
- Contributions sync across all user devices
- Real-time updates when new contributions are added

### Data Migration
If you previously used `localStorage`, the app automatically migrates local contributions to Firebase on first login.

---

## Usage notes

* **Authentication:** Users must sign up or log in to save contributions
* **Password Recovery:** Click "Forgot Password?" on the login page to receive a reset email
* The app calls the Gemini API to classify images. Ensure your API key has vision inference enabled
* Map pins for dumping yards are determined by a local dataset or server endpoint. Update `src/services/mapService.js` with your list of dumping yards
* Contributions are now stored in Firebase Firestore and synced across devices for logged-in users

---

## Environment & API security

* Keep API keys secret. On production deployments (Netlify / Vercel), set keys in the platform's environment variable settings
* Firebase config can be public (API key is not a secret), but protect your Firestore with security rules
* Use Firestore security rules to ensure users can only access their own contributions
* For Gemini API calls, consider proxying through a serverless function to avoid exposing credentials
* Implement rate limiting and input validation for all API calls

---

## Accessibility & privacy

* **Geolocation:** Uses browser `navigator.geolocation` API — users must grant permission
* **Authentication:** Email/password stored securely via Firebase Authentication
* **Data Storage:** User contributions stored in Firebase Firestore with user-specific access controls
* **Privacy:** User data is protected by Firebase security rules; only authenticated users can access their own data
* **Password Reset:** Secure email-based recovery flow
* For any personally identifying data, follow GDPR and local privacy laws

---

## Folder structure (example)

```
/src
  /components
    Navbar.jsx
    Home.jsx
    Map.jsx
    Detector.jsx
    Contributions.jsx
    Auth/
      Login.jsx
      SignUp.jsx
      ForgotPassword.jsx
  /services
    geminiService.js
    mapService.js
    firebaseService.js
    authService.js
  /config
    firebase.js
  /styles
  App.jsx
  index.jsx
```

---

## Bug Fixes & Updates

This version includes:
- ✅ Firebase Authentication integration
- ✅ Password reset functionality
- ✅ Cloud-based contribution storage
- ✅ Data migration from localStorage to Firestore
- ✅ Improved error handling
- ✅ Security rule implementation
- ✅ Cross-device sync for contributions
- ✅ Various UI/UX improvements

---

## Contributing

Contributions are welcome! Suggested workflow:

1. Fork the repo
2. Create a branch: `feature/your-feature` or `fix/bug-description`
3. Test authentication and Firebase integration
4. Open a PR with a description of changes
5. Keep PRs small and focused (feature, fix, styles)

Please ensure:
- Firebase configuration is not hardcoded
- Firestore security rules are properly configured
- Error handling is implemented for auth flows
- Code follows existing patterns and conventions

---

## Acknowledgements & Copyrights

The Eco-Sort project incorporates third-party software, APIs, and assets. All rights and copyrights belong to their respective owners:

* **React** — Copyright Meta Platforms, Inc.
* **Firebase** — Copyright Google LLC (Authentication, Firestore)
* **react-router-dom** — Copyright contributors of the react-router project
* **Leaflet & react-leaflet** — Leaflet and react-leaflet contributors (open-source map library)
* **DiceBear** — DiceBear avatars API (avatars generated via DiceBear)
* **Gemini API / Google** — Google (Gemini) — used for image/model inference; subject to Google API Terms of Service
* **react-icons** — React Icons contributors
* **lucide-react** — Lucide contributors
* **OpenStreetMap tiles** — OpenStreetMap contributors (respect tile provider's terms & attribution)
* Any other third-party libraries, icons, fonts or assets used are the property of their respective authors and are used according to their licenses. Please see `package.json` and the libraries' repositories for precise license texts.

---

## License

This repository (Eco-Sort) is released under the **MIT License**.

```
MIT License

Copyright (c) 2025 Eco-Sort

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Troubleshooting

### Firebase Issues
* **Authentication errors:** Verify Firebase config in `.env` matches your Firebase Console
* **Firestore permission denied:** Check security rules allow authenticated users to access their data
* **Password reset not working:** Ensure email/password provider is enabled in Firebase Console
* **Data not syncing:** Check browser console for Firestore errors and verify internet connection

### General Issues
* **Map or tiles not loading:** Check `REACT_APP_MAP_TILE_URL` and confirm no mixed-content issues (HTTP vs HTTPS)
* **Detection failing:** Confirm Gemini API key is valid with necessary quotas
* **Localhost 404 on subpaths:** Add redirect rules (e.g., Netlify `_redirects`: `/* /index.html 200`)
* **Environment variables not working:** Restart development server after updating `.env`

### Migration from localStorage
If you had previous contributions stored locally, they will automatically migrate to Firebase on first login. Ensure you're logged in to preserve your data.

---

## Security Best Practices

1. **Never commit `.env` to version control** - Add to `.gitignore`
2. **Use Firestore security rules** - Restrict access to user's own data
3. **Enable Firebase App Check** - Protect against abuse (optional but recommended)
4. **Implement rate limiting** - Prevent API abuse
5. **Validate user input** - Sanitize all data before storage
6. **Use HTTPS** - Ensure secure communication in production

---

## Contact

For issues or feature requests, open an issue on GitHub or contact the maintainer.

---

**Happy recycling! 🌱♻️**
