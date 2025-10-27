# 🔐 HƯỚNG DẪN THÊM ĐĂNG NHẬP GOOGLE & FACEBOOK

> **Thời gian thực hiện:** 30-40 phút  
> **Mức độ:** Trung bình  
> **Kết quả:** Users có thể đăng nhập bằng Google hoặc Facebook

---

## 📋 MỤC LỤC

1. [Phần 1: Đăng Ký Google OAuth](#phần-1-đăng-ký-google-oauth)
2. [Phần 2: Đăng Ký Facebook OAuth](#phần-2-đăng-ký-facebook-oauth)
3. [Phần 3: Code Backend](#phần-3-code-backend)
4. [Phần 4: Code Frontend](#phần-4-code-frontend)
5. [Phần 5: Deploy](#phần-5-deploy)

---

# PHẦN 1: ĐĂNG KÝ GOOGLE OAUTH

## 🎯 Mục Tiêu
Lấy **Client ID** và **Client Secret** từ Google để users có thể đăng nhập bằng tài khoản Google.

## ⏱️ Thời Gian
10-15 phút

---

## 🔹 BƯỚC 1.1: Vào Google Cloud Console

### Hành động:

```
1. Mở trình duyệt
2. Vào: https://console.cloud.google.com
3. Đăng nhập bằng tài khoản Google của bạn
```

---

## 🔹 BƯỚC 1.2: Tạo Project Mới

### Hành động:

```
1. Click vào dropdown "Select a project" (góc trên bên trái)
2. Click "NEW PROJECT"
3. Điền:
   Project name: Aurora Ledger
   Location: No organization
4. Click "CREATE"
5. Đợi 10-20 giây
6. Click "SELECT PROJECT" khi project đã tạo xong
```

---

## 🔹 BƯỚC 1.3: Enable Google+ API

### Hành động:

```
1. Ở sidebar trái, click "APIs & Services" → "Library"
2. Tìm kiếm: "Google+ API"
3. Click vào "Google+ API"
4. Click "ENABLE"
5. Đợi vài giây
```

---

## 🔹 BƯỚC 1.4: Cấu Hình OAuth Consent Screen

### Hành động:

```
1. Sidebar trái → "OAuth consent screen"
2. Chọn: "External" (cho phép bất kỳ ai đăng nhập)
3. Click "CREATE"

4. Điền thông tin App:
   
   App name: Aurora Ledger
   User support email: [email của bạn]
   
   App logo: (Bỏ qua - không bắt buộc)
   
   Application home page: https://aurora-ledger.vercel.app
   
   Authorized domains:
     - vercel.app
     - onrender.com
   
   Developer contact information: [email của bạn]

5. Click "SAVE AND CONTINUE"

6. Scopes (Phạm vi):
   - Click "ADD OR REMOVE SCOPES"
   - Chọn:
     ✓ .../auth/userinfo.email
     ✓ .../auth/userinfo.profile
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

7. Test users: (Bỏ qua - Click "SAVE AND CONTINUE")

8. Summary: Click "BACK TO DASHBOARD"
```

---

## 🔹 BƯỚC 1.5: Tạo OAuth Client ID

### Hành động:

```
1. Sidebar trái → "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth client ID"

3. Application type: "Web application"

4. Name: Aurora Ledger Web Client

5. Authorized JavaScript origins:
   Click "ADD URI" và thêm:
   - https://aurora-ledger.vercel.app
   - http://localhost:5173 (để test local)

6. Authorized redirect URIs:
   Click "ADD URI" và thêm:
   - https://aurora-ledger-backend.onrender.com/api/auth/google/callback
   - http://localhost:5000/api/auth/google/callback (để test local)

7. Click "CREATE"
```

---

## 🔹 BƯỚC 1.6: Lấy Client ID & Secret

### Sau khi tạo xong, popup sẽ hiển thị:

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  OAuth client created                                     ║
║                                                           ║
║  Your Client ID                                           ║
║  123456789-abc...xyz.apps.googleusercontent.com           ║
║  [Copy]                                                   ║
║                                                           ║
║  Your Client Secret                                       ║
║  GOCSPX-abc...xyz                                         ║
║  [Copy]                                                   ║
║                                                           ║
║  [OK]                                                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Hành động:

```
1. Click [Copy] bên cạnh "Your Client ID"
2. Mở Notepad
3. Paste, ghi chú: "Google Client ID"

4. Quay lại popup
5. Click [Copy] bên cạnh "Your Client Secret"
6. Paste vào Notepad, ghi chú: "Google Client Secret"

7. LƯU FILE: google-oauth-credentials.txt

8. Click "OK"
```

**⚠️ QUAN TRỌNG:** Lưu cả 2 thông tin này, sẽ dùng ở Phần 3!

---

## ✅ CHECKLIST PHẦN 1:

- [ ] Đã tạo Google Cloud Project
- [ ] Đã enable Google+ API
- [ ] Đã config OAuth Consent Screen
- [ ] Đã tạo OAuth Client ID
- [ ] Đã lưu Client ID
- [ ] Đã lưu Client Secret

---

# PHẦN 2: ĐĂNG KÝ FACEBOOK OAUTH

## 🎯 Mục Tiêu
Lấy **App ID** và **App Secret** từ Facebook để users có thể đăng nhập bằng Facebook.

## ⏱️ Thời Gian
10-15 phút

---

## 🔹 BƯỚC 2.1: Vào Facebook Developers

### Hành động:

```
1. Vào: https://developers.facebook.com
2. Đăng nhập bằng tài khoản Facebook của bạn
3. Click "My Apps" (góc trên phải)
4. Click "Create App"
```

---

## 🔹 BƯỚC 2.2: Chọn Use Case

### Hành động:

```
1. Chọn: "Authenticate and request data from users with Facebook Login"
2. Click "Next"
```

---

## 🔹 BƯỚC 2.3: Chọn App Type

### Hành động:

```
1. Chọn: "Consumer"
2. Click "Next"
```

---

## 🔹 BƯỚC 2.4: Điền Thông Tin App

### Hành động:

```
1. App name: Aurora Ledger
2. App contact email: [email của bạn]
3. Click "Create app"
4. Nhập password Facebook để xác nhận
5. Đợi 5-10 giây
```

---

## 🔹 BƯỚC 2.5: Setup Facebook Login

### Hành động:

```
1. Trong dashboard app, tìm "Add products to your app"
2. Tìm "Facebook Login" → Click "Set up"
3. Chọn platform: "Web"
4. Site URL: https://aurora-ledger.vercel.app
5. Click "Save"
6. Click "Continue" các bước tiếp theo (không cần điền gì)
```

---

## 🔹 BƯỚC 2.6: Cấu Hình Facebook Login Settings

### Hành động:

```
1. Sidebar trái → "Facebook Login" → "Settings"

2. Valid OAuth Redirect URIs:
   Thêm (mỗi URL 1 dòng):
   
   https://aurora-ledger-backend.onrender.com/api/auth/facebook/callback
   http://localhost:5000/api/auth/facebook/callback

3. Client OAuth Login: YES (bật)
4. Web OAuth Login: YES (bật)
5. Force Web OAuth Reauthentication: NO
6. Use Strict Mode for Redirect URIs: YES

7. Click "Save Changes"
```

---

## 🔹 BƯỚC 2.7: Lấy App ID & Secret

### Hành động:

```
1. Sidebar trái → "Settings" → "Basic"

2. Bạn sẽ thấy:
   
   App ID: 123456789012345
   [Show] App Secret: •••••••••••

3. Copy App ID:
   - Bôi đen và Ctrl+C
   - Paste vào Notepad
   - Ghi chú: "Facebook App ID"

4. Click "Show" bên cạnh App Secret
   - Nhập password Facebook
   - Copy App Secret
   - Paste vào Notepad
   - Ghi chú: "Facebook App Secret"

5. LƯU FILE: facebook-oauth-credentials.txt
```

---

## 🔹 BƯỚC 2.8: Chuyển App Sang Live Mode

### Hành động:

```
1. Ở góc trên của dashboard, tìm toggle switch:
   "App Mode: Development"

2. Click vào switch để chuyển sang "Live"

3. Popup xác nhận → Click "Switch Mode"

4. Facebook sẽ review app (có thể mất vài giờ)
   Nhưng bạn vẫn test được với tài khoản của mình!
```

---

## ✅ CHECKLIST PHẦN 2:

- [ ] Đã tạo Facebook App
- [ ] Đã setup Facebook Login
- [ ] Đã config Valid OAuth Redirect URIs
- [ ] Đã lưu App ID
- [ ] Đã lưu App Secret
- [ ] Đã chuyển app sang Live mode

---

# PHẦN 3: CODE BACKEND

## 🎯 Mục Tiêu
Viết code xử lý OAuth trên Backend.

## ⏱️ Thời Gian
15-20 phút

---

## 🔹 BƯỚC 3.1: Cài Đặt Packages

### Hành động:

```powershell
cd D:\Code\Aurora-Ledger\backend
npm install passport passport-google-oauth20 passport-facebook
```

---

## 🔹 BƯỚC 3.2: Cập Nhật .env

### Thêm vào file `backend/.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Facebook OAuth
FACEBOOK_APP_ID=your-facebook-app-id-here
FACEBOOK_APP_SECRET=your-facebook-app-secret-here

# OAuth Callback URL (Production)
OAUTH_CALLBACK_URL=https://aurora-ledger-backend.onrender.com
```

**Thay thế:**
- `your-google-client-id-here` → Client ID từ Google (Phần 1)
- `your-google-client-secret-here` → Client Secret từ Google (Phần 1)
- `your-facebook-app-id-here` → App ID từ Facebook (Phần 2)
- `your-facebook-app-secret-here` → App Secret từ Facebook (Phần 2)

---

## 🔹 BƯỚC 3.3: Tạo File Passport Config

### Tạo file mới: `backend/config/passport.js`

```javascript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import pool from './database.js';
import bcrypt from 'bcrypt';

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.OAUTH_CALLBACK_URL}/api/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;

      // Check if user exists
      const userCheck = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (userCheck.rows.length > 0) {
        // User exists, login
        return done(null, userCheck.rows[0]);
      } else {
        // Create new user
        const hashedPassword = await bcrypt.hash(Math.random().toString(36), 10);
        const newUser = await pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, hashedPassword]
        );
        return done(null, newUser.rows[0]);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.OAUTH_CALLBACK_URL}/api/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = `${profile.name.givenName} ${profile.name.familyName}`;

      // Check if user exists
      const userCheck = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (userCheck.rows.length > 0) {
        // User exists, login
        return done(null, userCheck.rows[0]);
      } else {
        // Create new user
        const hashedPassword = await bcrypt.hash(Math.random().toString(36), 10);
        const newUser = await pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, hashedPassword]
        );
        return done(null, newUser.rows[0]);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

export default passport;
```

---

## 🔹 BƯỚC 3.4: Thêm OAuth Routes

### Tạo file mới: `backend/routes/oauth.js`

```javascript
import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Google OAuth
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
  }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      { userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Facebook OAuth
router.get('/facebook',
  passport.authenticate('facebook', { 
    scope: ['email'],
    session: false 
  })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=facebook_auth_failed`
  }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      { userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

export default router;
```

---

## 🔹 BƯỚC 3.5: Update server.js

### Thêm vào `backend/server.js`:

```javascript
// ... existing imports ...
import passport from './config/passport.js';
import oauthRoutes from './routes/oauth.js';

// ... existing code ...

// Initialize Passport
app.use(passport.initialize());

// ... existing routes ...

// OAuth routes
app.use('/api/auth', oauthRoutes);

// ... rest of the code ...
```

---

## ✅ CHECKLIST PHẦN 3:

- [ ] Đã cài passport packages
- [ ] Đã cập nhật .env với OAuth credentials
- [ ] Đã tạo passport.js config
- [ ] Đã tạo oauth.js routes
- [ ] Đã update server.js

---

# PHẦN 4: CODE FRONTEND

## 🎯 Mục Tiêu
Thêm nút "Login with Google" và "Login with Facebook" vào giao diện.

## ⏱️ Thời Gian
10 phút

---

## 🔹 BƯỚC 4.1: Tạo OAuth Callback Page

### Tạo file: `frontend/src/pages/AuthCallback.jsx`

```jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Save token and redirect to dashboard
      localStorage.setItem('token', token);
      login(token);
      navigate('/dashboard');
    } else {
      // Error, redirect to login
      navigate('/login?error=auth_failed');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
```

---

## 🔹 BƯỚC 4.2: Update Routes

### Trong `frontend/src/App.jsx`, thêm route:

```jsx
import AuthCallback from './pages/AuthCallback';

// ... existing code ...

<Route path="/auth/callback" element={<AuthCallback />} />
```

---

## 🔹 BƯỚC 4.3: Thêm OAuth Buttons Vào Login Page

### Update `frontend/src/pages/Login.jsx`:

```jsx
// ... existing imports ...

export default function Login() {
  // ... existing code ...

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL.replace('/api', '')}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL.replace('/api', '')}/api/auth/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* ... existing header ... */}

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Đăng nhập với Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Đăng nhập với Facebook
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Hoặc</span>
          </div>
        </div>

        {/* ... existing login form ... */}
      </div>
    </div>
  );
}
```

---

## 🔹 BƯỚC 4.4: Thêm OAuth Buttons Vào Register Page

### Tương tự, update `frontend/src/pages/Register.jsx`:

```jsx
// Copy code OAuth buttons từ Login.jsx vào Register.jsx
```

---

## ✅ CHECKLIST PHẦN 4:

- [ ] Đã tạo AuthCallback.jsx
- [ ] Đã thêm route /auth/callback
- [ ] Đã thêm OAuth buttons vào Login
- [ ] Đã thêm OAuth buttons vào Register

---

# PHẦN 5: DEPLOY

## 🎯 Mục Tiêu
Deploy code OAuth lên Render và Vercel.

## ⏱️ Thời Gian
5-10 phút

---

## 🔹 BƯỚC 5.1: Commit & Push Code

```powershell
cd D:\Code\Aurora-Ledger

git add .
git commit -m "Add Google and Facebook OAuth login"
git push origin main
```

---

## 🔹 BƯỚC 5.2: Cập Nhật Environment Variables Trên Render

```
1. Vào: https://dashboard.render.com
2. Click service: aurora-ledger-backend
3. Click "Environment"
4. Thêm 4 biến mới:

   GOOGLE_CLIENT_ID = [Google Client ID của bạn]
   GOOGLE_CLIENT_SECRET = [Google Client Secret của bạn]
   FACEBOOK_APP_ID = [Facebook App ID của bạn]
   FACEBOOK_APP_SECRET = [Facebook App Secret của bạn]
   OAUTH_CALLBACK_URL = https://aurora-ledger-backend.onrender.com

5. Click "Save Changes"
6. Đợi Render redeploy (1-2 phút)
```

---

## 🔹 BƯỚC 5.3: Test OAuth

```
1. Vào: https://aurora-ledger.vercel.app/login

2. Click nút "Đăng nhập với Google"
   - Chọn tài khoản Google
   - Cho phép truy cập
   - Nếu thành công → Redirect về Dashboard ✅

3. Đăng xuất và thử "Đăng nhập với Facebook"
   - Đăng nhập Facebook
   - Cho phép truy cập
   - Nếu thành công → Redirect về Dashboard ✅
```

---

## ✅ HOÀN THÀNH!

Bây giờ users có thể:
- ✅ Đăng nhập bằng Email/Password
- ✅ Đăng nhập bằng Google
- ✅ Đăng nhập bằng Facebook

---

## 🐛 XỬ LÝ LỖI

### Lỗi: "Redirect URI mismatch"

**Giải pháp:**
- Kiểm tra lại Authorized Redirect URIs trên Google/Facebook
- Phải chính xác: `https://aurora-ledger-backend.onrender.com/api/auth/google/callback`

### Lỗi: "App not approved"

**Giải pháp:**
- Google: App ở chế độ Testing → Chỉ tài khoản test được dùng
- Facebook: Chuyển app sang Live mode

### Lỗi: "Email scope not granted"

**Giải pháp:**
- Thêm email scope vào OAuth request
- Google: Đã có trong code
- Facebook: Thêm `email` vào `profileFields`

---

**CHÚC BẠN THÀNH CÔNG!** 🎉

