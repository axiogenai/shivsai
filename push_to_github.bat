@echo off
echo ========================================================
echo PUSHING SHIVSAI 360 PATIENT SITE & ADMIN CMS TO GITHUB
echo ========================================================
echo.
echo Step 1: Pushing Main Patient Site & Server...
git init
git add .
git commit -m "Production Release: Shivsai 360 Patient Site & Express Server"
echo.
echo Enter your GitHub main repository URL (e.g. https://github.com/your-username/shivsai-360.git):
set /p REPO_URL=
if not "%REPO_URL%"=="" (
    git remote add origin %REPO_URL%
    git branch -M main
    git push -u origin main
)

echo.
echo Step 2: Pushing Admin CMS Site...
cd admin
git init
git add .
git commit -m "Production Release: Shivsai 360 Admin CMS"
echo.
echo Enter your GitHub admin repository URL (e.g. https://github.com/your-username/shivsai-360-admin.git):
set /p ADMIN_REPO_URL=
if not "%ADMIN_REPO_URL%"=="" (
    git remote add origin %ADMIN_REPO_URL%
    git branch -M main
    git push -u origin main
)

echo.
echo ========================================================
echo ALL REPOSITORIES READY AND PUSHED TO GITHUB!
echo ========================================================
pause
