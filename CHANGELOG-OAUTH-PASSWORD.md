# 📋 CHANGELOG - OAuth Password & Auto Admin Setup

## 🎯 Vấn Đề Đã Fix

### ❌ Vấn đề cũ:
1. **User đăng nhập Google không thể đổi password** - form yêu cầu "Current Password" nhưng OAuth users không có password
2. **Setup admin thủ công** - phải chạy migration script qua Render Shell (nhưng free plan không có Shell)

### ✅ Giải pháp:
1. **OAuth Password Management** - OAuth users có thể set password lần đầu KHÔNG CẦN nhập current password
2. **Auto Setup via API** - Setup admin qua browser console hoặc HTTP request, không cần Shell access

---

## 🆕 Thay Đổi Code

### Backend Changes

#### 1. `backend/routes/profile.js`
**Đã sửa:**
- `GET /api/profile` - Thêm field `oauth_provider` vào response
- `PUT /api/profile` - Thêm field `oauth_provider` vào response
- `PUT /api/profile/change-password` - **Logic mới:**
  * Kiểm tra `oauth_provider` column
  * Nếu user có `oauth_provider !== 'local'` (Google login):
    - Không yêu cầu `currentPassword`
    - Cho phép set password trực tiếp
    - Sau khi set xong, đổi `oauth_provider` thành `'local'`
  * Nếu user là email/password (`oauth_provider = 'local'` hoặc null):
    - Yêu cầu `currentPassword` như cũ
    - Verify password trước khi đổi

**Code mẫu:**
```javascript
// Detect OAuth user
const isOAuthUser = user.oauth_provider && user.oauth_provider !== 'local';
const hasNoPassword = !user.password || user.password === '';

// Only require current password for non-OAuth users
if (!isOAuthUser && !hasNoPassword) {
  // Verify current password...
}

// Update password and change oauth_provider to 'local'
await pool.query(
  'UPDATE users SET password = $1, oauth_provider = $2 WHERE id = $3',
  [hashedPassword, 'local', req.user.userId]
);
```

#### 2. `backend/routes/setup.js`
**Đã sửa:**
- Thêm logic check và tạo cột `oauth_provider`
- Nếu cột chưa tồn tại → tạo với default `'local'`
- Endpoint `POST /api/setup/init-admin` giờ setup cả 2 columns: `role` và `oauth_provider`

#### 3. `backend/scripts/migrate-oauth-provider.js` (NEW)
**File mới:**
- Migration script để thêm cột `oauth_provider` vào bảng `users`
- Default value: `'local'`
- Type: `VARCHAR(20)`
- Có thể chạy thủ công nếu có server access

**Chạy:**
```bash
cd backend
node scripts/migrate-oauth-provider.js
```

---

### Frontend Changes

#### 1. `frontend/src/pages/Profile.jsx`
**Đã sửa:**

**A. Handle Password Submit:**
```javascript
// Check if user is OAuth user
const isOAuthUser = user?.oauth_provider && user.oauth_provider !== 'local';

// Only require current password for non-OAuth users
if (!isOAuthUser && !passwordForm.currentPassword) {
  toast.error('Current password is required');
  return;
}

// After successful password change, update user context for OAuth users
if (isOAuthUser) {
  const updatedUser = { ...user, oauth_provider: 'local' };
  setUser(updatedUser);
  localStorage.setItem('user', JSON.stringify(updatedUser));
}
```

**B. UI Changes:**
- **Thông báo cho OAuth users:**
  ```jsx
  {user?.oauth_provider && user.oauth_provider !== 'local' && (
    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20">
      <p className="text-sm text-blue-700 dark:text-blue-300">
        ℹ️ You logged in with Google. Set a password to also login with email.
      </p>
    </div>
  )}
  ```

- **Conditional Current Password Field:**
  ```jsx
  {/* Only show current password for non-OAuth users */}
  {(!user?.oauth_provider || user.oauth_provider === 'local') && (
    <div>
      <label>Current Password</label>
      <input type="password" required ... />
    </div>
  )}
  ```

#### 2. `frontend/src/i18n/locales/*.json`
**Đã thêm translations:**
- `profile.currentPasswordRequired` - "Current password is required"
- `profile.oauthPasswordInfo` - "You logged in with Google. Set a password to also login with email."

**Đã update:**
- `en.json` ✅
- `vi.json` ✅
- Cần update: `zh.json`, `es.json`, `fr.json`, `de.json`, `ja.json`, `ko.json`, `pt.json`, `ru.json`

---

## 🗄️ Database Changes

### New Column: `oauth_provider`
```sql
ALTER TABLE users 
ADD COLUMN oauth_provider VARCHAR(20) DEFAULT 'local';
```

**Giá trị:**
- `'local'` - User đăng ký bằng email/password (mặc định)
- `'google'` - User đăng nhập bằng Google OAuth
- Có thể mở rộng: `'facebook'`, `'github'`, etc.

**Existing Column: `role`**
```sql
ALTER TABLE users 
ADD COLUMN role VARCHAR(20) DEFAULT 'user';
```

**Giá trị:**
- `'user'` - User thường (mặc định)
- `'admin'` - Admin user (quản lý hệ thống)

---

## 📚 Documentation Files

### 1. `AUTO-SETUP-GUIDE.md` (NEW)
Hướng dẫn chi tiết setup admin qua API với nhiều phương pháp:
- Browser Console (khuyến nghị)
- Postman/Insomnia
- PowerShell (Windows)
- curl (Mac/Linux)
- Troubleshooting guide

### 2. `QUICK-SETUP.md` (NEW)
Hướng dẫn nhanh cho user cụ thể (thanhnguyentuan2007@gmail.com):
- Bước 1: Deploy code
- Bước 2: Chạy setup script (copy/paste sẵn)
- Bước 3: Logout & login
- Bước 4: Test OAuth password feature
- Bước 5: Test admin panel

### 3. `SETUP-ADMIN-VIA-API.md` (Đã có)
Hướng dẫn gốc về API setup endpoint.

---

## 🔄 Workflow Mới

### For OAuth Users (Google Login):

#### Lần đầu login:
1. User click "Login with Google"
2. OAuth callback tạo user với:
   - `password` = NULL
   - `oauth_provider` = 'google'
   - `role` = 'user'

#### Khi muốn set password:
1. User vào Profile page
2. Thấy thông báo: *"You logged in with Google. Set a password to also login with email."*
3. **Không cần nhập Current Password**
4. Chỉ nhập New Password + Confirm Password
5. Submit → Backend:
   - Hash password mới
   - Update `password` field
   - Đổi `oauth_provider` từ 'google' → 'local'

#### Sau khi set password:
- User có thể login bằng **Email/Password** HOẶC **Google OAuth**
- Khi đổi password tiếp, phải nhập Current Password (vì đã có password)

### For Email/Password Users:

#### Khi đổi password:
1. Vào Profile page
2. Thấy 3 trường:
   - Current Password (bắt buộc)
   - New Password
   - Confirm Password
3. Nhập đầy đủ 3 trường
4. Backend verify current password trước khi update

---

## 🧪 Testing Checklist

### Backend API:
- [ ] `GET /api/profile` trả về `oauth_provider` field
- [ ] `PUT /api/profile` trả về `oauth_provider` field
- [ ] `PUT /api/profile/change-password` cho OAuth user (không cần currentPassword)
- [ ] `PUT /api/profile/change-password` cho email/password user (cần currentPassword)
- [ ] `POST /api/setup/init-admin` tạo cả 2 columns (role + oauth_provider)

### Frontend UI:
- [ ] OAuth user: thấy thông báo xanh
- [ ] OAuth user: KHÔNG thấy trường "Current Password"
- [ ] Email/Password user: thấy trường "Current Password"
- [ ] Sau khi OAuth user set password → thấy trường "Current Password" (refresh context)
- [ ] Dark mode hoạt động đúng cho tất cả trường hợp

### Database:
- [ ] Column `oauth_provider` đã được tạo
- [ ] Column `role` đã được tạo (từ migration trước)
- [ ] Existing users có default values đúng

### Admin Setup:
- [ ] Setup script chạy thành công qua browser console
- [ ] Email admin được set role = 'admin'
- [ ] Sau logout & login → thấy menu Admin
- [ ] Admin panel hoạt động đầy đủ chức năng

---

## 🚀 Deployment Steps

### 1. Commit & Push:
```bash
git add .
git commit -m "feat: OAuth password management & auto admin setup

- Add oauth_provider column to users table
- Allow OAuth users to set password without current password
- Update Profile UI with conditional fields
- Add auto setup script via API endpoint
- Add comprehensive documentation"

git push origin main
```

### 2. Backend (Render):
- Auto deploy khi push code
- Đợi deploy xong
- Check logs để đảm bảo không có lỗi

### 3. Frontend (Vercel):
- Auto build khi push code
- Đợi build xong
- Check preview deployment

### 4. Run Setup:
Xem `QUICK-SETUP.md` để chạy setup script.

---

## 📊 Summary

### Files Created:
- `backend/scripts/migrate-oauth-provider.js`
- `AUTO-SETUP-GUIDE.md`
- `QUICK-SETUP.md`
- `CHANGELOG.md` (this file)

### Files Modified:
- `backend/routes/profile.js`
- `backend/routes/setup.js`
- `frontend/src/pages/Profile.jsx`
- `frontend/src/i18n/locales/en.json`
- `frontend/src/i18n/locales/vi.json`

### Database Changes:
- Added column: `oauth_provider VARCHAR(20) DEFAULT 'local'`

### Features Added:
✅ OAuth users can set password without current password  
✅ Auto admin setup via browser console  
✅ UI shows different fields based on login method  
✅ Password changes update oauth_provider status  
✅ Comprehensive documentation for setup  

---

## 💡 Next Steps (Optional)

### Nếu muốn mở rộng:
1. **Multi-OAuth Support:**
   - Thêm Facebook, GitHub OAuth
   - Update `oauth_provider` với các giá trị mới

2. **Account Linking:**
   - Cho phép link nhiều OAuth providers vào 1 account
   - Tạo bảng `user_oauth_providers` (many-to-many)

3. **Password Recovery cho OAuth Users:**
   - Nếu OAuth user set password rồi quên
   - Có thể dùng "Forgot Password" flow

4. **Security Enhancements:**
   - Thêm 2FA cho admin accounts
   - Require email verification khi đổi email
   - Password strength meter

---

Enjoy! 🎉
