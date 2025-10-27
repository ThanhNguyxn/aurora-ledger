# 📧 SendGrid Setup Guide (RECOMMENDED)

## Why SendGrid?
- ✅ **100 emails/day FREE** (forever)
- ✅ No 2FA or App Password needed
- ✅ Better deliverability than Gmail
- ✅ Professional email service
- ✅ Easy setup (5 minutes)

---

## 🚀 Step-by-Step Setup

### Step 1: Create SendGrid Account

1. Go to [SendGrid.com](https://sendgrid.com)
2. Click **"Start for Free"** or **"Sign Up"**
3. Fill in:
   - Email
   - Password
   - Company (can be "Personal" or your name)
4. **Verify your email** (check inbox)

---

### Step 2: Verify Sender Email

**Important:** SendGrid requires you to verify the email you'll send from.

1. After login, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in the form:
   - **From Name:** Aurora Ledger
   - **From Email Address:** your-email@gmail.com (or any email you own)
   - **Reply To:** Same as above
   - **Company:** Aurora Ledger
   - **Address, City, Country:** Your info
4. Click **"Create"**
5. **Check your email inbox** → Click verification link
6. ✅ Sender verified!

---

### Step 3: Create API Key

1. Go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Settings:
   - **API Key Name:** `Aurora Ledger Backend`
   - **API Key Permissions:** Choose **"Restricted Access"**
   - Scroll down to **"Mail Send"** → Toggle to **"Full Access"**
   - Leave everything else as "No Access"
4. Click **"Create & View"**
5. **COPY THE API KEY** (starts with `SG.`)
   ```
   SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. ⚠️ **Important:** Save it now! You can't see it again.

---

### Step 4: Add to Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select service: **aurora-ledger-backend**
3. Go to **Environment** tab
4. Add these variables:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=your-verified-email@gmail.com
```

**Replace:**
- `SENDGRID_API_KEY` = The API key you copied
- `EMAIL_FROM` = The email you verified in Step 2

5. Click **"Save Changes"**
6. ✅ Render will auto-deploy!

---

### Step 5: Test

Wait 2-3 minutes for Render to deploy, then:

1. Go to: https://aurora-ledger.vercel.app/forgot-password
2. Enter your email
3. Click "Send Reset Link"
4. **Check your inbox!** 📧

You should receive a beautiful password reset email!

---

## 🎯 SendGrid Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| **Emails per day** | 100 |
| **Emails per month** | ~3,000 |
| **Cost** | FREE forever |
| **Verified senders** | Unlimited |
| **API keys** | Unlimited |

**100 emails/day** is more than enough for most apps!

---

## 🔍 Check Email Status

### View Email Activity

1. Go to **Activity** in SendGrid dashboard
2. You'll see:
   - ✅ Delivered
   - 📬 Processed
   - ⏰ Deferred
   - ❌ Bounced

### Check Why Email Didn't Arrive

1. Go to **Activity** → **Email Activity**
2. Search for recipient email
3. See delivery status and reason

---

## ❌ Troubleshooting

### Error: "The from address does not match a verified Sender Identity"

**Cause:** EMAIL_FROM doesn't match verified sender

**Solution:**
1. Check **Settings** → **Sender Authentication**
2. Make sure email is verified (green checkmark)
3. Update `EMAIL_FROM` to match exactly

---

### Error: "Invalid API Key"

**Cause:** Wrong API key or typo

**Solution:**
1. Double-check API key in Render
2. No extra spaces before/after
3. Should start with `SG.`
4. If lost, create new API key

---

### Email goes to Spam

**Solution:**
1. Use a custom domain (advanced)
2. Or: Mark first email as "Not Spam"
3. SendGrid has good reputation, should arrive in inbox

---

### Reached 100 emails/day limit

**What happens:**
- SendGrid queues emails for next day
- Or upgrade to paid plan ($15/month = 40,000 emails/month)

**For most personal finance apps:** 100/day is plenty!

---

## 🎨 Email Template Preview

Your password reset email will look like:

```
┌─────────────────────────────────────┐
│        Aurora Ledger                │
│    Personal Finance Management      │
├─────────────────────────────────────┤
│                                     │
│  Password Reset Request             │
│                                     │
│  Hi User,                           │
│                                     │
│  You requested to reset your        │
│  password. Click below:             │
│                                     │
│  ┌─────────────────────┐           │
│  │  Reset Your Password │  [Button] │
│  └─────────────────────┘           │
│                                     │
│  Link expires in 1 hour             │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ Verification Checklist

- [ ] SendGrid account created
- [ ] Email verified (check inbox)
- [ ] Sender identity verified (green checkmark)
- [ ] API Key created and copied
- [ ] `SENDGRID_API_KEY` added to Render
- [ ] `EMAIL_FROM` added to Render (matches verified email)
- [ ] Service redeployed (automatic)
- [ ] Test email sent successfully
- [ ] Email received in inbox

---

## 🔄 Compare: SendGrid vs Gmail

| Feature | SendGrid | Gmail |
|---------|----------|-------|
| Free limit | 100/day | 500/day |
| Setup complexity | ⭐⭐ Easy | ⭐⭐⭐ Medium |
| 2FA required | ❌ No | ✅ Yes |
| App Password | ❌ No | ✅ Yes |
| Deliverability | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good |
| Professional | ✅ Yes | ❌ No |
| Dashboard | ✅ Yes | ❌ No |

**Recommendation:** Use SendGrid for production apps!

---

## 📞 Need Help?

- **SendGrid Docs:** https://docs.sendgrid.com
- **Support:** https://support.sendgrid.com
- **Status:** https://status.sendgrid.com

---

**Created:** October 27, 2025
**Updated:** October 27, 2025

