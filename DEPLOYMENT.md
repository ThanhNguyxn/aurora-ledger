# 🚀 Hướng Dẫn Cài Đặt & Triển Khai AuroraLedger

> ⚠️ **LƯU Ý:** File này chỉ để hướng dẫn bạn cài đặt và deploy. **SAU KHI DEPLOY XONG, HÃY XÓA FILE NÀY ĐI!**

---

## 💻 Chạy Trên Máy Tính (Development)

### Yêu Cầu Hệ Thống

Cài đặt trước:

| Phần mềm | Phiên bản | Link tải |
|----------|-----------|----------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **PostgreSQL** | 12+ | [postgresql.org](https://www.postgresql.org/download/) |
| **Git** | Mới nhất | [git-scm.com](https://git-scm.com/) |

### Bước 1: Tải Mã Nguồn

```bash
# Clone repository
git clone <your-repo-url>
cd Aurora-Ledger
```

### Bước 2: Cài Đặt Backend

```bash
# Vào thư mục backend
cd backend

# Cài đặt packages
npm install

# Tạo file .env từ template
cp env.example .env
```

**Chỉnh sửa file `backend/.env`:**

```env
PORT=5000
NODE_ENV=development

# Option 1: PostgreSQL trên máy
DATABASE_URL=postgresql://postgres:matkhau@localhost:5432/aurora_ledger

# Option 2: Neon (Free cloud database - khuyến nghị)
# DATABASE_URL=postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require

# Tạo JWT secret ngẫu nhiên (chạy: openssl rand -base64 32)
JWT_SECRET=your-super-secret-key-at-least-32-characters-long

JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Tạo database (nếu dùng PostgreSQL local):**

```bash
createdb aurora_ledger

# Hoặc:
psql -U postgres
CREATE DATABASE aurora_ledger;
\q
```

**Chạy migrations:**

```bash
npm run migrate
```

**Thêm dữ liệu mẫu (tùy chọn):**

```bash
npm run seed
```

Sẽ tạo tài khoản demo: `demo@auroraledger.com` / `demo123`

**Khởi động backend:**

```bash
npm run dev
```

✅ Backend chạy tại: `http://localhost:5000`

### Bước 3: Cài Đặt Frontend

Mở **terminal mới**:

```bash
# Vào thư mục frontend
cd frontend

# Cài đặt packages
npm install

# Tạo file .env
cp env.example .env
```

**Chỉnh sửa file `frontend/.env`:**

```env
VITE_API_URL=http://localhost:5000/api
```

**Khởi động frontend:**

```bash
npm run dev
```

✅ Frontend chạy tại: `http://localhost:5173`

### Bước 4: Test

Mở trình duyệt: `http://localhost:5173`

- Click **"Try Demo Account"** để dùng tài khoản mẫu
- Hoặc đăng ký tài khoản mới

---

## ☁️ Triển Khai Lên Internet (100% Miễn Phí)

### Tổng Quan

- **Database:** Neon (PostgreSQL serverless)
- **Backend:** Render (Server miễn phí)
- **Frontend:** Vercel (Hosting miễn phí)

**Chi phí: 0đ/tháng** 🎉

### Bước 1: Push Code Lên GitHub

```bash
# Tạo repository mới trên github.com
# Sau đó:

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/aurora-ledger.git
git push -u origin main
```

### Bước 2: Deploy Database (Neon)

#### 2.1. Tạo tài khoản

1. Truy cập [neon.tech](https://neon.tech)
2. Sign up (miễn phí)
3. Đăng nhập

#### 2.2. Tạo Database

1. Click **"Create a project"**
2. Điền:
   - **Name:** `aurora-ledger`
   - **PostgreSQL version:** 15
   - **Region:** Singapore (gần VN nhất)
3. Click **"Create project"**

#### 2.3. Lấy Connection String

Copy **Connection String** (dạng):
```
postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

**Lưu lại chuỗi này!**

#### 2.4. Chạy Migration

Trên máy tính:

```bash
cd backend

# Set database URL tạm thời
export DATABASE_URL="<dán connection string vừa copy>"

# Windows dùng:
# set DATABASE_URL=<dán connection string>

# Chạy migration
npm run migrate

# (Tùy chọn) Thêm dữ liệu mẫu
npm run seed
```

✅ Database sẵn sàng!

### Bước 3: Deploy Backend (Render)

#### 3.1. Tạo tài khoản

1. Truy cập [render.com](https://render.com)
2. Sign up với GitHub

#### 3.2. Tạo Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repository của bạn
3. Chọn repository `aurora-ledger`

#### 3.3. Cấu hình

| Field | Value |
|-------|-------|
| **Name** | `aurora-ledger-backend` |
| **Region** | Singapore |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

#### 3.4. Environment Variables

Thêm các biến môi trường:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Dán Neon connection string |
| `JWT_SECRET` | Tạo random (dùng `openssl rand -base64 32`) |
| `JWT_EXPIRES_IN` | `7d` |
| `FRONTEND_URL` | Để trống (điền sau) |

#### 3.5. Deploy

1. Plan: Chọn **Free**
2. Click **"Create Web Service"**
3. Đợi 2-3 phút

Bạn sẽ có URL dạng: `https://aurora-ledger-backend.onrender.com`

**Lưu lại URL này!**

#### 3.6. Kiểm tra

Mở: `https://aurora-ledger-backend.onrender.com/health`

Nếu thấy `{"status":"ok",...}` là thành công! ✅

### Bước 4: Deploy Frontend (Vercel)

#### 4.1. Tạo tài khoản

1. Truy cập [vercel.com](https://vercel.com)
2. Sign up với GitHub

#### 4.2. Import Project

1. Click **"Add New..."** → **"Project"**
2. Chọn repository `aurora-ledger`
3. Click **"Import"**

#### 4.3. Cấu hình

1. **Framework Preset:** Vite (tự động)
2. **Root Directory:** Click **"Edit"** → Chọn `frontend`
3. **Build Settings:** Để mặc định

#### 4.4. Environment Variable

Thêm biến:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://aurora-ledger-backend.onrender.com/api` |

⚠️ Thay `aurora-ledger-backend.onrender.com` bằng URL backend của bạn

#### 4.5. Deploy

Click **"Deploy"**

Đợi ~30 giây, bạn sẽ có URL: `https://aurora-ledger.vercel.app`

### Bước 5: Cập Nhật Backend CORS

1. Vào [Render Dashboard](https://dashboard.render.com)
2. Click service `aurora-ledger-backend`
3. Tab **"Environment"**
4. Cập nhật `FRONTEND_URL` = URL Vercel của bạn
5. Save (service sẽ tự deploy lại)

### ✅ Hoàn Thành!

App của bạn đã LIVE tại: `https://aurora-ledger.vercel.app`

---

## 🔧 Khắc Phục Sự Cố

### Backend không kết nối Database

```bash
# Kiểm tra connection string
echo $DATABASE_URL

# Test kết nối
psql "your-database-url"
```

### Frontend không call được Backend

1. Kiểm tra `VITE_API_URL` trong frontend/.env
2. Kiểm tra backend đang chạy: `curl http://localhost:5000/health`
3. Kiểm tra CORS: `FRONTEND_URL` trong backend/.env

### Port đã được dùng

```bash
# Đổi port trong backend/.env
PORT=5001

# Hoặc kill process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Module not found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Render build failed

1. Kiểm tra Root Directory = `backend`
2. Kiểm tra Build Command = `npm install`
3. Xem logs để tìm lỗi

### Vercel build failed

1. Kiểm tra Root Directory = `frontend`
2. Đảm bảo `VITE_API_URL` đã set
3. Xem build logs

---

## 📊 Free Tier Limits

### Neon
- Storage: 0.5 GB
- Compute: 100 giờ/tháng
- Đủ cho ~1000 users

### Render
- Compute: 750 giờ/tháng
- RAM: 512 MB
- ⚠️ **Ngủ sau 15 phút không dùng** (lần đầu wake up ~30s)

### Vercel
- Bandwidth: 100 GB/tháng
- Deployments: Không giới hạn
- Không ngủ

---

## 🎯 Sau Khi Deploy Xong

### Checklist

- [ ] Database đã tạo trên Neon
- [ ] Migration đã chạy
- [ ] Backend đã deploy trên Render
- [ ] Frontend đã deploy trên Vercel
- [ ] Environment variables đã set đầy đủ
- [ ] CORS đã config
- [ ] Website hoạt động bình thường
- [ ] Đã test tất cả tính năng

### Dọn Dẹp

**Sau khi deploy thành công, XÓA file này đi:**

```bash
rm DEPLOYMENT.md
```

Chỉ giữ lại:
- ✅ README.md (giới thiệu cho người dùng)
- ✅ LICENSE
- ✅ Code backend/frontend
- ✅ .github/workflows/ (CI/CD)

### Cập Nhật Code

Mỗi khi bạn sửa code:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

Vercel và Render sẽ **tự động deploy**! 🎉

---

## 🔒 Bảo Mật

Quan trọng:

1. ✅ Không commit file `.env`
2. ✅ Dùng JWT_SECRET dài và ngẫu nhiên
3. ✅ Update dependencies thường xuyên: `npm update`
4. ✅ Backup database định kỳ

---

**Chúc bạn deploy thành công! 🚀**

**NHỚ XÓA FILE NÀY sau khi xong!**
