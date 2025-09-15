# Hostinger Deployment Guide

## 🔧 Environment Variables Setup

### Option 1: Using .env file (Recommended)
Create a `.env` file in your project root with:

```bash
VITE_API_BASE_URL=https://studlyf-backendfinal.vercel.app
VITE_FIREBASE_API_KEY=AIzaSyDK5hLVeUdFKpFSIRavC8w8ToxGjme75IQ
VITE_FIREBASE_AUTH_DOMAIN=studlyf21-c702a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=studlyf21-c702a
VITE_FIREBASE_STORAGE_BUCKET=studlyf21-c702a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=37791289757
VITE_FIREBASE_APP_ID=1:37791289757:web:4110c9d397977410485f74
VITE_FIREBASE_MEASUREMENT_ID=G-HJGFGR4Q1Z
```

### Option 2: Using Hostinger Environment Variables
If Hostinger supports environment variables, set them in your hosting panel.

## 🚀 Deployment Steps

### 1. Build the Project
```bash
npm install
npm run build
```

### 2. Upload to Hostinger
- Upload the contents of the `dist` folder to your Hostinger public_html directory
- Ensure the `.htaccess` file is included (see below)

### 3. Create .htaccess file
Create a `.htaccess` file in your public_html directory:

```apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# CORS headers for API calls
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
```

## 🔒 Security Configuration

### 1. Firebase Configuration
The app now includes fallback Firebase configuration, so it should work even without environment variables.

### 2. API Configuration
- Backend URL is hardcoded to: `https://studlyf-backendfinal.vercel.app`
- No localhost references in production build

### 3. Error Handling
- Firebase initialization errors are caught and handled gracefully
- App won't crash if Firebase config is missing

## 📋 Troubleshooting

### If you still get Firebase errors:

1. **Check if .env file is uploaded** - Make sure the .env file is in your project root
2. **Verify build process** - Ensure you're uploading the built files from `dist/` folder
3. **Check browser console** - Look for any additional error messages
4. **Clear browser cache** - Hard refresh the page (Ctrl+F5)

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Solution: The fallback configuration should handle this
   - If persists, check if your domain is added to Firebase authorized domains

2. **"Missing required Firebase environment variables"**
   - Solution: This is now a warning, not an error
   - The app will use fallback configuration

3. **API calls failing**
   - Check if your domain is allowed in backend CORS configuration
   - Verify backend URL is correct

## 🎯 Verification Checklist

- [ ] Build completed successfully
- [ ] All files uploaded to Hostinger
- [ ] .htaccess file in place
- [ ] No console errors in browser
- [ ] Firebase authentication works
- [ ] API calls to backend work
- [ ] User registration/login works
- [ ] Profile editing works

## 📞 Support

If you continue to have issues:

1. Check the browser console for specific error messages
2. Verify your Hostinger hosting plan supports Node.js/static sites
3. Ensure all files from the `dist` folder are uploaded
4. Check if your domain is added to Firebase authorized domains 