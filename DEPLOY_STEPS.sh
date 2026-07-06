#!/bin/bash
# Arc Payment Platform - Full Deployment to Vercel
# Copy & paste these commands step by step

echo "🚀 Arc Payment Platform - Vercel Deployment"
echo "=============================================="
echo ""
echo "Follow the steps below to deploy to Vercel"
echo ""

# Step 1: Git Setup
echo "STEP 1: Configure Git"
echo "---------------------"
echo "Run these commands:"
echo ""
echo "git config --global user.email \"your-email@example.com\""
echo "git config --global user.name \"Your Name\""
echo ""

# Step 2: Initialize Git repo
echo "STEP 2: Initialize Git Repository"
echo "----------------------------------"
echo "Run these commands:"
echo ""
echo "cd /Users/phoenix/Arc-payment-platform"
echo "git init"
echo "git add ."
echo "git commit -m \"Initial commit: Arc Payment Platform\""
echo ""

# Step 3: Create GitHub repo
echo "STEP 3: Create GitHub Repository"
echo "--------------------------------"
echo "1. Go to https://github.com/new"
echo "2. Name it: arc-payment-platform"
echo "3. Click 'Create repository'"
echo "4. Copy the HTTPS URL from the page"
echo ""

# Step 4: Push to GitHub
echo "STEP 4: Push to GitHub"
echo "---------------------"
echo "Replace YOUR_USERNAME in the URL below:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/arc-payment-platform.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""

# Step 5: Deploy to Vercel
echo "STEP 5: Deploy to Vercel"
echo "------------------------"
echo "1. Go to https://vercel.com/new"
echo "2. Click 'Continue with GitHub'"
echo "3. Select your repository"
echo "4. Set Root Directory to './frontend'"
echo "5. Add Environment Variables (from .env.example)"
echo "6. Click Deploy"
echo ""
echo "Then repeat for backend with Root Directory './backend'"
echo ""

# Final
echo "✅ Done! Your site will be live at:"
echo "   https://arc-payment-platform.vercel.app"
echo ""
echo "📖 See DEPLOY_NOW.md for detailed instructions"
