@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Jekyll Site Deployment Script
echo ========================================
echo.

REM Check if we're in a git repository
if not exist ".git" (
    echo [ERROR] Not a git repository. Please run this from the project root.
    pause
    exit /b 1
)

REM Get the current branch
for /f "delims=" %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i
echo [INFO] Current branch: %CURRENT_BRANCH%
echo.

REM Build the site
echo [BUILD] Building Jekyll site...
call bundle exec jekyll build

REM Check if build was successful
if not exist "_site" (
    echo [ERROR] Build failed - _site directory not found
    pause
    exit /b 1
)

echo [SUCCESS] Build completed successfully
echo.

REM Run CSS validation check
echo [CHECK] Running CSS validation...
if exist "scripts\check-css-output.ps1" (
    powershell -NoProfile -ExecutionPolicy Bypass -File scripts\check-css-output.ps1
) else (
    echo [WARNING] CSS validation script not found. Skipping.
)
echo.

REM Check if gh-pages branch exists
git show-ref --verify --quiet refs/heads/gh-pages
if %errorlevel% equ 0 (
    echo [INFO] gh-pages branch exists
    set BRANCH_EXISTS=true
) else (
    echo [INFO] Creating gh-pages branch...
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout %CURRENT_BRANCH%
    set BRANCH_EXISTS=false
)
echo.

REM Deploy to gh-pages branch
echo [DEPLOY] Deploying to gh-pages branch...
git checkout gh-pages
git rm -rf .
xcopy /E /I /Y _site\* .
copy /Y CNAME . 2>nul
git add -A

REM Create commit with timestamp
for /f "delims=" %%i in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"') do set TIMESTAMP=%%i
git commit -m "Deploy to GitHub Pages - %TIMESTAMP%"

REM Push to remote
echo.
echo [PUSH] Pushing to remote...
git push origin gh-pages --force

REM Switch back to original branch
echo.
echo [INFO] Switching back to %CURRENT_BRANCH%...
git checkout %CURRENT_BRANCH%

echo.
echo ========================================
echo   Deployment Completed Successfully!
echo ========================================
echo.
echo [INFO] Site will be available at: https://intellify.co.za
echo [INFO] Note: It may take a few minutes for GitHub Pages to update.
echo.
pause