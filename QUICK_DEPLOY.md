# ⚡ QUICKSTART DEPLOYMENT CHECKLIST

Copy and paste the commands below in order. Replace `YOUR_USERNAME` with your GitHub username.

---

## 1️⃣ Configure Git (Run Once)

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

---

## 2️⃣ Push to GitHub

```bash
cd /Users/phoenix/Arc-payment-platform
git init
git add .
git commit -m "Arc Payment Platform"
git remote add origin https://github.com/YOUR_USERNAME/arc-payment-platform.git
git branch -M main
git push -u origin main
```

---

## 3️⃣ Deploy Frontend

1. Open: https://vercel.com/new
2. Click: **"Continue with GitHub"** → Authorize
3. Select: **arc-payment-platform** repository
4. Set **Root Directory**: `./frontend`
5. Click: **"Deploy"**

⏳ Wait 2-3 minutes...

✅ **Frontend Live At**: `https://arc-payment-platform.vercel.app`

---

## 4️⃣ Deploy Backend

1. Open: https://vercel.com/new
2. Select: **arc-payment-platform** repository **AGAIN**
3. Set **Root Directory**: `./backend`
4. Click: **"Deploy"**

⏳ Wait 2-3 minutes...

✅ **Backend Live At**: `https://arc-payment-backend.vercel.app`

---

## ✨ YOU'RE DONE!

Your website is now LIVE:

```
🌐 Access here: https://arc-payment-platform.vercel.app
🔌 API endpoint: https://arc-payment-backend.vercel.app
```

---

## 🔧 Optional: Update Later

To update your site after making changes:

```bash
cd /Users/phoenix/Arc-payment-platform
git add .
git commit -m "Your changes"
git push origin main
```

Vercel automatically redeploys! 🚀

---

## 🎯 Need to Update Contract Addresses?

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: **Settings** → **Environment Variables**
4. Update the values
5. Redeploy (click "Redeploy" button)

---

**That's it! No local setup needed!** 🎉
