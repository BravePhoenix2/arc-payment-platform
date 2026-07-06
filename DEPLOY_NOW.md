# 🚀 One-Click Vercel Deployment Guide

This guide will get your Arc Payment Platform live on Vercel without needing any local setup!

## ✅ Complete Setup (10 minutes)

### Step 1: Create GitHub Repository (2 min)

1. Go to **https://github.com/new**
2. Create repository name: `arc-payment-platform`
3. **DO NOT** select "Add .gitignore" or license (we already have them)
4. Click **"Create repository"**

### Step 2: Push Code to GitHub (3 min)

Copy and paste these commands in your terminal:

```bash
cd /Users/phoenix/Arc-payment-platform

git config --global user.email "you@example.com"
git config --global user.name "Your Name"

git init
git add .
git commit -m "Initial commit: Arc Payment Platform"
git remote add origin https://github.com/YOUR_USERNAME/arc-payment-platform.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Deploy Frontend to Vercel (2 min)

1. Go to **https://vercel.com/new**
2. Click **"Continue with GitHub"**
3. Click **"Install Now"** to authorize Vercel
4. Select your `arc-payment-platform` repository
5. Fill in the form:
   - **Framework Preset**: React
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Click **"Environment Variables"** and add:
   ```
   REACT_APP_ARC_TOKEN_ADDRESS = 0x0000000000000000000000000000000000000000
   REACT_APP_PAYMENT_PROCESSOR_ADDRESS = 0x0000000000000000000000000000000000000000
   REACT_APP_API_URL = https://arc-payment-backend.vercel.app
   ```
   (We'll update these with real contract addresses later)

7. Click **"Deploy"** ✅

**Your Frontend is now live at**: `https://arc-payment-platform.vercel.app`

### Step 4: Deploy Backend to Vercel (2 min)

1. Go to **https://vercel.com/new** again
2. Select your `arc-payment-platform` repository again
3. Fill in the form:
   - **Framework Preset**: Other
   - **Root Directory**: `./backend`
   - **Build Command**: `npm install`
   - **Install Command**: `npm install`

4. Click **"Environment Variables"** and add:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/arc-payment
   ARC_RPC_URL = https://testnet-rpc.arc.io
   ARC_TOKEN_ADDRESS = 0x0000000000000000000000000000000000000000
   PAYMENT_PROCESSOR_ADDRESS = 0x0000000000000000000000000000000000000000
   NODE_ENV = production
   ```

5. Click **"Deploy"** ✅

**Your Backend is now live at**: `https://arc-payment-backend.vercel.app`

---

## 🔑 Next: Get Real Contract Addresses

### Deploy Smart Contracts Locally:

You need Node.js first. Install it:

**On macOS:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

Then deploy:
```bash
cd /Users/phoenix/Arc-payment-platform/contracts
npm install
npm run compile
npm run deploy:testnet
```

Copy the contract addresses and update environment variables in Vercel.

---

## 📊 MongoDB Setup (Free)

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Create free account
3. Create cluster (free tier)
4. Go to **"Database Access"** → Create user (username/password)
5. Go to **"Network Access"** → Add your IP (or 0.0.0.0 for anywhere)
6. Click **"Connect"** → Copy connection string
7. Replace in backend environment variable

---

## 🔗 Your Live Websites

After setup:

```
🌐 Frontend:  https://arc-payment-platform.vercel.app
🔌 Backend:   https://arc-payment-backend.vercel.app
```

## 🔄 How to Update

After you make changes:

```bash
cd /Users/phoenix/Arc-payment-platform
git add .
git commit -m "Your changes"
git push origin main
```

Vercel automatically redeploys! ✨

---

## ⚙️ Update Environment Variables

To update variables later:

1. Go to **https://vercel.com/dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Update and redeploy

---

## ❓ Troubleshooting

**"npm: command not found"**
- Install Node.js: `brew install node`

**"Cannot find repository"**
- Make sure you pushed to GitHub first

**"Build failed"**
- Check environment variables in Vercel dashboard
- Check build logs for errors

**"API not connecting"**
- Verify backend URL in frontend environment
- Check backend is deployed and running

---

## 🎯 Summary

You now have:
- ✅ Frontend deployed to Vercel
- ✅ Backend deployed to Vercel  
- ✅ Automatic deployment on GitHub push
- ✅ Live URLs ready to use

**Next**: Deploy smart contracts and update contract addresses!
