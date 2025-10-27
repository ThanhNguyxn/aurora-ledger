# 🔐 Google OAuth Setup Guide

## Issue: Google Login Not Working

If you're experiencing issues with Google login, follow these steps:

---

## ✅ Step 1: Verify Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **aurora-ledger**
3. Go to **Settings** → **Environment Variables**
4. Check if `VITE_API_URL` exists:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://aurora-ledger-backend.onrender.com/api`
   - **Environment:** Production, Preview, Development

5. If missing, add it and **Redeploy** the site

---

## ✅ Step 2: Configure Google Cloud Console

### 2.1 Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Application type: **Web application**

### 2.2 Configure URLs

**Authorized JavaScript origins:**
```
https://aurora-ledger.vercel.app
```

**Authorized redirect URIs:**
```
https://aurora-ledger-backend.onrender.com/api/auth/google/callback
```

### 2.3 Get Credentials

After creating, you'll get:
- **Client ID**: `272229155703-xxxxx.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxx`

---

## ✅ Step 3: Configure Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service: **aurora-ledger-backend**
3. Go to **Environment** tab
4. Add/Update these variables:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

5. Click **Save Changes** - Render will auto-redeploy

---

## ✅ Step 4: Test Google Login

### 4.1 Test Backend Endpoint

Open in browser:
```
https://aurora-ledger-backend.onrender.com/api/auth/google
```

**Expected:** Should redirect to Google login page

### 4.2 Test Full Flow

1. Go to [https://aurora-ledger.vercel.app/login](https://aurora-ledger.vercel.app/login)
2. Click **"Continue with Google"**
3. Should redirect to Google consent screen
4. After approving, should redirect back to dashboard

---

## 🔍 Debugging

### Check Backend Logs

1. Go to Render Dashboard
2. Select your service
3. Click **Logs** tab
4. Look for:
   - `✅ Google OAuth Strategy initialized` (Good)
   - `⚠️ Google OAuth disabled` (Missing credentials)

### Check Frontend Console

1. Open website: https://aurora-ledger.vercel.app/login
2. Open Developer Tools (F12)
3. Click "Continue with Google"
4. Check **Console** tab for errors
5. Check **Network** tab for requests

### Common Issues

**❌ "OAuth2Strategy requires a clientID option"**
- Missing `GOOGLE_CLIENT_ID` on Render
- Solution: Add environment variable

**❌ "redirect_uri_mismatch"**
- Google Console URIs don't match
- Solution: Add exact callback URL to Google Console

**❌ "Access blocked: This app's request is invalid"**
- OAuth consent screen not configured
- Solution: Configure OAuth consent screen in Google Console

**❌ Token but no user data**
- Fixed in latest code (AuthCallback.jsx updated)
- Solution: Redeploy frontend

---

## 📝 Current Configuration

### Your URLs
- **Frontend:** https://aurora-ledger.vercel.app
- **Backend:** https://aurora-ledger-backend.onrender.com
- **Callback:** https://aurora-ledger-backend.onrender.com/api/auth/google/callback

### Google Console Settings Required

**JavaScript origins:**
```
https://aurora-ledger.vercel.app
```

**Redirect URIs:**
```
https://aurora-ledger-backend.onrender.com/api/auth/google/callback
```

---

## 🚀 Quick Fix Checklist

- [ ] Vercel has `VITE_API_URL` environment variable
- [ ] Render has `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] Google Console has authorized JavaScript origins
- [ ] Google Console has authorized redirect URIs
- [ ] Frontend redeployed after env var changes
- [ ] Backend redeployed after env var changes
- [ ] OAuth consent screen configured in Google Console
- [ ] Test users added (if in testing mode)

---

## 📞 Still Not Working?

1. Check all environment variables are set correctly
2. Verify URLs match exactly (no trailing slashes)
3. Check Render logs for errors
4. Check browser console for errors
5. Try incognito mode to clear cached credentials

---

**Last Updated:** October 27, 2025

