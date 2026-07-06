# Vercel Deployment Guide for Arc Payment Platform

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Arc Payment Platform"
   ```

2. **Push to GitHub**:
   - Create a GitHub repository
   - Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/arc-payment-platform.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Frontend to Vercel

1. Go to **https://vercel.com** and sign up (use GitHub)
2. Click **"Add New" → "Project"**
3. Import your GitHub repository
4. **Framework Preset**: Select "React"
5. **Build & Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
6. **Root Directory**: Set to `./frontend`
7. **Environment Variables**: Add these
   ```
   REACT_APP_ARC_TOKEN_ADDRESS=0x[YOUR_TOKEN_ADDRESS]
   REACT_APP_PAYMENT_PROCESSOR_ADDRESS=0x[YOUR_PROCESSOR_ADDRESS]
   REACT_APP_API_URL=https://[YOUR_BACKEND_DOMAIN]
   ```
8. Click **"Deploy"**

**Your Frontend URL**: `https://arc-payment-platform.vercel.app` (or custom domain)

### Step 3: Deploy Backend to Vercel

1. Click **"Add New" → "Project"** again
2. Import **same GitHub repository**
3. **Root Directory**: Set to `./backend`
4. **Framework**: Leave as "Other"
5. **Build Command**: `npm install`
6. **Start Command**: `node src/server.js`
7. **Environment Variables**: Add these
   ```
   MONGODB_URI=mongodb+srv://[YOUR_MONGO_URI]
   ARC_RPC_URL=https://testnet-rpc.arc.io
   ARC_TOKEN_ADDRESS=0x[YOUR_TOKEN_ADDRESS]
   PAYMENT_PROCESSOR_ADDRESS=0x[YOUR_PROCESSOR_ADDRESS]
   NODE_ENV=production
   ```
8. Click **"Deploy"**

**Your Backend URL**: `https://arc-payment-backend.vercel.app` (or custom domain)

### Step 4: Connect Frontend to Backend

Update your frontend environment variable:
```
REACT_APP_API_URL=https://arc-payment-backend.vercel.app
```

Redeploy frontend in Vercel dashboard.

---

## 📋 Before You Deploy - Checklist

- [ ] Smart contracts deployed to Arc testnet
- [ ] Contract addresses saved
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables prepared
- [ ] Repository pushed to GitHub

## 🔑 Get Required Values

1. **MongoDB Connection String**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free tier cluster
   - Get connection string

2. **Smart Contract Addresses**:
   - Deploy contracts locally first
   - Copy addresses from deployment output

3. **Arc RPC URL**:
   - Testnet: `https://testnet-rpc.arc.io`
   - Mainnet: `https://mainnet-rpc.arc.io`

## ✅ Final URLs

After deployment, you'll have:

```
🌐 Frontend: https://arc-payment-platform.vercel.app
🔌 Backend:  https://arc-payment-backend.vercel.app
```

## 🔗 Custom Domain (Optional)

In Vercel Dashboard:
1. Go to project settings
2. Click "Domains"
3. Add your custom domain

## 🐛 Troubleshooting

**Build Failed**: 
- Check environment variables
- Ensure `package.json` has correct scripts

**API Connection Error**:
- Verify backend URL in frontend environment variables
- Check CORS is enabled in backend

**Database Connection Error**:
- Verify MongoDB URI
- Check IP whitelist in MongoDB Atlas

---

**Next**: Share your GitHub repo link and I'll help configure everything!
