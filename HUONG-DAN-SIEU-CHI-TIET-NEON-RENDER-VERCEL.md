# 🚀 HƯỚNG DẪN SIÊU CHI TIẾT - NEON, RENDER, VERCEL

> **Hướng dẫn này mô tả TỪNG CLICK CHUỘT, TỪNG BƯỚC MỘT CÁCH CỰC KỲ CHI TIẾT**
>
> Dành cho người hoàn toàn mới bắt đầu - Không bỏ sót bất kỳ chi tiết nào!

---

## 📋 MỤC LỤC

1. [Phần 1: NEON - Tạo Database](#phần-1-neon---tạo-database-postgresql-miễn-phí)
2. [Phần 2: RENDER - Deploy Backend](#phần-2-render---deploy-backend-nodejs)
3. [Phần 3: VERCEL - Deploy Frontend](#phần-3-vercel---deploy-frontend-react)
4. [Phần 4: Kết Nối Tất Cả](#phần-4-kết-nối-tất-cả-lại)
5. [Phần 5: Kiểm Tra & Xử Lý Lỗi](#phần-5-kiểm-tra--xử-lý-lỗi)

---

# PHẦN 1: NEON - TẠO DATABASE POSTGRESQL MIỄN PHÍ

## 🎯 Mục Tiêu
Tạo một PostgreSQL database miễn phí trên Neon để lưu trữ dữ liệu của app.

## ⏱️ Thời Gian
5-7 phút

---

## 🔹 BƯỚC 1.1: Truy Cập Neon

### Hành động:
1. Mở trình duyệt (Chrome, Edge, Firefox...)
2. Vào địa chỉ: **https://neon.tech**
3. Đợi trang web load (2-3 giây)

### Bạn sẽ thấy:
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║                    🟢 NEON                               ║
║                                                          ║
║     Serverless Postgres built for the cloud             ║
║                                                          ║
║     [Sign Up]            [Sign In]                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 🔹 BƯỚC 1.2: Đăng Ký Tài Khoản

### Nếu bạn chưa có tài khoản:

#### Hành động:
1. Click nút **"Sign Up"** (góc trên bên phải)
2. Chọn **"Continue with GitHub"** (khuyến nghị) hoặc **"Continue with Google"**

#### Tại sao dùng GitHub/Google?
- ✅ Nhanh hơn (không cần xác nhận email)
- ✅ An toàn hơn
- ✅ Dùng chung cho Render và Vercel

#### Nếu chọn GitHub:
```
1. Click "Continue with GitHub"
2. Nếu chưa đăng nhập GitHub:
   - Nhập username/email GitHub
   - Nhập password GitHub
   - (Nếu có 2FA) Nhập mã 2FA
3. GitHub sẽ hỏi: "Authorize Neon?"
   → Click "Authorize Neon" (nút xanh lá)
4. Đợi 2-3 giây, bạn sẽ được chuyển về Neon
```

### Nếu bạn đã có tài khoản:
1. Click **"Sign In"**
2. Chọn phương thức đăng nhập (GitHub/Google/Email)
3. Đăng nhập

---

## 🔹 BƯỚC 1.3: Màn Hình Chào Mừng (Lần Đầu)

### Bạn sẽ thấy:
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  Welcome to Neon! 👋                                     ║
║                                                          ║
║  Let's create your first project                        ║
║                                                          ║
║  [Create a project]                                     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### Hành động:
- Click nút **"Create a project"** (nút lớn màu xanh/tím)

---

## 🔹 BƯỚC 1.4: Điền Thông Tin Project

### Màn hình bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Create a Project                                                 ║
║  ═══════════════                                                  ║
║                                                                   ║
║  Project name                                                     ║
║  ┌─────────────────────────────────────────────────────┐         ║
║  │ [Nhập tên ở đây]                              🔄    │         ║
║  └─────────────────────────────────────────────────────┘         ║
║                                                                   ║
║  PostgreSQL version                                               ║
║  ┌─────────────────────────────────────────────────────┐         ║
║  │ [▼ Chọn version]                                    │         ║
║  └─────────────────────────────────────────────────────┘         ║
║                                                                   ║
║  Region                                                           ║
║  ┌─────────────────────────────────────────────────────┐         ║
║  │ [▼ Chọn region]                                     │         ║
║  └─────────────────────────────────────────────────────┘         ║
║                                                                   ║
║  [Cancel]                            [Create project]            ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động Chi Tiết:

#### 1. Project Name (Tên dự án):
```
Click vào ô "Project name"
Xóa tên mặc định (nếu có)
Nhập: aurora-ledger
```
**Lưu ý:** 
- Chỉ dùng chữ thường, số, và dấu gạch ngang (-)
- Không dùng dấu cách, ký tự đặc biệt
- VD: ✅ aurora-ledger, ❌ Aurora Ledger

#### 2. PostgreSQL Version:
```
Click vào dropdown "PostgreSQL version"
Bạn sẽ thấy các lựa chọn:
  - 16 (Latest)      ← CHỌN CÁI NÀY
  - 15
  - 14
  - 13
  
Click chọn "16" hoặc "Latest"
```
**Tại sao chọn 16?** Đây là phiên bản mới nhất, hiệu suất tốt nhất.

#### 3. Region (Vùng địa lý):
```
Click vào dropdown "Region"
Bạn sẽ thấy danh sách dài:

ASIA PACIFIC:
  ├─ 🌏 AWS ap-southeast-1 (Singapore)    ← CHỌN CÁI NÀY
  ├─ 🌏 AWS ap-northeast-1 (Tokyo)
  ├─ 🌏 AWS ap-south-1 (Mumbai)
  └─ ... (các region khác)

US EAST:
  ├─ 🌎 AWS us-east-1 (Virginia)
  └─ ...

EUROPE:
  ├─ 🌍 AWS eu-central-1 (Frankfurt)
  └─ ...

Tìm và click chọn:
  "AWS ap-southeast-1 (Singapore)"
```

**Tại sao chọn Singapore?**
- ✅ Gần Việt Nam nhất trong các region free
- ✅ Tốc độ kết nối nhanh (~30-50ms)
- ✅ Ổn định

**Nếu không thấy Singapore:**
- Chọn Tokyo (Nhật Bản) - gần thứ 2
- Hoặc Mumbai (Ấn Độ)

---

## 🔹 BƯỚC 1.5: Tạo Project

### Hành động:
```
1. Kiểm tra lại:
   ✓ Project name: aurora-ledger
   ✓ PostgreSQL: 16 (Latest)
   ✓ Region: Singapore

2. Click nút "Create project" (màu xanh/tím)

3. Đợi 10-20 giây (có loading spinner)
```

### Bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Creating your project... ⏳                                      ║
║                                                                   ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

Đợi đến khi thấy: **"Project created successfully!"** ✅

---

## 🔹 BƯỚC 1.6: Lấy Connection String (QUAN TRỌNG!)

### Sau khi tạo xong, bạn sẽ thấy màn hình:

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  🎉 Project created successfully!                                 ║
║                                                                   ║
║  Connection Details                                               ║
║  ══════════════════                                               ║
║                                                                   ║
║  Database:  neondb                                                ║
║  User:      neondb_owner                                          ║
║  Host:      ep-xxx-xxx-xxx.aws.neon.tech                          ║
║                                                                   ║
║  Connection string                                                ║
║  ┌────────────────────────────────────────────────────┐          ║
║  │ [▼ Node.js]                                        │          ║
║  └────────────────────────────────────────────────────┘          ║
║                                                                   ║
║  ┌────────────────────────────────────────────────────┐          ║
║  │ postgresql://user:pass@ep-xxx.aws.neon.tech/...   │  [Copy]  ║
║  └────────────────────────────────────────────────────┘          ║
║                                                                   ║
║  [Go to dashboard]                                               ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động QUAN TRỌNG:

#### Bước 1: Chọn đúng loại Connection String
```
1. Tìm dropdown viết "Connection string"
2. Bên dưới có dropdown nhỏ, mặc định là "Prisma" hoặc "SQL"
3. Click vào dropdown đó
4. Chọn "Node.js" hoặc "Postgres.js"
```

**Các lựa chọn bạn sẽ thấy:**
```
▼ Connection string format:
  - Node.js         ← CHỌN CÁI NÀY
  - Prisma
  - SQL
  - JDBC
  - Django
  - Rails
  ...
```

#### Bước 2: Copy Connection String
```
1. Sau khi chọn "Node.js", chuỗi sẽ thay đổi thành dạng:
   postgresql://username:password@ep-xxx-xxx.aws.neon.tech/neondb?sslmode=require

2. Click nút "Copy" bên phải (icon 📋)

3. Hoặc:
   - Click 3 lần vào chuỗi để bôi đen tất cả
   - Ctrl+C để copy
```

#### Bước 3: LƯU LẠI NGAY
```
1. Mở Notepad:
   - Nhấn Windows + R
   - Gõ: notepad
   - Enter

2. Paste connection string vào Notepad (Ctrl+V)

3. Lưu file:
   - File → Save As
   - Tên file: neon-connection-string.txt
   - Lưu vào Desktop hoặc nơi dễ tìm

4. QUAN TRỌNG: Chuỗi này chứa password, giữ bí mật!
```

### Ví dụ Connection String:
```
postgresql://neondb_owner:AbCdEfGh123456@ep-cool-fire-12345678.aws.neon.tech/neondb?sslmode=require
             └─────┬────┘ └────┬────┘ └──────────────┬──────────────┘           └──┬──┘
               Username    Password              Host                            Database
```

**Giải thích:**
- `neondb_owner`: Username (tự động tạo)
- `AbCdEfGh123456`: Password (tự động tạo, random)
- `ep-cool-fire-12345678.aws.neon.tech`: Host/Server
- `neondb`: Tên database mặc định
- `?sslmode=require`: Bắt buộc dùng SSL (bảo mật)

---

## 🔹 BƯỚC 1.7: Chạy Migration (Tạo Bảng)

### Mục đích:
Tạo các bảng (users, categories, transactions, budgets) trong database.

### Hành động:

#### 1. Mở PowerShell hoặc Command Prompt:
```
Cách 1: Từ folder explorer
- Mở folder: D:\Code\Aurora-Ledger\backend
- Shift + Click phải trong folder
- Chọn "Open PowerShell window here"

Cách 2: Từ Start menu
- Nhấn Windows + X
- Chọn "Windows PowerShell" hoặc "Terminal"
- Chạy: cd D:\Code\Aurora-Ledger\backend
```

#### 2. Tạo file .env:
```powershell
# Copy file env.example thành .env
Copy-Item env.example .env

# Kết quả: File .env sẽ được tạo ra
```

#### 3. Chỉnh sửa file .env:
```powershell
# Mở file .env bằng Notepad
notepad .env

# Hoặc dùng VSCode nếu có:
code .env
```

#### 4. Điền thông tin vào file .env:

**File .env ban đầu:**
```env
PORT=5000
NODE_ENV=development

# Database Configuration (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

**Chỉnh sửa thành:**
```env
PORT=5000
NODE_ENV=development

# Database Configuration (Neon PostgreSQL)
# DÁN CONNECTION STRING TỪ NEON VÀO ĐÂY ↓
DATABASE_URL=postgresql://neondb_owner:AbCdEfGh123456@ep-cool-fire-12345678.aws.neon.tech/neondb?sslmode=require

# JWT Secret - TẠO CHUỖI NGẪU NHIÊN DÀI
JWT_SECRET=my-super-secret-key-abcd1234-xyz-change-this-to-something-random-and-long
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

**Lưu ý về JWT_SECRET:**
```
Tạo JWT_SECRET ngẫu nhiên:
- Độ dài tối thiểu: 32 ký tự
- Dùng chữ, số, ký tự đặc biệt
- Ví dụ tốt:
  ✅ my-jwt-secret-abc123-xyz789-def456-ghi012-jkl345-mno678
  ✅ super-secure-random-key-2024-aurora-ledger-production
  
- VÍ dụ không tốt:
  ❌ 12345
  ❌ password
  ❌ secret
```

**Lưu file:**
```
1. Trong Notepad:
   - File → Save (hoặc Ctrl+S)
   - Đóng Notepad

2. Hoặc:
   - Ctrl+S
   - Alt+F4
```

#### 5. Cài đặt dependencies:
```powershell
# Cài đặt các packages cần thiết
npm install

# Đợi 30-60 giây, bạn sẽ thấy:
# added 123 packages, and audited 124 packages in 45s
```

**Nếu gặp lỗi:**
```
Lỗi: 'npm' is not recognized...
Giải pháp: Cài Node.js từ https://nodejs.org (chọn LTS version)

Lỗi: EACCES permission denied...
Giải pháp: Chạy PowerShell as Administrator
```

#### 6. Chạy migration:
```powershell
npm run migrate
```

**Bạn sẽ thấy:**
```
> aurora-ledger-backend@1.0.0 migrate
> node scripts/migrate.js

🔄 Running migrations...
✓ Connected to database
✓ Creating users table...
✓ Creating categories table...
✓ Creating transactions table...
✓ Creating budgets table...
✓ Creating migrations table...
✅ All migrations completed successfully!
✅ Database is ready!
```

**Nếu thấy lỗi:**
```
Error: connect ECONNREFUSED...
→ Sai DATABASE_URL, kiểm tra lại connection string

Error: password authentication failed...
→ Sai password trong connection string

Error: database "neondb" does not exist...
→ Kiểm tra lại tên database
```

#### 7. (Tùy chọn) Thêm dữ liệu mẫu:
```powershell
npm run seed
```

**Kết quả:**
```
✓ Seeding demo user...
✓ Seeding categories...
✓ Seeding sample transactions...
✅ Seed completed!

Demo account:
  Email: demo@auroraledger.com
  Password: demo123
```

---

## 🔹 BƯỚC 1.8: Xác Nhận Database Đã Tạo

### Hành động:

#### 1. Quay lại Neon Dashboard:
```
- Mở trình duyệt
- Vào: https://console.neon.tech
- Đăng nhập nếu cần
```

#### 2. Chọn Project:
```
- Bạn sẽ thấy danh sách projects
- Click vào "aurora-ledger"
```

#### 3. Xem Tables:
```
- Tìm sidebar bên trái
- Click vào "Tables" (icon có dạng bảng 📊)
```

#### 4. Bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  Tables (5)                                               ║
║  ═════════                                                ║
║                                                           ║
║  ✓ users                    (4 columns)                   ║
║  ✓ categories               (5 columns)                   ║
║  ✓ transactions             (7 columns)                   ║
║  ✓ budgets                  (6 columns)                   ║
║  ✓ migrations               (3 columns)                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**Nếu thấy 5 tables → ✅ THÀNH CÔNG!**

---

## ✅ CHECKLIST NEON

- [ ] Đã đăng ký/đăng nhập Neon
- [ ] Đã tạo project "aurora-ledger"
- [ ] Đã chọn region Singapore (hoặc gần Việt Nam)
- [ ] Đã copy Connection String
- [ ] Đã lưu Connection String vào Notepad
- [ ] Đã tạo file .env trong backend
- [ ] Đã dán Connection String vào DATABASE_URL
- [ ] Đã tạo JWT_SECRET ngẫu nhiên
- [ ] Đã chạy `npm install` thành công
- [ ] Đã chạy `npm run migrate` thành công
- [ ] Đã verify 5 tables trên Neon Dashboard

---

# PHẦN 2: RENDER - DEPLOY BACKEND NODE.JS

## 🎯 Mục Tiêu
Deploy Backend API (Node.js + Express) lên Render để app có thể truy cập từ internet.

## ⏱️ Thời Gian
7-10 phút

## ⚠️ YÊU CẦU
- ✅ Code đã push lên GitHub (nếu chưa, xem file PUSH-GITHUB.md)
- ✅ Database Neon đã tạo xong (Phần 1)

---

## 🔹 BƯỚC 2.1: Truy Cập Render

### Hành động:
```
1. Mở trình duyệt
2. Vào: https://render.com
3. Đợi trang web load
```

### Bạn sẽ thấy:
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║                    🟣 RENDER                             ║
║                                                          ║
║     Build, deploy, and scale your apps                  ║
║     with unparalleled ease                              ║
║                                                          ║
║     [Get Started]          [Sign In]                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 🔹 BƯỚC 2.2: Đăng Ký / Đăng Nhập

### Nếu chưa có tài khoản:

#### Hành động:
```
1. Click "Get Started" hoặc "Sign Up"

2. Chọn "GitHub" (khuyến nghị)
   Hoặc "GitLab" / "Google"

3. Nếu chọn GitHub:
   - Nếu chưa đăng nhập GitHub → Đăng nhập
   - GitHub hỏi: "Authorize Render?"
   - Click "Authorize Render" (nút xanh lá)

4. Đợi 2-3 giây redirect về Render
```

### Nếu đã có tài khoản:
```
1. Click "Sign In"
2. Chọn phương thức đăng nhập (GitHub/GitLab/Email)
3. Đăng nhập
```

---

## 🔹 BƯỚC 2.3: Màn Hình Dashboard

### Sau khi đăng nhập, bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  [🟣 Render]     Dashboard                          [New +] ▼     ║
║  ═══════════════════════════════════════════════════════════════  ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │                                                             │ ║
║  │  No services yet                                            │ ║
║  │                                                             │ ║
║  │  Get started by creating a web service, database, or       │ ║
║  │  static site.                                               │ ║
║  │                                                             │ ║
║  │                    [New Web Service]                        │ ║
║  │                                                             │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## 🔹 BƯỚC 2.4: Tạo Web Service Mới

### Hành động:
```
1. Click nút "New +" ở góc trên bên phải

2. Bạn sẽ thấy dropdown:
   ┌───────────────────────────┐
   │ Web Service               │ ← CHỌN CÁI NÀY
   │ Private Service           │
   │ Background Worker         │
   │ Cron Job                  │
   │ Static Site               │
   │ PostgreSQL                │
   │ Redis                     │
   └───────────────────────────┘

3. Click "Web Service"
```

---

## 🔹 BƯỚC 2.5: Kết Nối GitHub Repository

### Màn hình bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Create a new Web Service                                         ║
║  ════════════════════════                                         ║
║                                                                   ║
║  Connect a repository                                             ║
║                                                                   ║
║  You haven't connected a Git provider yet.                        ║
║                                                                   ║
║  [Connect GitHub]                                                 ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Lần đầu tiên - Kết nối GitHub:

#### Bước 1: Connect GitHub Account
```
1. Click "Connect GitHub"

2. GitHub sẽ mở popup/tab mới:
   "Authorize Render to access your GitHub?"
   
3. GitHub hiển thị:
   ┌────────────────────────────────────────────────┐
   │ Repository access                              │
   │                                                │
   │ ○ All repositories                             │
   │ ● Only select repositories               ▼    │
   │                                                │
   │   Select repositories                          │
   │   ┌──────────────────────────────────────┐    │
   │   │ 🔍 Find a repository...               │    │
   │   └──────────────────────────────────────┘    │
   │                                                │
   │   [Install]                                    │
   └────────────────────────────────────────────────┘

4. Chọn "Only select repositories"
   Tại sao? An toàn hơn, chỉ cho Render truy cập repo này thôi

5. Click dropdown "Select repositories"

6. Gõ: aurora-ledger

7. Click chọn repository "aurora-ledger" khi nó hiện ra

8. Click nút "Install" (màu xanh lá)

9. Đợi 2-3 giây
```

### Sau khi kết nối GitHub:

#### Bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Connect a repository                                             ║
║  ════════════════════                                             ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 🔍 Search repositories...                                   │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 📦 YOUR_USERNAME/aurora-ledger                              │ ║
║  │    main                                            [Connect] │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động:
```
1. Tìm repository "aurora-ledger" trong danh sách
   (Nếu nhiều repo, dùng ô search để tìm)

2. Click nút "Connect" bên phải repository
```

---

## 🔹 BƯỚC 2.6: Cấu Hình Service (QUAN TRỌNG!)

### Sau khi click Connect, bạn sẽ thấy form cấu hình:

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Configure Web Service                                            ║
║  ══════════════════════                                           ║
║                                                                   ║
║  Name *                                                           ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ aurora-ledger                                               │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Region                                                           ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ [▼ Oregon (US West)]                                        │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Branch                                                           ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ [▼ main]                                                    │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Root Directory                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │                                                             │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Runtime                                                          ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ [▼ Node]                                                    │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Build Command                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ npm install                                                 │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Start Command                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ npm start                                                   │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  [Advanced ▼]                                                     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### ĐIỀN THÔNG TIN CHI TIẾT:

#### 1. Name (Tên service):
```
Mặc định: aurora-ledger

Thay đổi thành: aurora-ledger-backend

Cách làm:
1. Click vào ô "Name"
2. Xóa text hiện tại (Ctrl+A → Delete)
3. Nhập: aurora-ledger-backend
4. Nhấn Tab hoặc click ra ngoài
```

**Tại sao thêm "-backend"?**
- Dễ phân biệt với frontend
- Dễ quản lý khi có nhiều service

#### 2. Region (Vùng địa lý):
```
Click vào dropdown "Region"

Bạn sẽ thấy danh sách:
┌───────────────────────────────────────┐
│ 🌏 Singapore (Asia)                   │ ← TÌM VÀ CHỌN CÁI NÀY
│ 🌏 Tokyo (Asia)                       │
│ 🌎 Oregon (US West)                   │
│ 🌎 Ohio (US East)                     │
│ 🌎 Virginia (US East)                 │
│ 🌍 Frankfurt (Europe)                 │
│ 🌍 London (Europe)                    │
└───────────────────────────────────────┘

Chọn: Singapore (Asia)
```

**Tại sao chọn Singapore?**
- Gần Việt Nam → Tốc độ nhanh
- Cùng region với Neon database → Latency thấp

**Lưu ý:** Singapore có thể ở phía dưới list, scroll xuống để tìm

#### 3. Branch:
```
Mặc định: main

Giữ nguyên: main

(Đây là branch chính của Git repository)
```

#### 4. Root Directory (CỰC KỲ QUAN TRỌNG!):
```
Mặc định: [trống]

PHẢI điền: backend

Cách làm:
1. Click vào ô "Root Directory"
2. Nhập: backend
3. Nhấn Tab hoặc click ra ngoài
```

**TẠI SAO QUAN TRỌNG?**
```
Cấu trúc dự án của bạn:
Aurora-Ledger/
├── backend/          ← Code backend ở đây
│   ├── server.js
│   ├── package.json
│   └── ...
└── frontend/
    └── ...

Nếu KHÔNG điền "backend":
❌ Render sẽ tìm package.json ở root
❌ Không tìm thấy → Build failed!

Nếu điền "backend":
✅ Render vào folder backend/
✅ Tìm thấy package.json
✅ Build thành công!
```

#### 5. Runtime:
```
Click vào dropdown "Runtime"

Chọn: Node

(Có thể đã auto-detect đúng rồi)
```

#### 6. Build Command:
```
Mặc định: npm install

Giữ nguyên: npm install

(Lệnh này cài đặt tất cả dependencies)
```

#### 7. Start Command:
```
Mặc định: npm start

Giữ nguyên: npm start

(Lệnh này khởi động server)
```

---

## 🔹 BƯỚC 2.7: Cấu Hình Advanced (Environment Variables)

### Hành động:
```
1. Tìm phần "Advanced" (phía dưới form)

2. Click vào "Advanced" để mở rộng
   (Click vào text hoặc mũi tên ▼)
```

### Bạn sẽ thấy thêm:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Advanced ▲                                                       ║
║  ═════════                                                        ║
║                                                                   ║
║  Environment Variables                                            ║
║  ─────────────────────                                            ║
║                                                                   ║
║  [Add Environment Variable]                                       ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Thêm Environment Variables:

**BẠN CẦN THÊM 5 BIẾN SAU:**

#### Biến 1: NODE_ENV
```
1. Click "Add Environment Variable"

2. Điền:
   Key:   NODE_ENV
   Value: production

3. Click "Add" hoặc nhấn Enter
```

#### Biến 2: DATABASE_URL (CỰC KỲ QUAN TRỌNG!)
```
1. Click "Add Environment Variable"

2. Điền:
   Key:   DATABASE_URL
   Value: [DÁN CONNECTION STRING TỪ NEON]

3. Cách lấy Connection String:
   - Mở Notepad có lưu connection string (Phần 1)
   - Hoặc vào Neon Dashboard → Project → Connection Details
   - Copy chuỗi dạng:
     postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require

4. Paste vào ô "Value"

5. Click "Add"
```

**Ví dụ:**
```
Key:   DATABASE_URL
Value: postgresql://neondb_owner:AbC123@ep-cool-fire-123.aws.neon.tech/neondb?sslmode=require
```

#### Biến 3: JWT_SECRET
```
1. Click "Add Environment Variable"

2. Điền:
   Key:   JWT_SECRET
   Value: [CHUỖI NGẪU NHIÊN DÀI]

3. Tạo JWT_SECRET:
   
   Cách 1: Tự gõ ngẫu nhiên (40-50 ký tự)
   Ví dụ: my-super-secret-jwt-key-aurora-2024-abc123xyz789-random-string
   
   Cách 2: Dùng Generator online
   - Google: "random string generator"
   - Tạo chuỗi 50 ký tự
   
   Cách 3: Dùng PowerShell
   - Mở PowerShell
   - Chạy: openssl rand -base64 32
   - Copy kết quả

4. Paste vào ô "Value"

5. Click "Add"
```

**Lưu ý:** 
- Phải dài tối thiểu 32 ký tự
- Không dùng: "secret", "password", "12345"
- Nên dùng: Chữ hoa, thường, số, ký tự đặc biệt

#### Biến 4: JWT_EXPIRES_IN
```
1. Click "Add Environment Variable"

2. Điền:
   Key:   JWT_EXPIRES_IN
   Value: 7d

3. Click "Add"
```

**Giải thích:** Token hết hạn sau 7 ngày (7d = 7 days)

#### Biến 5: PORT
```
1. Click "Add Environment Variable"

2. Điền:
   Key:   PORT
   Value: 5000

3. Click "Add"
```

#### LƯU Ý: CHƯA THÊM FRONTEND_URL
```
⚠️ BỎ QUA BIẾN "FRONTEND_URL" NGAY BÂY GIỜ

Tại sao?
- Chưa có URL của frontend
- Sẽ thêm sau khi deploy frontend (Phần 3)
```

### Kiểm tra lại:
```
Sau khi thêm xong, bạn sẽ thấy danh sách:

Environment Variables (5)
┌──────────────────┬─────────────────────────────────────────┐
│ Key              │ Value                                   │
├──────────────────┼─────────────────────────────────────────┤
│ NODE_ENV         │ production                              │
│ DATABASE_URL     │ postgresql://user:pass@ep-xxx...        │
│ JWT_SECRET       │ my-super-secret-jwt-key-aurora...       │
│ JWT_EXPIRES_IN   │ 7d                                      │
│ PORT             │ 5000                                    │
└──────────────────┴─────────────────────────────────────────┘
```

---

## 🔹 BƯỚC 2.8: Chọn Plan (Free Tier)

### Kéo xuống dưới cùng form, bạn sẽ thấy:

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Instance Type                                                    ║
║  ════════════                                                     ║
║                                                                   ║
║  ○ Starter ($7/month)                                             ║
║     512 MB RAM, Always-on                                         ║
║                                                                   ║
║  ● Free ($0/month)                                                ║
║     512 MB RAM, Sleeps after 15 min inactivity                    ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động:
```
1. Chọn ● Free ($0/month)

2. Đọc thông tin:
   ✓ 512 MB RAM (đủ dùng)
   ⚠️ Sleeps after 15 minutes (ngủ sau 15 phút không hoạt động)
   
3. Hiểu rõ Free tier:
   - Lần đầu truy cập sau khi ngủ: chờ ~30s
   - 750 giờ/tháng (= 31 ngày × 24 giờ)
   - Bandwidth: 100 GB/tháng
```

**Free tier có sao không?**
```
Ưu điểm:
✅ Hoàn toàn miễn phí
✅ Không cần thẻ tín dụng
✅ Đủ cho học tập, demo, side projects

Nhược điểm:
⚠️ Ngủ sau 15 phút không dùng
⚠️ Wake up time: ~30 giây
⚠️ Giới hạn compute time

Khi nào nên upgrade?
→ Khi có nhiều users (>100/ngày)
→ Cần always-on (không ngủ)
→ App production thực sự
```

---

## 🔹 BƯỚC 2.9: Tạo Web Service

### Hành động:
```
1. Kiểm tra lại TẤT CẢ:
   ✓ Name: aurora-ledger-backend
   ✓ Region: Singapore
   ✓ Branch: main
   ✓ Root Directory: backend ← CỰC KỲ QUAN TRỌNG!
   ✓ Runtime: Node
   ✓ Build Command: npm install
   ✓ Start Command: npm start
   ✓ Environment Variables: 5 biến đã thêm
   ✓ Instance Type: Free

2. Kéo xuống dưới cùng

3. Click nút "Create Web Service" (màu xanh dương/tím)

4. Đợi 1-2 giây, bạn sẽ được chuyển sang màn hình Deploy
```

---

## 🔹 BƯỚC 2.10: Theo Dõi Deployment

### Bạn sẽ thấy màn hình Deploy Logs:

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  aurora-ledger-backend                                            ║
║  ══════════════════════                                           ║
║                                                                   ║
║  Status: ⏳ Building                                              ║
║                                                                   ║
║  Logs:                                                            ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │                                                             │ ║
║  │ ==> Cloning from https://github.com/USER/aurora-ledger...  │ ║
║  │ ==> Checking out commit 78cede9...                         │ ║
║  │ ==> Entering directory: backend                            │ ║
║  │ ==> Running build command: npm install                     │ ║
║  │     npm WARN ...                                           │ ║
║  │     added 85 packages in 15s                               │ ║
║  │ ==> Build successful!                                      │ ║
║  │ ==> Starting service...                                    │ ║
║  │ ==> Running start command: npm start                       │ ║
║  │     Server is running on port 5000                         │ ║
║  │     Connected to database                                  │ ║
║  │ ==> Your service is live 🎉                                │ ║
║  │                                                             │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Các Giai Đoạn Deploy:

#### 1. Cloning (10-20 giây):
```
==> Cloning from https://github.com/...
==> Checking out commit...
```
**Nghĩa là:** Render đang tải code từ GitHub về

#### 2. Building (30-60 giây):
```
==> Entering directory: backend
==> Running build command: npm install
    npm WARN ...
    added 85 packages in 15s
==> Build successful!
```
**Nghĩa là:** Render đang cài đặt dependencies

#### 3. Starting (5-10 giây):
```
==> Starting service...
==> Running start command: npm start
    Server is running on port 5000
    Connected to database
```
**Nghĩa là:** Render đang khởi động server

#### 4. Live (THÀNH CÔNG!):
```
==> Your service is live 🎉

Status: ✅ Live
```

**Tổng thời gian:** 1-3 phút

---

## 🔹 BƯỚC 2.11: Lấy URL Backend (QUAN TRỌNG!)

### Sau khi deploy thành công:

#### Bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  aurora-ledger-backend                         Status: ✅ Live   ║
║  ══════════════════════                                           ║
║                                                                   ║
║  🌐 https://aurora-ledger-backend.onrender.com                    ║
║     ↑ CLICK ĐỂ COPY                                               ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động:
```
1. Tìm URL ở phía trên (dạng: https://xxx.onrender.com)

2. Click vào URL để copy
   Hoặc:
   - Bôi đen URL (triple-click)
   - Ctrl+C để copy

3. LƯU LẠI NGAY:
   - Mở Notepad
   - Paste URL
   - Lưu file: render-backend-url.txt
```

**URL của bạn sẽ có dạng:**
```
https://aurora-ledger-backend.onrender.com
https://aurora-ledger-backend-xxxx.onrender.com
https://YOUR-SERVICE-NAME.onrender.com
```

---

## 🔹 BƯỚC 2.12: Test Backend API

### Hành động:
```
1. Mở trình duyệt (tab mới)

2. Vào URL: [URL backend của bạn]/health

Ví dụ:
https://aurora-ledger-backend.onrender.com/health
```

### Nếu THÀNH CÔNG, bạn sẽ thấy:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected"
}
```

### Nếu LỖI:
```
Lỗi 1: "Application failed to respond"
→ Service đang khởi động, đợi thêm 30s

Lỗi 2: "Service Unavailable"
→ Kiểm tra logs trong Render Dashboard

Lỗi 3: "Database connection failed"
→ Sai DATABASE_URL, kiểm tra lại Environment Variables
```

---

## ✅ CHECKLIST RENDER

- [ ] Đã đăng nhập Render
- [ ] Đã connect GitHub repository
- [ ] Name: `aurora-ledger-backend`
- [ ] Region: `Singapore`
- [ ] Branch: `main`
- [ ] Root Directory: `backend` ← CỰC KỲ QUAN TRỌNG!
- [ ] Runtime: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Đã thêm 5 Environment Variables
- [ ] Instance Type: `Free`
- [ ] Deploy thành công, status: Live
- [ ] Đã lấy và lưu URL backend
- [ ] Test `/health` endpoint → OK

---

# PHẦN 3: VERCEL - DEPLOY FRONTEND REACT

## 🎯 Mục Tiêu
Deploy Frontend (React + Vite) lên Vercel để user có thể truy cập website.

## ⏱️ Thời Gian
5-7 phút

## ⚠️ YÊU CẦU
- ✅ Code đã push lên GitHub
- ✅ Backend đã deploy thành công (Phần 2)

---

## 🔹 BƯỚC 3.1: Truy Cập Vercel

### Hành động:
```
1. Mở trình duyệt
2. Vào: https://vercel.com
3. Đợi trang web load
```

### Bạn sẽ thấy:
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║                    ▲ VERCEL                              ║
║                                                          ║
║     Develop. Preview. Ship.                              ║
║     For the best frontend teams                          ║
║                                                          ║
║     [Start Deploying]          [Sign In]                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 🔹 BƯỚC 3.2: Đăng Ký / Đăng Nhập

### Nếu chưa có tài khoản:

#### Hành động:
```
1. Click "Start Deploying" hoặc "Sign Up"

2. Chọn "Continue with GitHub" (khuyến nghị)
   Hoặc "Continue with GitLab" / "Continue with Email"

3. Nếu chọn GitHub:
   - Nếu chưa đăng nhập GitHub → Đăng nhập
   - GitHub hỏi: "Authorize Vercel?"
   - Click "Authorize Vercel" (nút xanh lá)

4. Đợi 2-3 giây redirect về Vercel
```

### Nếu đã có tài khoản:
```
1. Click "Sign In"
2. Chọn phương thức đăng nhập (GitHub/GitLab/Email)
3. Đăng nhập
```

---

## 🔹 BƯỚC 3.3: Dashboard & Import Project

### Sau khi đăng nhập, bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  [▲ Vercel]     Dashboard                   [Add New...] ▼       ║
║  ════════════════════════════════════════════════════════════════ ║
║                                                                   ║
║  Let's build something new.                                       ║
║                                                                   ║
║  Import an existing project from a Git repository or get          ║
║  started with one of our templates.                               ║
║                                                                   ║
║  [Add New...]  [Import Project]                                   ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động:
```
1. Click nút "Add New..." (góc trên phải)

2. Bạn sẽ thấy dropdown:
   ┌────────────────────┐
   │ Project            │ ← CHỌN CÁI NÀY
   │ Team               │
   │ Domain             │
   └────────────────────┘

3. Click "Project"
```

---

## 🔹 BƯỚC 3.4: Import Git Repository

### Màn hình bạn sẽ thấy:
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Import Git Repository                                            ║
║  ═════════════════════                                            ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 🔍 Search...                                                │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 📦 YOUR_USERNAME/aurora-ledger                              │ ║
║  │    Updated 2 hours ago                            [Import]  │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Can't find your repository?                                      ║
║  [Adjust GitHub App Permissions →]                                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động:
```
1. Tìm repository "aurora-ledger" trong danh sách
   (Nếu nhiều repos, dùng ô search để tìm)

2. Click nút "Import" bên phải repository

3. Đợi 1-2 giây
```

### Nếu không thấy repository:
```
1. Click "Adjust GitHub App Permissions"

2. Trên GitHub, thêm quyền truy cập cho "aurora-ledger"

3. Quay lại Vercel, refresh trang (F5)

4. Repository sẽ xuất hiện
```

---

## 🔹 BƯỚC 3.5: Configure Project (CỰC KỲ QUAN TRỌNG!)

### Sau khi click Import, bạn sẽ thấy form cấu hình:

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Configure Project                                                ║
║  ════════════════                                                 ║
║                                                                   ║
║  Project Name                                                     ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ aurora-ledger                                               │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Framework Preset                                                 ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ [▼ Vite]                                                    │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Root Directory                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ ./                                                    [Edit] │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  Build and Output Settings                                        ║
║  ─────────────────────────────                                    ║
║  Build Command:    npm run build                                  ║
║  Output Directory: dist                                           ║
║  Install Command:  npm install                                    ║
║                                                                   ║
║  Environment Variables                                            ║
║  ─────────────────────────                                        ║
║  [Add Environment Variable]                                       ║
║                                                                   ║
║                                              [Deploy]             ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### ĐIỀN THÔNG TIN CHI TIẾT:

#### 1. Project Name:
```
Mặc định: aurora-ledger

Giữ nguyên: aurora-ledger

(Tên này sẽ nằm trong URL: aurora-ledger.vercel.app)
```

#### 2. Framework Preset:
```
Mặc định: Vite (tự động detect)

Giữ nguyên: Vite

(Vercel thông minh, tự nhận diện được framework)
```

#### 3. Root Directory (CỰC KỲ QUAN TRỌNG!):
```
Mặc định: ./ (root của repository)

PHẢI đổi thành: frontend

Cách làm:
1. Click nút "Edit" bên phải ô "Root Directory"

2. Popup sẽ xuất hiện:
   ╔═══════════════════════════════════════════════════╗
   ║                                                   ║
   ║  Choose Root Directory                            ║
   ║  ════════════════════                             ║
   ║                                                   ║
   ║  📁 aurora-ledger (root)               [Select]  ║
   ║  📁 backend                             [Select]  ║
   ║  📁 frontend                            [Select]  ║ ← CHỌN
   ║  📄 README.md                                     ║
   ║  📄 .gitignore                                    ║
   ║  ...                                              ║
   ║                                                   ║
   ║                           [Cancel]                ║
   ║                                                   ║
   ╚═══════════════════════════════════════════════════╝

3. Click nút [Select] bên phải folder "frontend"

4. Popup đóng, ô "Root Directory" sẽ hiển thị: ./frontend
```

**TẠI SAO CỰC KỲ QUAN TRỌNG?**
```
Cấu trúc dự án:
Aurora-Ledger/
├── backend/
│   └── ...
└── frontend/         ← Code frontend ở đây
    ├── index.html
    ├── package.json
    └── ...

Nếu KHÔNG chọn "frontend":
❌ Vercel build ở root
❌ Không tìm thấy index.html, package.json
❌ Build failed!

Nếu chọn "frontend":
✅ Vercel vào folder frontend/
✅ Tìm thấy tất cả files
✅ Build thành công!
```

#### 4. Build and Output Settings:
```
Mặc định (sau khi chọn Vite):
  Build Command:    npm run build
  Output Directory: dist
  Install Command:  npm install

Giữ nguyên TẤT CẢ

(Đây là cấu hình chuẩn cho Vite)
```

---

## 🔹 BƯỚC 3.6: Thêm Environment Variables

### Kéo xuống phần "Environment Variables":

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Environment Variables                                            ║
║  ─────────────────────                                            ║
║                                                                   ║
║  [Add Environment Variable]                                       ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Hành động:

#### Click "Add Environment Variable":
```
1. Click nút "Add Environment Variable"

2. Form sẽ mở ra:
   ┌─────────────────────────────────────────────────┐
   │ Key (Name)                                      │
   │ ┌─────────────────────────────────────────────┐ │
   │ │                                             │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ Value                                           │
   │ ┌─────────────────────────────────────────────┐ │
   │ │                                             │ │
   │ └─────────────────────────────────────────────┘ │
   │                                                 │
   │ Environments                                    │
   │ ☑ Production                                    │
   │ ☑ Preview                                       │
   │ ☑ Development                                   │
   │                                                 │
   │ [Cancel]                           [Add]        │
   └─────────────────────────────────────────────────┘
```

#### Điền thông tin:
```
Key (Name):
  VITE_API_URL

Value:
  [URL BACKEND TỪ RENDER]/api

Ví dụ:
  https://aurora-ledger-backend.onrender.com/api
  ↑                                        ↑
  URL từ Phần 2                          Thêm /api

⚠️ LƯU Ý:
  - PHẢI thêm "/api" vào cuối
  - PHẢI dùng URL backend của BẠN (từ Phần 2.11)
  - Không có dấu / ở cuối /api

Environments:
  ☑ Production      ← Tick
  ☑ Preview         ← Tick
  ☑ Development     ← Tick

(Tick tất cả 3 môi trường)
```

#### Click "Add":
```
1. Kiểm tra lại:
   ✓ Key: VITE_API_URL
   ✓ Value: https://your-backend.onrender.com/api
   ✓ Đã tick cả 3 environments

2. Click nút "Add"

3. Biến sẽ xuất hiện trong danh sách
```

### Kiểm tra lại:
```
Environment Variables (1)
┌──────────────────┬────────────────────────────────────────────┐
│ Key              │ Value (Hidden)                             │
├──────────────────┼────────────────────────────────────────────┤
│ VITE_API_URL     │ •••••••••••••••••••••             [Edit]  │
└──────────────────┴────────────────────────────────────────────┘

(Value sẽ bị ẩn đi để bảo mật)
```

---

## 🔹 BƯỚC 3.7: Deploy!

### Hành động:
```
1. Kiểm tra lại MỌI THỨ:
   ✓ Project Name: aurora-ledger
   ✓ Framework: Vite
   ✓ Root Directory: ./frontend ← CỰC KỲ QUAN TRỌNG!
   ✓ Build Command: npm run build
   ✓ Output Directory: dist
   ✓ Environment Variables: VITE_API_URL đã thêm

2. Kéo xuống dưới cùng

3. Click nút "Deploy" (màu đen, lớn)

4. Đợi 1-2 giây
```

---

## 🔹 BƯỚC 3.8: Theo Dõi Deployment

### Vercel sẽ chuyển sang màn hình Building:

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  aurora-ledger                                                    ║
║  ══════════════                                                   ║
║                                                                   ║
║  Building...                                                      ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 65%                                        ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ Cloning repository...                                       │ ║
║  │ Running "npm install"...                                    │ ║
║  │ Building...                                                 │ ║
║  │   vite v5.0.8 building for production...                   │ ║
║  │   transforming...                                           │ ║
║  │   ✓ 347 modules transformed.                                │ ║
║  │   rendering chunks...                                       │ ║
║  │   dist/index.html                  0.45 kB │ gzip: 0.30 kB │ ║
║  │   dist/assets/index-abc123.css     5.23 kB │ gzip: 1.67 kB │ ║
║  │   dist/assets/index-xyz789.js    143.21 kB │ gzip: 46.10 kB│ ║
║  │   ✓ built in 12.34s                                         │ ║
║  │ Uploading...                                                │ ║
║  │ Deployment complete!                                        │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Các Giai Đoạn:

#### 1. Cloning (5-10 giây):
```
Cloning repository...
```
**Nghĩa là:** Vercel đang tải code từ GitHub

#### 2. Installing (10-20 giây):
```
Running "npm install"...
```
**Nghĩa là:** Cài đặt dependencies

#### 3. Building (15-30 giây):
```
vite v5.0.8 building for production...
transforming...
✓ 347 modules transformed.
```
**Nghĩa là:** Build React app ra HTML/CSS/JS

#### 4. Uploading (5-10 giây):
```
Uploading...
Assigning domains...
```
**Nghĩa là:** Upload files lên Vercel CDN

#### 5. Success! (HOÀN THÀNH):
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║      🎉                                                           ║
║                                                                   ║
║   Congratulations!                                                ║
║                                                                   ║
║   Your project has been successfully deployed.                    ║
║                                                                   ║
║   🌐 https://aurora-ledger.vercel.app                             ║
║                                                                   ║
║   [Visit]                    [Go to Dashboard]                   ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Tổng thời gian:** 30-60 giây

---

## 🔹 BƯỚC 3.9: Lấy URL Frontend (QUAN TRỌNG!)

### Hành động:
```
1. Sau khi deploy thành công, tìm URL

2. URL sẽ có dạng:
   https://aurora-ledger.vercel.app
   https://aurora-ledger-xxxx.vercel.app
   https://YOUR-PROJECT-NAME.vercel.app

3. LƯU LẠI NGAY:
   - Mở Notepad
   - Paste URL
   - Lưu file: vercel-frontend-url.txt

4. Click "Visit" để xem website
```

---

## 🔹 BƯỚC 3.10: Test Website (Sơ Bộ)

### Hành động:
```
1. Click nút "Visit" hoặc mở URL trong trình duyệt

2. Website sẽ mở ra

3. Bạn SẼ THẤY giao diện Login/Register

4. THỬ đăng ký tài khoản:
   - Nhập tên, email, password
   - Click "Sign Up"
```

### Có thể gặp lỗi:
```
⚠️ "Network Error" hoặc không đăng ký được

Tại sao?
→ Backend chưa biết Frontend URL (CORS chưa config)

Giải pháp:
→ Làm tiếp Phần 4 (Kết nối tất cả lại)
```

---

## ✅ CHECKLIST VERCEL

- [ ] Đã đăng nhập Vercel
- [ ] Đã import repository "aurora-ledger"
- [ ] Project Name: `aurora-ledger`
- [ ] Framework: `Vite`
- [ ] Root Directory: `./frontend` ← CỰC KỲ QUAN TRỌNG!
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Đã thêm Environment Variable: `VITE_API_URL`
- [ ] `VITE_API_URL` có `/api` ở cuối
- [ ] Deploy thành công
- [ ] Đã lấy và lưu URL frontend
- [ ] Website mở được (có thể chưa hoạt động đầy đủ)

---

# PHẦN 4: KẾT NỐI TẤT CẢ LẠI

## 🎯 Mục Tiêu
Cập nhật CORS để Frontend gọi được Backend.

## ⏱️ Thời Gian
2-3 phút

---

## 🔹 BƯỚC 4.1: Cập Nhật FRONTEND_URL Trên Render

### Tại sao cần làm bước này?
```
Hiện tại:
  Frontend (Vercel): https://aurora-ledger.vercel.app
  Backend (Render):  https://aurora-ledger-backend.onrender.com
  
Vấn đề:
  Backend chưa biết Frontend URL
  → CORS block requests từ Frontend
  → Frontend không gọi được API
  
Giải pháp:
  Thêm FRONTEND_URL vào Environment Variables của Backend
```

### Hành động:

#### 1. Vào Render Dashboard:
```
1. Mở trình duyệt
2. Vào: https://dashboard.render.com
3. Đăng nhập nếu cần
```

#### 2. Chọn Backend Service:
```
1. Bạn sẽ thấy danh sách services

2. Tìm và click vào "aurora-ledger-backend"
```

#### 3. Vào Tab Environment:
```
1. Tìm sidebar bên trái

2. Click vào "Environment" (icon ⚙️)
```

#### 4. Thêm FRONTEND_URL:
```
1. Bạn sẽ thấy danh sách Environment Variables hiện tại:
   ┌──────────────────┬──────────────────────────┐
   │ Key              │ Value                    │
   ├──────────────────┼──────────────────────────┤
   │ NODE_ENV         │ production               │
   │ DATABASE_URL     │ postgresql://...         │
   │ JWT_SECRET       │ •••••••••••••            │
   │ JWT_EXPIRES_IN   │ 7d                       │
   │ PORT             │ 5000                     │
   └──────────────────┴──────────────────────────┘

2. Kéo xuống dưới, tìm nút "Add Environment Variable"

3. Click "Add Environment Variable"

4. Form sẽ xuất hiện:
   Key:   FRONTEND_URL
   Value: [DÁN URL FRONTEND TỪ VERCEL]

5. Ví dụ:
   Key:   FRONTEND_URL
   Value: https://aurora-ledger.vercel.app

   ⚠️ LƯU Ý:
   - KHÔNG có dấu / ở cuối
   - Dùng URL Vercel của BẠN (từ Phần 3.9)

6. Click "Save Changes" hoặc "Add"
```

#### 5. Đợi Redeploy:
```
Sau khi save:
  ┌─────────────────────────────────────────────┐
  │ ℹ️  Changes saved.                          │
  │                                             │
  │ Your service will automatically redeploy.   │
  │ This may take 1-2 minutes.                  │
  └─────────────────────────────────────────────┘

Render sẽ tự động deploy lại backend.

Đợi 1-2 phút.

Theo dõi trong tab "Logs" hoặc "Events".

Đến khi thấy: "Deploy live" → Xong!
```

---

## 🔹 BƯỚC 4.2: Kiểm Tra Kết Nối

### Hành động:
```
1. Mở URL frontend: https://aurora-ledger.vercel.app

2. Thử đăng ký tài khoản mới:
   Full Name:  Test User
   Email:      test@example.com
   Password:   123456

3. Click "Sign Up"

4. Nếu THÀNH CÔNG:
   ✅ Chuyển sang trang Dashboard
   ✅ Thấy số liệu (có thể là 0)

5. Nếu VẪN LỖI:
   → Đợi thêm 1 phút (backend đang restart)
   → F5 refresh trang
   → Thử lại
```

---

## ✅ CHECKLIST KẾT NỐI

- [ ] Đã vào Render Dashboard
- [ ] Đã chọn service "aurora-ledger-backend"
- [ ] Đã vào tab "Environment"
- [ ] Đã thêm biến `FRONTEND_URL`
- [ ] `FRONTEND_URL` = URL Vercel (không có / cuối)
- [ ] Đã save changes
- [ ] Backend đã redeploy xong
- [ ] Test đăng ký → Thành công!

---

# PHẦN 5: KIỂM TRA & XỬ LÝ LỖI

## ✅ KIỂM TRA TOÀN BỘ HỆ THỐNG

### Test List:

#### 1. Database (Neon):
```
☐ Vào Neon Dashboard
☐ Project "aurora-ledger" hiển thị
☐ Status: Active
☐ Thấy 5 tables: users, categories, transactions, budgets, migrations
```

#### 2. Backend (Render):
```
☐ Vào Render Dashboard
☐ Service "aurora-ledger-backend" hiển thị
☐ Status: Live (màu xanh lá)
☐ Mở URL: https://your-backend.onrender.com/health
☐ Thấy: {"status":"ok","database":"connected"}
```

#### 3. Frontend (Vercel):
```
☐ Vào Vercel Dashboard
☐ Project "aurora-ledger" hiển thị
☐ Status: Ready (màu xanh lá)
☐ Mở URL: https://your-frontend.vercel.app
☐ Thấy trang Login/Register
```

#### 4. Kết Nối Frontend ↔ Backend:
```
☐ Mở website
☐ Đăng ký tài khoản mới → Thành công
☐ Đăng nhập → Thành công
☐ Thấy Dashboard
☐ Thêm giao dịch → Thành công
☐ Tạo danh mục → Thành công
☐ Đặt ngân sách → Thành công
☐ Xem báo cáo → Thành công
```

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### NEON - Database Errors:

#### Lỗi 1: "Connection refused"
```
Triệu chứng:
  - Backend không kết nối được database
  - Lỗi: connect ECONNREFUSED

Nguyên nhân:
  - Sai DATABASE_URL
  - Database đang ngủ (inactive)

Giải pháp:
  1. Vào Neon Dashboard
  2. Click vào project "aurora-ledger"
  3. Tab "Connection Details"
  4. Copy lại Connection String
  5. Vào Render → Environment → Update DATABASE_URL
  6. Save changes → Đợi redeploy
```

#### Lỗi 2: "password authentication failed"
```
Triệu chứng:
  - Lỗi: password authentication failed for user...

Nguyên nhân:
  - Sai password trong connection string
  - Copy thiếu ký tự

Giải pháp:
  1. Vào Neon Dashboard
  2. Lấy lại Connection String (copy toàn bộ)
  3. Paste vào Render Environment Variables
  4. Save changes
```

### RENDER - Backend Errors:

#### Lỗi 3: "Build failed"
```
Triệu chứng:
  - Deploy failed
  - Logs hiển thị: "Build failed"

Nguyên nhân:
  - Chưa set Root Directory = "backend"
  - Sai Build Command

Giải pháp:
  1. Vào Render Dashboard
  2. Click service "aurora-ledger-backend"
  3. Tab "Settings"
  4. Tìm "Root Directory"
  5. Sửa thành: backend
  6. Tìm "Build Command"
  7. Sửa thành: npm install
  8. Save changes
  9. Tab "Manual Deploy" → "Deploy latest commit"
```

#### Lỗi 4: "Service Unavailable / Application failed to respond"
```
Triệu chứng:
  - Backend URL không mở được
  - Lỗi 503 hoặc timeout

Nguyên nhân:
  - Free tier đang "wake up" (sau khi ngủ)
  - Service đang restart

Giải pháp:
  1. Đợi 30-60 giây
  2. Refresh trang (F5)
  3. Kiểm tra logs trong Render Dashboard
  4. Nếu vẫn lỗi:
     - Check Environment Variables
     - Check DATABASE_URL
     - Xem logs để tìm lỗi cụ thể
```

#### Lỗi 5: "Module not found"
```
Triệu chứng:
  - Build failed
  - Logs: Error: Cannot find module 'express'

Nguyên nhân:
  - package.json bị sai
  - Dependencies chưa cài

Giải pháp:
  1. Kiểm tra file backend/package.json trên GitHub
  2. Đảm bảo có đầy đủ dependencies
  3. Commit và push lại
  4. Render sẽ tự động redeploy
```

### VERCEL - Frontend Errors:

#### Lỗi 6: "Build failed"
```
Triệu chứng:
  - Deploy failed
  - Logs: "Build failed"

Nguyên nhân:
  - Chưa set Root Directory = "frontend"
  - Sai Build Command

Giải pháp:
  1. Vào Vercel Dashboard
  2. Click project "aurora-ledger"
  3. Settings
  4. General
  5. Tìm "Root Directory"
  6. Click Edit → Chọn "frontend"
  7. Save
  8. Deployments → Redeploy
```

#### Lỗi 7: "Runtime error / Blank page"
```
Triệu chứng:
  - Website mở được nhưng trống trắng
  - Console có lỗi

Nguyên nhân:
  - Chưa set VITE_API_URL
  - Sai URL backend

Giải pháp:
  1. Vào Vercel Dashboard
  2. Project "aurora-ledger" → Settings
  3. Environment Variables
  4. Kiểm tra VITE_API_URL:
     - Đúng URL backend
     - Có /api ở cuối
     - Không có / sau /api
  5. Save
  6. Deployments → Redeploy
```

### KẾT NỐI - CORS Errors:

#### Lỗi 8: "CORS policy: No 'Access-Control-Allow-Origin'"
```
Triệu chứng:
  - Frontend không gọi được API
  - Console: CORS policy error

Nguyên nhân:
  - Chưa set FRONTEND_URL trên Render
  - Sai URL frontend

Giải pháp:
  1. Vào Render Dashboard
  2. Service "aurora-ledger-backend"
  3. Environment
  4. Add/Update FRONTEND_URL
  5. Value = URL Vercel (không có / cuối)
  6. Save changes
  7. Đợi redeploy
```

#### Lỗi 9: "Network Error"
```
Triệu chứng:
  - Frontend: "Network Error"
  - Không đăng nhập/đăng ký được

Nguyên nhân:
  - Sai VITE_API_URL
  - Backend đang ngủ (free tier)

Giải pháp:
  1. Kiểm tra VITE_API_URL trên Vercel
  2. Mở URL backend/health để "đánh thức"
  3. Đợi 30s
  4. Thử lại trên frontend
```

---

## 📝 NOTES & TIPS

### Free Tier Limitations:

#### Neon:
```
✓ 0.5 GB storage
✓ 100 giờ compute/tháng
⚠️ Database ngủ sau 5 phút không hoạt động
→ Tự động thức khi có request
```

#### Render:
```
✓ 750 giờ/tháng
✓ 512 MB RAM
⚠️ Service ngủ sau 15 phút không có request
→ Wake up time: ~30 giây lần đầu
```

#### Vercel:
```
✓ 100 GB bandwidth/tháng
✓ Unlimited deployments
✓ KHÔNG NGỦ (always-on)
```

### Best Practices:

#### 1. Naming Convention:
```
✓ Dùng tên rõ ràng, dễ nhớ
✓ Backend: aurora-ledger-backend
✓ Frontend: aurora-ledger (hoặc aurora-ledger-frontend)
✓ Database: aurora-ledger
```

#### 2. Environment Variables:
```
✓ Lưu lại tất cả values vào Notepad/file riêng
✓ Backup credentials
✓ Không commit .env vào Git
```

#### 3. URLs:
```
✓ Lưu lại:
  - Neon Dashboard URL
  - Render Service URL
  - Vercel Project URL
  - Backend API URL
  - Frontend URL
```

#### 4. Testing:
```
✓ Test backend riêng: /health endpoint
✓ Test frontend riêng: Mở URL xem giao diện
✓ Test kết nối: Đăng ký/đăng nhập
```

---

## 🎉 HOÀN THÀNH!

### Bạn đã deploy thành công:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ✅ Database:  PostgreSQL trên Neon                     │
│     URL: ep-xxx.aws.neon.tech                           │
│                                                         │
│  ✅ Backend:   Node.js API trên Render                  │
│     URL: https://aurora-ledger-backend.onrender.com     │
│                                                         │
│  ✅ Frontend:  React App trên Vercel                    │
│     URL: https://aurora-ledger.vercel.app               │
│                                                         │
│  🎉 WEBSITE ĐANG LIVE!                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Chia sẻ với bạn bè:
```
Xem ứng dụng quản lý tài chính của tôi:
🌐 https://aurora-ledger.vercel.app

Đăng ký miễn phí để dùng thử!
```

### Tiếp theo, bạn có thể:
```
✓ Thêm custom domain
✓ Nâng cấp lên paid plans
✓ Tùy chỉnh giao diện
✓ Thêm tính năng mới
✓ Analytics & Monitoring
```

---

## 📞 HỖ TRỢ

Nếu gặp lỗi khác không có trong guide:

1. **Kiểm tra Logs:**
   - Render: Tab "Logs"
   - Vercel: Deployment logs
   - Browser Console: F12 → Console tab

2. **Google Error Message:**
   - Copy toàn bộ error message
   - Google: "render [error message]"
   - Hoặc: "vercel [error message]"

3. **Hỏi AI:**
   - Copy error + context
   - Hỏi ChatGPT/Claude

4. **GitHub Issues:**
   - Tạo issue trên repository
   - Mô tả chi tiết lỗi + steps đã làm

---

**CHÚC MỪNG BẠN ĐÃ DEPLOY THÀNH CÔNG! 🎉🎉🎉**

**Hãy tận hưởng thành quả của bạn!** 🚀

