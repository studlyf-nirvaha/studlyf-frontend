@echo off
echo Setting up StudLYF for production deployment...
echo.

echo Creating production environment file...
echo # Production Environment Variables > .env.production
echo VITE_API_BASE_URL=https://studlyf-backendfinal.vercel.app >> .env.production
echo. >> .env.production
echo # Firebase Configuration >> .env.production
echo VITE_FIREBASE_API_KEY=your_firebase_api_key_here >> .env.production
echo VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com >> .env.production
echo VITE_FIREBASE_PROJECT_ID=your_project_id >> .env.production
echo VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com >> .env.production
echo VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id >> .env.production
echo VITE_FIREBASE_APP_ID=your_app_id >> .env.production
echo VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id >> .env.production

echo.
echo Production environment file created: .env.production
echo.
echo IMPORTANT: Replace the placeholder values in .env.production with your actual Firebase credentials
echo.
echo Building for production...
"C:\Program Files\nodejs\npm.cmd" run build

echo.
echo Production build completed! Check the 'dist' folder.
pause 