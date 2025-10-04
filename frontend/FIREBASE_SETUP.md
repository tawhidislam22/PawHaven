# Firebase Configuration Instructions

## Step 1: Create a Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter your project name (e.g., "pawhaven-app")
4. Follow the setup wizard

## Step 2: Enable Authentication
1. In your Firebase console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Enable "Google" provider
   - Add your domain to authorized domains
   - For development, add: localhost

## Step 3: Get your Firebase configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select "Web"
4. Register your app
5. Copy the config object

## Step 4: Update Firebase Config
Replace the config in `src/config/firebase.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Step 5: Test Authentication
1. Start your development server: `npm run dev`
2. Navigate to `/auth` route
3. Try signing up with email/password or Google

## Security Note
- Never commit real Firebase config to public repositories
- Consider using environment variables for production
- Set up proper Firebase security rules

## Environment Variables (Optional)
Create a `.env` file in your project root:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other config values
```

Then update firebase.js to use process.env variables.
