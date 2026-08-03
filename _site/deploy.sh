#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Please run this from the project root."
    exit 1
fi

# Get the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $CURRENT_BRANCH"

# Build the site
echo "🔨 Building Jekyll site..."
bundle exec jekyll build

# Check if build was successful
if [ ! -d "_site" ]; then
    echo "❌ Error: Build failed - _site directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Run CSS validation check
echo "🔍 Running CSS validation..."
if [ -f "scripts/check-css-output.ps1" ]; then
    echo "⚠️  Note: CSS validation script is PowerShell-based. Skipping on Unix/Linux/macOS."
    echo "   Please run manually on Windows or verify CSS output manually."
else
    echo "⚠️  CSS validation script not found. Skipping."
fi

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "🌿 gh-pages branch exists"
    BRANCH_EXISTS=true
else
    echo "🌱 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout "$CURRENT_BRANCH"
    BRANCH_EXISTS=false
fi

# Deploy to gh-pages branch
echo "📤 Deploying to gh-pages branch..."
git checkout gh-pages
git rm -rf .
cp -r _site/* .
cp CNAME . 2>/dev/null || true
git add -A
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to remote
echo "🔼 Pushing to remote..."
git push origin gh-pages --force

# Switch back to original branch
git checkout "$CURRENT_BRANCH"

echo "✨ Deployment completed successfully!"
echo "🌐 Site will be available at: https://intellify.co.za"
echo "📝 Note: It may take a few minutes for GitHub Pages to update."