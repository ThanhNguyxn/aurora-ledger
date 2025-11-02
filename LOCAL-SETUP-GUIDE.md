# 🚀 Local Development Setup Guide

## 📋 Prerequisites
- Node.js v22+ installed
- PostgreSQL database (local or Neon cloud)
- Git installed

---

## 🔧 Step-by-Step Setup

### 1️⃣ Frontend Environment Setup

**File:** `frontend/.env` hoặc `frontend/.env.local`

```env
# API endpoint - Point to your local backend
VITE_API_URL=http://localhost:5000/api
```

**Giải thích:**
- `VITE_API_URL`: URL của backend API (local thì dùng localhost:5000)

---

### 2️⃣ Backend Environment Setup

**File:** `backend/.env` (Tạo mới từ `backend/env.example`)

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=5000
NODE_ENV=development

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Option 1: Neon PostgreSQL (Cloud - FREE)
# 1. Tạo account tại: https://neon.tech
# 2. Tạo project mới
# 3. Copy connection string (có dạng postgresql://...)
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Option 2: Local PostgreSQL
# DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/aurora_ledger

# ============================================
# JWT AUTHENTICATION
# ============================================
# Tạo random string (dùng: openssl rand -base64 32)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-please
JWT_EXPIRES_IN=7d

# ============================================
# FRONTEND/BACKEND URLs
# ============================================
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# ============================================
# GOOGLE OAUTH (OPTIONAL - Có thể bỏ trống)
# ============================================
# Nếu muốn login bằng Google:
# 1. Vào https://console.cloud.google.com
# 2. Tạo OAuth 2.0 credentials
# 3. Authorized redirect URIs: http://localhost:5173/auth/google/callback
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ============================================
# CURRENCY EXCHANGE RATES API
# ============================================
# FREE tier: 1,500 requests/month
# Dùng key mặc định (đã có trong env.example) hoặc tạo mới:
# 1. Đăng ký tại: https://www.exchangerate-api.com
# 2. Copy API key
EXCHANGE_RATE_API_KEY=0fe9acb002e50ab852947697

# ============================================
# EMAIL SERVICE (OPTIONAL - Cho password reset)
# ============================================
# Option 1: Resend (Recommended - 100 emails/day FREE)
# 1. Đăng ký tại: https://resend.com
# 2. Tạo API key
# 3. Verify domain hoặc dùng test email
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com

# Option 2: SendGrid (Alternative - 100 emails/day FREE)
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# EMAIL_FROM=your-verified-email@domain.com

# Option 3: Gmail (Alternative - Cần App Password)
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-16-character-app-password
```

---

## 📝 Chi tiết từng biến môi trường

### 🔴 BẮT BUỘC (Required)

#### `DATABASE_URL`
**Cách lấy (Neon - FREE):**
1. Truy cập: https://neon.tech
2. Sign up / Login
3. Click "Create Project"
4. Đặt tên project: `aurora-ledger`
5. Chọn region gần nhất (Singapore cho VN)
6. Copy **Connection String** (tab "Connection Details")
7. Paste vào `DATABASE_URL`

**Format:**
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Ví dụ:**
```
DATABASE_URL=postgresql://neondb_owner:abc123xyz@ep-cold-sun-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
```

#### `JWT_SECRET`
**Cách tạo:**

**Option 1: Online**
- Vào: https://randomkeygen.com/
- Copy "CodeIgniter Encryption Keys" (256-bit)

**Option 2: PowerShell**
```powershell
# Tạo random 32-byte key
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

**Option 3: Manual**
- Tạo random string dài ít nhất 32 ký tự
- Ví dụ: `aB3xK9mP2qL7nR5sT8uW1vY4zA6cD0eF`

#### `EXCHANGE_RATE_API_KEY`
**Cách lấy:**
1. Truy cập: https://www.exchangerate-api.com/
2. Click "Get Free Key"
3. Nhập email và đăng ký
4. Check email → Click "Verify Email"
5. Copy API key từ dashboard
6. FREE tier: 1,500 requests/month

**Hoặc dùng key mặc định:**
```
EXCHANGE_RATE_API_KEY=0fe9acb002e50ab852947697
```

---

### 🟡 KHUYẾN NGHỊ (Recommended)

#### Email Service - Cho Password Reset

**Option 1: Resend (Recommended)**
1. Truy cập: https://resend.com
2. Sign up với email
3. Click "API Keys" → "Create API Key"
4. Copy key (bắt đầu với `re_`)
5. Add domain hoặc dùng test email

```env
RESEND_API_KEY=re_abc123xyz456def789ghi012jkl345
EMAIL_FROM=noreply@yourdomain.com
```

**Option 2: Gmail App Password**
1. Vào Google Account → Security
2. Enable "2-Step Verification"
3. Search "App passwords"
4. Generate password cho "Mail"
5. Copy 16-character password

```env
EMAIL_USER=yourname@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

---

### 🟢 TÙY CHỌN (Optional)

#### Google OAuth - Login bằng Google

1. Truy cập: https://console.cloud.google.com
2. Tạo project mới: "Aurora Ledger"
3. Enable "Google+ API"
4. Credentials → Create → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized JavaScript origins:
   ```
   http://localhost:5173
   ```
7. Authorized redirect URIs:
   ```
   http://localhost:5173/auth/google/callback
   http://localhost:5000/api/oauth/google/callback
   ```
8. Copy Client ID và Client Secret

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456ghi789jkl012
```

---

## 🗄️ Database Setup

### Cách 1: Sử dụng Neon (Cloud - Recommended)

**Ưu điểm:**
- ✅ FREE tier 0.5GB
- ✅ Không cần cài PostgreSQL local
- ✅ Auto backup
- ✅ Serverless (auto pause/resume)

**Bước thực hiện:**
1. Copy `DATABASE_URL` từ Neon vào `backend/.env`
2. Chạy migration:
   ```powershell
   cd backend
   npm install
   npm run migrate
   ```
3. (Optional) Seed data mẫu:
   ```powershell
   npm run seed
   ```

### Cách 2: PostgreSQL Local

**Bước cài đặt:**
1. Download PostgreSQL: https://www.postgresql.org/download/windows/
2. Install với password (nhớ password!)
3. Tạo database:
   ```sql
   CREATE DATABASE aurora_ledger;
   ```
4. Update `.env`:
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/aurora_ledger
   ```
5. Run migration:
   ```powershell
   cd backend
   npm run migrate
   ```

---

## 🚀 Khởi động Local Server

### 1. Start Backend
```powershell
# Terminal 1
cd d:\Code\Aurora-Ledger\backend
npm install          # Lần đầu tiên
npm start           # Chạy server port 5000
```

**Expected output:**
```
✅ Server running on port 5000
✅ Database connected
⚠️ Google OAuth disabled (if not configured)
```

### 2. Start Frontend
```powershell
# Terminal 2 (mở terminal mới)
cd d:\Code\Aurora-Ledger\frontend
npm install          # Lần đầu tiên
npm run dev         # Chạy Vite port 5173
```

**Expected output:**
```
VITE v5.4.21  ready in 230 ms
➜  Local:   http://localhost:5173/
```

### 3. Mở Browser
```
http://localhost:5173
```

---

## 🧪 Test Account

**Tạo user test:**
```powershell
cd backend
node create-test-user.js
```

**Login credentials:**
```
Email: test@aurora.com
Password: Test123456
```

---

## ❌ Troubleshooting

### ❗ Port 5000 đã được sử dụng
```powershell
# Kill process đang dùng port 5000
Get-Process -Name node | Stop-Process -Force

# Hoặc đổi port trong backend/.env
PORT=5001
```

### ❗ Database connection failed
- Check `DATABASE_URL` có đúng format không
- Nếu dùng Neon: Check project có bị pause không (auto-resume khi connect)
- Nếu dùng local: Check PostgreSQL service đang chạy

### ❗ Frontend không connect được backend
- Check backend đang chạy (`http://localhost:5000`)
- Check `frontend/.env` có `VITE_API_URL=http://localhost:5000/api`
- Restart frontend server sau khi đổi .env

### ❗ CORS error
- Check `FRONTEND_URL` trong `backend/.env` = `http://localhost:5173`
- Không có dấu `/` ở cuối URL

---

## 📦 NPM Scripts

### Backend
```powershell
npm start              # Start server
npm run dev            # Start with nodemon (auto-reload)
npm run migrate        # Run database migrations
npm run seed           # Seed sample data
npm test              # Run tests (nếu có)
```

### Frontend
```powershell
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 🔐 Security Checklist

- [ ] `JWT_SECRET` phải random và dài ít nhất 32 ký tự
- [ ] Không commit file `.env` lên Git (đã có trong .gitignore)
- [ ] `DATABASE_URL` chứa password → giữ bí mật
- [ ] Email API keys không share công khai
- [ ] Google OAuth credentials chỉ dùng cho localhost khi dev

---

## 📚 Tài liệu tham khảo

- **Neon Database:** https://neon.tech/docs
- **ExchangeRate API:** https://www.exchangerate-api.com/docs
- **Resend Email:** https://resend.com/docs
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2
- **Vite Env Variables:** https://vitejs.dev/guide/env-and-mode.html

---

## 💡 Tips

1. **Dùng Neon thay vì PostgreSQL local** → Đơn giản hơn, không tốn RAM
2. **ExchangeRate API key mặc định** → Dùng được luôn, không cần đăng ký
3. **Email service có thể skip** → Password reset sẽ không hoạt động nhưng app vẫn chạy
4. **Google OAuth có thể bỏ trống** → User vẫn register/login bằng email/password

---

**Last Updated:** November 2, 2025  
**Need help?** Check [ISSUES-AND-IDEAS.md](./ISSUES-AND-IDEAS.md) for known issues
