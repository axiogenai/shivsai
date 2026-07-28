# Shivsai 360 - Automated GitHub Push Script
param (
    [string]$RepoUrl = ""
)

Write-Host "==========================================" -ForegroundColor Gold
Write-Host " Shivsai 360 - Push to GitHub Utility" -ForegroundColor Gold
Write-Host "==========================================" -ForegroundColor Gold

if ($RepoUrl -eq "") {
    $RepoUrl = Read-Host "Enter your GitHub Repository URL (e.g. https://github.com/your-username/shivsai-360.git)"
}

if ($RepoUrl -eq "") {
    Write-Host "No Repository URL provided. Exiting script." -ForegroundColor Red
    exit 1
}

Write-Host "`n[1/4] Initializing Git repository..." -ForegroundColor Cyan
git init

Write-Host "`n[2/4] Staging files and creating commit..." -ForegroundColor Cyan
git add .
git commit -m "Initial commit - Shivsai 360 Luxury Aesthetic Clinic Web App (Kolhapur)"

Write-Host "`n[3/4] Setting main branch & remote URL..." -ForegroundColor Cyan
git branch -M main
git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Host "`n[4/4] Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host " Successfully pushed Shivsai 360 to GitHub!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
