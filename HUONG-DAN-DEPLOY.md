# 🚀 HƯỚNG DẪN DEPLOY AURORALEDGER LÊN WEB - TỪNG BƯỚC CHI TIẾT

> **Dành cho người mới bắt đầu** - Hướng dẫn này sẽ giúp bạn deploy ứng dụng lên internet **100% miễn phí** trong vòng 30 phút!

---

## 📋 MỤC LỤC

1. [Chuẩn Bị](#bước-0-chuẩn-bị)
2. [Upload Code Lên GitHub](#bước-1-upload-code-lên-github)
3. [Tạo Database (Neon)](#bước-2-tạo-database-trên-neon)
4. [Deploy Backend (Render)](#bước-3-deploy-backend-lên-render)
5. [Deploy Frontend (Vercel)](#bước-4-deploy-frontend-lên-vercel)
6. [Hoàn Tất & Kiểm Tra](#bước-5-hoàn-tất--kiểm-tra)
7. [Xử Lý Lỗi](#xử-lý-lỗi-thường-gặp)

---

## 🎯 BƯỚC 0: CHUẨN BỊ

### ✅ Những Gì Bạn Cần:

- [ ] **Email** để đăng ký các tài khoản
- [ ] **Kết nối internet** ổn định
- [ ] **30 phút** thời gian rảnh
- [ ] Code của dự án AuroraLedger (bạn đã có rồi!)

### ✅ Tạo Các Tài Khoản (MIỄN PHÍ):

Mở trình duyệt và đăng ký 4 tài khoản sau (dùng cùng 1 email cho tiện):

1. **GitHub** - Lưu trữ code
   - 🔗 Truy cập: https://github.com/signup
   - ✅ Click "Sign up"
   - ✅ Nhập email, tạo password, chọn username
   - ✅ Xác nhận email

2. **Neon** - Database miễn phí
   - 🔗 Truy cập: https://neon.tech
   - ✅ Click "Sign up" 
   - ✅ Chọn "Continue with GitHub" (đăng nhập bằng GitHub cho nhanh)

3. **Render** - Host Backend miễn phí
   - 🔗 Truy cập: https://render.com
   - ✅ Click "Get Started"
   - ✅ Chọn "GitHub" để đăng nhập

4. **Vercel** - Host Frontend miễn phí
   - 🔗 Truy cập: https://vercel.com
   - ✅ Click "Sign Up"
   - ✅ Chọn "Continue with GitHub"

> 💡 **Mẹo:** Đăng nhập bằng GitHub cho tất cả để tiện quản lý!

---

## 🎯 BƯỚC 1: UPLOAD CODE LÊN GITHUB

### Bước 1.1: Tạo Repository Mới Trên GitHub

1. **Đăng nhập GitHub**: https://github.com
2. Click nút **"+"** ở góc trên bên phải → chọn **"New repository"**
3. Điền thông tin:
   ```
   Repository name: aurora-ledger
   Description: Personal Finance Management App
   ✅ Public (để deploy miễn phí)
   ❌ KHÔNG TICK "Add a README file" (vì ta đã có rồi)
   ❌ KHÔNG TICK "Add .gitignore"
   ❌ KHÔNG TICK "Choose a license"
   ```
4. Click **"Create repository"**
5. **GHI CHÚ LẠI** URL repository, dạng: `https://github.com/YOUR_USERNAME/aurora-ledger.git`

### Bước 1.2: Upload Code Từ Máy Tính

**Mở Command Prompt hoặc PowerShell:**

```powershell
# Bước 1: Di chuyển vào thư mục dự án
cd D:\Code\Aurora-Ledger

# Bước 2: Khởi tạo Git
git init

# Bước 3: Thêm tất cả file vào Git
git add .

# Bước 4: Commit (lưu lại)
git commit -m "Initial commit - AuroraLedger v1.0"

# Bước 5: Đổi tên branch thành main
git branch -M main

# Bước 6: Kết nối với GitHub
# Thay YOUR_USERNAME bằng username GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/aurora-ledger.git

# Bước 7: Push (đẩy) code lên GitHub
git push -u origin main
```

> 📝 **Lưu ý:** Nếu lần đầu push, Git sẽ yêu cầu đăng nhập GitHub:
> - Username: `your_github_username`
> - Password: **KHÔNG DÙNG** password thường, phải dùng **Personal Access Token**

### Bước 1.3: Tạo Personal Access Token (Nếu Cần)

Nếu Git yêu cầu password:

1. Vào GitHub → Click avatar → **Settings**
2. Kéo xuống dưới → Click **Developer settings**
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **"Generate new token"** → **"Generate new token (classic)"**
5. Điền:
   ```
   Note: Git Access for Aurora-Ledger
   Expiration: 90 days
   ✅ Tick vào: repo (chọn tất cả)
   ```
6. Click **"Generate token"**
7. **SAO CHÉP** token này (chỉ hiện 1 lần!)
8. Dùng token này làm password khi Git hỏi

### ✅ Kiểm Tra

- Vào `https://github.com/YOUR_USERNAME/aurora-ledger`
- Bạn sẽ thấy tất cả code đã được upload!

---

## 🎯 BƯỚC 2: TẠO DATABASE TRÊN NEON

### Bước 2.1: Tạo Project Mới

1. **Đăng nhập Neon**: https://console.neon.tech
2. Click **"Create a project"** (hoặc nút "+" nếu đã có project)
3. Điền thông tin:
   ```
   Project name: aurora-ledger
   PostgreSQL version: 16 (hoặc mới nhất)
   Region: Singapore (gần Việt Nam nhất, tốc độ nhanh)
   ```
4. Click **"Create project"**
5. Đợi 10-20 giây để Neon tạo database

### Bước 2.2: Lấy Connection String

1. Sau khi tạo xong, bạn sẽ thấy màn hình **"Connection Details"**
2. Tìm mục **"Connection string"**
3. Click vào dropdown, chọn **"Node.js"** hoặc **"Prisma"**
4. Sao chép chuỗi có dạng:
   ```
   postgresql://username:password@ep-xxx-xxx.aws.neon.tech/neondb?sslmode=require
   ```
5. **QUAN TRỌNG: Lưu chuỗi này lại!** (copy vào Notepad)

> 💡 **Mẹo:** Nếu không thấy, vào **Dashboard** → Click vào project **aurora-ledger** → Tab **"Connection Details"**

### Bước 2.3: Chạy Migration (Tạo Bảng Trong Database)

**Trên máy tính của bạn:**

```powershell
# Bước 1: Di chuyển vào thư mục backend
cd D:\Code\Aurora-Ledger\backend

# Bước 2: Tạo file .env (nếu chưa có)
# Windows PowerShell:
Copy-Item env.example .env

# Bước 3: Mở file .env bằng Notepad
notepad .env
```

**Chỉnh sửa file `.env`:**

```env
PORT=5000
NODE_ENV=development

# DÁN Connection String từ Neon vào đây
DATABASE_URL=postgresql://username:password@ep-xxx.aws.neon.tech/neondb?sslmode=require

# Tạo JWT Secret ngẫu nhiên (ít nhất 32 ký tự)
JWT_SECRET=abc123xyz789-change-this-to-random-string-min-32-chars

JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Lưu file và chạy migration:**

```powershell
# Bước 4: Cài đặt packages (nếu chưa cài)
npm install

# Bước 5: Chạy migration để tạo bảng
npm run migrate

# Bước 6: (Tùy chọn) Thêm dữ liệu mẫu
npm run seed
```

**Kết quả thành công:**
```
✓ All migrations completed successfully!
✓ Database is ready!
```

### ✅ Kiểm Tra Database

1. Quay lại **Neon Dashboard**
2. Click vào project **aurora-ledger**
3. Click **"Tables"** ở sidebar
4. Bạn sẽ thấy các bảng: `users`, `categories`, `transactions`, `budgets`, `migrations`

---

## 🎯 BƯỚC 3: DEPLOY BACKEND LÊN RENDER

### Bước 3.1: Tạo Web Service

1. **Đăng nhập Render**: https://dashboard.render.com
2. Click **"New +"** ở góc trên → Chọn **"Web Service"**
3. Click **"Build and deploy from a Git repository"** → **"Next"**
4. **Kết nối GitHub:**
   - Click **"Connect account"** hoặc **"Configure account"**
   - Cho phép Render truy cập GitHub
   - Chọn repository: **aurora-ledger**
   - Click **"Connect"**

### Bước 3.2: Cấu Hình Service

**Điền thông tin như sau:**

| Trường | Giá trị |
|--------|---------|
| **Name** | `aurora-ledger-backend` |
| **Region** | `Singapore` |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Bước 3.3: Chọn Plan

- Instance Type: **Free** (0$/tháng)
- Click **"Advanced"** để mở phần Environment Variables

### Bước 3.4: Thêm Environment Variables

Click **"Add Environment Variable"** và thêm **TỪNG BIẾN MỘT:**

| Key | Value | Ghi chú |
|-----|-------|---------|
| `NODE_ENV` | `production` | Môi trường production |
| `DATABASE_URL` | `postgresql://...` | **DÁN** connection string từ Neon |
| `JWT_SECRET` | `your-random-secret-min-32-chars` | Tạo chuỗi ngẫu nhiên dài |
| `JWT_EXPIRES_IN` | `7d` | Token hết hạn sau 7 ngày |
| `PORT` | `5000` | Cổng server |

> ⚠️ **LƯU Ý:**
> - `DATABASE_URL`: Dùng chuỗi từ Neon (Bước 2.2)
> - `JWT_SECRET`: Tạo bằng cách gõ ngẫu nhiên 40-50 ký tự, hoặc dùng: `openssl rand -base64 32`
> - **CHƯA ĐIỀN** `FRONTEND_URL` (sẽ điền sau khi deploy frontend)

### Bước 3.5: Deploy

1. Kéo xuống dưới cùng
2. Click **"Create Web Service"**
3. Render sẽ bắt đầu build và deploy (mất 2-5 phút)

**Theo dõi tiến trình:**
- Bạn sẽ thấy logs đang chạy
- Đợi đến khi thấy: **"Your service is live 🎉"**

### Bước 3.6: Lấy URL Backend

1. Sau khi deploy thành công, xem phía trên cùng
2. Bạn sẽ thấy URL dạng: `https://aurora-ledger-backend.onrender.com`
3. **LƯU LẠI URL này!** (copy vào Notepad)

### ✅ Kiểm Tra Backend

1. Mở trình duyệt
2. Truy cập: `https://aurora-ledger-backend.onrender.com/health`
3. Nếu thấy `{"status":"ok",...}` → **Thành công!** ✅
4. Nếu lỗi → Xem [Xử Lý Lỗi](#xử-lý-lỗi-thường-gặp)

---

## 🎯 BƯỚC 4: DEPLOY FRONTEND LÊN VERCEL

### Bước 4.1: Import Project

1. **Đăng nhập Vercel**: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Tìm repository **aurora-ledger** → Click **"Import"**

### Bước 4.2: Cấu Hình Project

**Configure Project:**

| Trường | Giá trị | Ghi chú |
|--------|---------|---------|
| **Project Name** | `aurora-ledger` | Tên project |
| **Framework Preset** | `Vite` | Tự động detect |
| **Root Directory** | Click **"Edit"** → Chọn `frontend` | **QUAN TRỌNG!** |
| **Build Command** | `npm run build` | Để mặc định |
| **Output Directory** | `dist` | Để mặc định |
| **Install Command** | `npm install` | Để mặc định |

### Bước 4.3: Thêm Environment Variables

**Trong mục "Environment Variables":**

1. Click **"Add Environment Variable"**
2. Điền:
   ```
   Name: VITE_API_URL
   Value: https://aurora-ledger-backend.onrender.com/api
   ```
   **⚠️ Thay `aurora-ledger-backend.onrender.com` bằng URL backend của BẠN (từ Bước 3.6)**
   
3. Click **"Add"**

### Bước 4.4: Deploy

1. Click **"Deploy"**
2. Vercel sẽ build và deploy (30-60 giây)
3. Đợi cho đến khi thấy: **"Congratulations! 🎉"**

### Bước 4.5: Lấy URL Frontend

1. Sau khi deploy thành công, Vercel sẽ hiển thị URL
2. URL có dạng: `https://aurora-ledger.vercel.app` hoặc `https://aurora-ledger-xxx.vercel.app`
3. **LƯU LẠI URL này!**

---

## 🎯 BƯỚC 5: HOÀN TẤT & KIỂM TRA

### Bước 5.1: Cập Nhật CORS Cho Backend

**Để frontend gọi được backend, cần cập nhật CORS:**

1. Quay lại **Render Dashboard**: https://dashboard.render.com
2. Click vào service **aurora-ledger-backend**
3. Click tab **"Environment"** ở sidebar trái
4. Tìm biến `FRONTEND_URL` → Click **"Edit"**
5. **Nếu chưa có**, click **"Add Environment Variable"**:
   ```
   Key: FRONTEND_URL
   Value: https://aurora-ledger.vercel.app
   ```
   **⚠️ Thay bằng URL Vercel của BẠN (từ Bước 4.5)**
   
6. Click **"Save Changes"**
7. Render sẽ **tự động deploy lại** backend (1-2 phút)

### Bước 5.2: Kiểm Tra Website

1. **Mở URL frontend**: `https://aurora-ledger.vercel.app` (URL của bạn)
2. Click **"Try Demo Account"** hoặc đăng ký tài khoản mới
3. Thử các tính năng:
   - ✅ Dashboard hiển thị đúng
   - ✅ Thêm giao dịch
   - ✅ Tạo danh mục
   - ✅ Đặt ngân sách
   - ✅ Xem báo cáo

### ✅ HOÀN THÀNH! 🎉

**Chúc mừng! Website của bạn đã LIVE:**

- 🌐 **Frontend**: `https://aurora-ledger.vercel.app`
- 🔧 **Backend**: `https://aurora-ledger-backend.onrender.com`
- 💾 **Database**: Neon PostgreSQL

**Chia sẻ với bạn bè:**
```
Xem app quản lý tài chính của tôi:
https://aurora-ledger.vercel.app

Dùng tài khoản demo:
Email: demo@auroraledger.com
Password: demo123
```

---

## 🔄 CẬP NHẬT CODE SAU NÀY

Khi bạn sửa code, chỉ cần:

```powershell
cd D:\Code\Aurora-Ledger

# Thêm file đã sửa
git add .

# Commit với message mô tả
git commit -m "Fix: Sửa lỗi hiển thị dashboard"

# Push lên GitHub
git push
```

**Vercel và Render sẽ tự động deploy!** 🚀

---

## ⚠️ XỬ LÝ LỖI THƯỜNG GẶP

### 1. Backend Deploy Failed (Render)

**Lỗi:** `Build failed` hoặc `Deployment failed`

**Giải pháp:**
- Kiểm tra **Root Directory = `backend`**
- Kiểm tra **Build Command = `npm install`**
- Kiểm tra **Start Command = `npm start`**
- Xem logs để tìm lỗi cụ thể

### 2. Frontend Build Failed (Vercel)

**Lỗi:** `Build failed` hoặc không tìm thấy `package.json`

**Giải pháp:**
- Kiểm tra **Root Directory = `frontend`** (click Edit để chọn)
- Kiểm tra **VITE_API_URL** đã điền đúng chưa
- Đảm bảo URL backend có `/api` ở cuối

### 3. Frontend Không Gọi Được Backend

**Lỗi:** `Network Error` hoặc `CORS Error`

**Giải pháp:**
1. Kiểm tra `VITE_API_URL` trong Vercel Environment Variables
2. Kiểm tra `FRONTEND_URL` trong Render Environment Variables
3. Đảm bảo backend đang chạy: mở `https://your-backend.onrender.com/health`
4. **Redeploy** cả frontend và backend

### 4. Database Connection Error

**Lỗi:** `Connection refused` hoặc `Database error`

**Giải pháp:**
- Kiểm tra `DATABASE_URL` trong Render có đúng không
- Vào Neon Dashboard, copy lại Connection String
- Paste vào Render Environment Variables → Save Changes
- Render sẽ tự động redeploy

### 5. Render Free Tier "Sleeping"

**Hiện tượng:** Lần đầu mở web chờ 30-60 giây

**Giải pháp:** Đây là bình thường! Free tier của Render sẽ "ngủ" sau 15 phút không dùng. Lần đầu truy cập sẽ mất ~30s để "đánh thức" server.

**Cách khắc phục:**
- Nâng cấp lên Render Paid ($7/tháng) - server không ngủ
- Hoặc dùng UptimeRobot.com để ping server 5 phút/lần (giữ server thức)

### 6. JWT Secret Error

**Lỗi:** `JWT malformed` hoặc `Invalid token`

**Giải pháp:**
- `JWT_SECRET` phải giống nhau ở local và production
- Độ dài tối thiểu 32 ký tự
- Không chứa ký tự đặc biệt lạ

---

## 📊 GIỚI HẠN FREE TIER

### Neon (Database)
- ✅ 0.5 GB Storage
- ✅ 100 giờ compute/tháng
- ✅ Đủ cho ~500-1000 users
- ⚠️ Ngủ sau 5 phút không hoạt động (tự động thức khi có request)

### Render (Backend)
- ✅ 750 giờ/tháng
- ✅ 512 MB RAM
- ⚠️ **Ngủ sau 15 phút không dùng** (wake up ~30s)
- ⚠️ Giới hạn 100 GB bandwidth/tháng

### Vercel (Frontend)
- ✅ 100 GB bandwidth/tháng
- ✅ Unlimited deployments
- ✅ **KHÔNG NGỦ** (truy cập nhanh 24/7)
- ✅ Free SSL certificate
- ✅ Auto scaling

---

## 🎯 SAU KHI DEPLOY XONG

### ✅ Checklist

- [ ] Code đã push lên GitHub
- [ ] Database đã tạo trên Neon
- [ ] Migration đã chạy thành công
- [ ] Backend đã deploy trên Render
- [ ] Frontend đã deploy trên Vercel
- [ ] Environment variables đã set đầy đủ
- [ ] CORS đã config (`FRONTEND_URL`)
- [ ] Website hoạt động bình thường
- [ ] Đã test đăng ký, đăng nhập, thêm giao dịch

### 📝 Ghi Chú Quan Trọng

**Lưu lại các URL:**
```
GitHub: https://github.com/YOUR_USERNAME/aurora-ledger
Frontend: https://aurora-ledger.vercel.app
Backend: https://aurora-ledger-backend.onrender.com
Neon DB: https://console.neon.tech/app/projects/YOUR_PROJECT_ID
```

**Lưu lại các credentials:**
```
DATABASE_URL: postgresql://...
JWT_SECRET: ...
```

### 🎉 Hoàn Tất

**Bây giờ bạn có thể:**
- ✅ Truy cập website từ bất kỳ đâu
- ✅ Chia sẻ với bạn bè
- ✅ Thêm vào portfolio/CV
- ✅ Deploy thêm custom domain (nâng cao)

---

## 🔐 BẢO MẬT

**Những điều QUAN TRỌNG:**

1. ✅ **KHÔNG BAO GIỜ** commit file `.env`
2. ✅ **KHÔNG BAO GIỜ** push `DATABASE_URL` hoặc `JWT_SECRET` lên GitHub
3. ✅ Dùng JWT_SECRET dài, ngẫu nhiên, khó đoán
4. ✅ Thay đổi JWT_SECRET định kỳ (3-6 tháng)
5. ✅ Update dependencies thường xuyên: `npm update`
6. ✅ Backup database định kỳ (Neon có auto backup)

---

## 📞 HỖ TRỢ

**Gặp khó khăn?**

1. Đọc lại hướng dẫn từ đầu
2. Kiểm tra logs trên Render/Vercel
3. Tìm kiếm lỗi trên Google
4. Hỏi trên GitHub Issues

---

## 🎓 NÂNG CAO (Tùy Chọn)

### Custom Domain

**Thay vì `aurora-ledger.vercel.app`, dùng `myfinance.com`:**

1. Mua domain (Namecheap, GoDaddy ~$10/năm)
2. Vào Vercel → Project Settings → Domains
3. Add domain → Follow hướng dẫn

### CI/CD Auto Deploy

**Đã tự động!** Mỗi khi push code:
- GitHub → Trigger → Vercel/Render auto deploy

### Monitoring

**Theo dõi uptime:**
1. Đăng ký UptimeRobot.com (free)
2. Add monitor với URL backend
3. Nhận email khi server down

---

**CHÚC BẠN DEPLOY THÀNH CÔNG! 🚀**

**Có thắc mắc? Hỏi tôi bất cứ lúc nào!** 😊

---

Made with ❤️ for Vietnamese Developers

