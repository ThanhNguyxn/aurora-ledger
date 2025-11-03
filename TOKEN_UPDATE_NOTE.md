# Token Expiration Update

## ⚠️ IMPORTANT: Update Environment Variable on Vercel

The JWT token expiration time has been increased from **7 days** to **30 days** to improve user experience.

### Action Required:

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update (or add if not exists):
   ```
   JWT_EXPIRES_IN=30d
   ```
4. **Redeploy** your backend for the changes to take effect

### What Changed:

- **Frontend**: 
  - Added automatic token cleanup when expired
  - Added token validation on app load
  - Token is checked before every API request
  - Auto-redirect to login when token expires

- **Backend**: 
  - Token expiration increased to 30 days (was 7 days)
  - This means users won't need to re-login for a month!

### Testing:

After deploying, test with:
1. Login to the app
2. Open Console (F12) 
3. You should see: `✅ Valid token found: Expires in X days`

### Benefits:

✅ Users don't need to re-login frequently
✅ Expired tokens are automatically cleaned up
✅ No more "hanging" expired tokens in localStorage
✅ Better user experience

---

**Note**: If you prefer a different expiration time, you can set it to:
- `90d` for 90 days
- `365d` for 1 year  
- Or keep at `30d` for good balance between security and convenience

