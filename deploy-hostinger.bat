@echo off
echo Building StudLYF for Hostinger deployment...
echo.

echo Installing dependencies...
"C:\Program Files\nodejs\npm.cmd" install

echo.
echo Building for production...
"C:\Program Files\nodejs\npm.cmd" run build

echo.
echo Creating .env file for Hostinger...
echo VITE_API_BASE_URL=https://studlyf-backendfinal.vercel.app > .env
echo VITE_FIREBASE_API_KEY=AIzaSyDK5hLVeUdFKpFSIRavC8w8ToxGjme75IQ >> .env
echo VITE_FIREBASE_AUTH_DOMAIN=studlyf21-c702a.firebaseapp.com >> .env
echo VITE_FIREBASE_PROJECT_ID=studlyf21-c702a >> .env
echo VITE_FIREBASE_STORAGE_BUCKET=studlyf21-c702a.firebasestorage.app >> .env
echo VITE_FIREBASE_MESSAGING_SENDER_ID=37791289757 >> .env
echo VITE_FIREBASE_APP_ID=1:37791289757:web:4110c9d397977410485f74 >> .env
echo VITE_FIREBASE_MEASUREMENT_ID=G-HJGFGR4Q1Z >> .env

echo.
echo Copying .htaccess to dist folder...
copy .htaccess dist\

echo.
echo Deployment files ready!
echo.
echo Upload the contents of the 'dist' folder to your Hostinger public_html directory
echo.
echo Files to upload:
echo - All files from dist/ folder
echo - .htaccess file (for routing and security)
echo.
pause 