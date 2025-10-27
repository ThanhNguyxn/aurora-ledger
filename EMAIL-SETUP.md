# 📧 Email Setup Guide - Gmail SMTP

## Setup Gmail for Password Reset Emails

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **"2-Step Verification"**
3. Follow the setup process
4. **Enable 2FA** (required for App Passwords)

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **"Mail"**
3. Select device: **"Other (Custom name)"**
4. Name it: **"Aurora Ledger"**
5. Click **"Generate"**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Configure Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select service: **aurora-ledger-backend**
3. Go to **Environment** tab
4. Add these variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**Important:** 
- Use your **Gmail address** for EMAIL_USER
- Use the **16-character App Password** (no spaces) for EMAIL_PASSWORD
- NOT your regular Gmail password!

### Step 4: Test

1. Deploy or restart service
2. Go to https://aurora-ledger.vercel.app/forgot-password
3. Enter your email
4. Check your inbox for reset email!

---

## Alternative: Use SendGrid (Free Tier)

### SendGrid Setup

1. Sign up at [SendGrid](https://sendgrid.com)
2. Verify your email
3. Create API Key
4. Update `backend/utils/email.js`:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

5. Add to Render:
```env
EMAIL_USER=your-verified-email@domain.com
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxx
```

---

## Email Features

### Password Reset Email
- ✅ Professional HTML design
- ✅ Big "Reset Password" button
- ✅ Copy-paste URL fallback
- ✅ 1-hour expiry warning
- ✅ Security notice if not requested

### Welcome Email (Optional)
- Can be sent on user registration
- Currently disabled by default

---

## Troubleshooting

### ❌ "Invalid credentials"
- Check you're using **App Password**, not regular password
- Remove any spaces from the App Password
- Verify 2FA is enabled

### ❌ "Less secure app access"
- Don't use this! Use App Password instead
- App Passwords are more secure

### ❌ Email not received
- Check spam folder
- Verify EMAIL_USER is correct
- Check Render logs for errors

### ✅ Testing without email
- If EMAIL_USER/PASSWORD not set
- Reset URL will be logged to Render console
- Also returned in API response (dev mode)

---

## Production Checklist

- [ ] Gmail 2FA enabled
- [ ] App Password generated
- [ ] EMAIL_USER added to Render
- [ ] EMAIL_PASSWORD added to Render
- [ ] Service redeployed
- [ ] Test email sent successfully
- [ ] Email received in inbox

---

**Created:** October 27, 2025

