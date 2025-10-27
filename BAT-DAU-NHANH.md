# ⚡ BẮT ĐẦU NHANH - 5 BƯỚC ĐƠN GIẢN

> **Làm theo từng bước để deploy web trong 30 phút!**

---

## 📋 CHUẨN BỊ

### 1️⃣ Tạo Tài Khoản GitHub (2 phút)

1. Truy cập: **https://github.com/signup**
2. Điền email, mật khẩu, username
3. Xác nhận email
4. **✅ Xong!**

---

## 🚀 UPLOAD CODE LÊN GITHUB

### 2️⃣ Tạo Repository Mới (1 phút)

1. Đăng nhập GitHub
2. Click nút **"+"** góc trên phải → **"New repository"**
3. Điền:
   - **Repository name:** `aurora-ledger`
   - **Description:** `Personal Finance Management App`
   - Chọn: **Public**
   - **KHÔNG** tick các ô khác
4. Click **"Create repository"**
5. **LƯU LẠI URL** hiện ra (dạng: `https://github.com/YOUR_USERNAME/aurora-ledger.git`)

### 3️⃣ Push Code Lên GitHub (2 phút)

**Mở PowerShell/Command Prompt và chạy:**

```powershell
# Di chuyển vào thư mục dự án
cd D:\Code\Aurora-Ledger

# Kết nối với GitHub (THAY YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/aurora-ledger.git

# Push code lên GitHub
git push -u origin main
```

**Nếu Git yêu cầu đăng nhập:**

> **Username:** `your_github_username`  
> **Password:** KHÔNG dùng password thường!

**Tạo Personal Access Token:**

1. Vào GitHub → Click avatar → **Settings**
2. Kéo xuống dưới → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **"Generate new token"** → **"Generate new token (classic)"**
5. Điền:
   - Note: `Git Access`
   - Expiration: `90 days`
   - ✅ Tick: **repo** (chọn tất cả)
6. Click **"Generate token"**
7. **COPY token** (chỉ hiện 1 lần!)
8. Dùng token này làm **password** khi Git hỏi

**Sau khi push xong:**

✅ Vào `https://github.com/YOUR_USERNAME/aurora-ledger` để xem code đã lên!

---

## ☁️ DEPLOY LÊN WEB (25 phút)

### 4️⃣ Đăng Ký Các Tài Khoản Miễn Phí (5 phút)

**Dùng cùng 1 email, đăng nhập bằng GitHub cho nhanh:**

1. **Neon** (Database): https://neon.tech
   - Click "Sign up" → "Continue with GitHub"

2. **Render** (Backend): https://render.com
   - Click "Get Started" → "GitHub"

3. **Vercel** (Frontend): https://vercel.com
   - Click "Sign Up" → "Continue with GitHub"

### 5️⃣ Deploy Theo Hướng Dẫn Chi Tiết (20 phút)

**Mở file:** `HUONG-DAN-DEPLOY.md`

Làm theo từng bước:

- ✅ **BƯỚC 2:** Tạo Database trên Neon (5 phút)
- ✅ **BƯỚC 3:** Deploy Backend lên Render (7 phút)
- ✅ **BƯỚC 4:** Deploy Frontend lên Vercel (5 phút)
- ✅ **BƯỚC 5:** Hoàn tất & Kiểm tra (3 phút)

---

## 🎉 XEM KẾT QUẢ

Sau khi làm xong BƯỚC 5, bạn sẽ có:

- 🌐 **Website LIVE:** `https://aurora-ledger.vercel.app`
- 🔧 **Backend API:** `https://aurora-ledger-backend.onrender.com`
- 💾 **Database:** Neon PostgreSQL
- 📦 **Source Code:** GitHub repository

**Chi phí:** **0đ/tháng** 🎉

---

## 📁 CẤU TRÚC FILE

```
D:\Code\Aurora-Ledger\
├── README.md                  ← Giới thiệu dự án
├── BAT-DAU-NHANH.md          ← File này (Quick Start)
├── HUONG-DAN-DEPLOY.md       ← Hướng dẫn deploy chi tiết
├── DEPLOYMENT.md              ← Hướng dẫn kỹ thuật
├── LICENSE                    ← Giấy phép MIT
│
├── backend\                   ← Server API
│   ├── server.js             ← File chính
│   ├── package.json          ← Dependencies
│   ├── env.example           ← Template cho .env
│   ├── routes\               ← API routes
│   ├── middleware\           ← Auth middleware
│   ├── config\               ← Database config
│   └── scripts\              ← Migration & seed
│
└── frontend\                  ← Giao diện web
    ├── index.html            ← HTML entry
    ├── package.json          ← Dependencies
    ├── env.example           ← Template cho .env
    ├── src\
    │   ├── main.jsx          ← Entry point
    │   ├── App.jsx           ← Main component
    │   ├── pages\            ← Các trang
    │   ├── components\       ← UI components
    │   ├── context\          ← Auth context
    │   └── lib\              ← API client
    └── vite.config.js        ← Vite config
```

---

## ❓ CÂU HỎI THƯỜNG GẶP

### **Q: Tôi chưa biết lập trình, có deploy được không?**
A: Có! Chỉ cần làm theo hướng dẫn từng bước. Copy/paste các lệnh là được.

### **Q: Mất bao lâu để deploy?**
A: Khoảng 30-40 phút cho lần đầu. Lần sau sẽ nhanh hơn nhiều.

### **Q: Có mất tiền không?**
A: **HOÀN TOÀN MIỄN PHÍ!** Tất cả dịch vụ đều có free tier đủ dùng.

### **Q: Website có nhanh không?**
A: Frontend (Vercel) rất nhanh. Backend (Render) free tier sẽ "ngủ" sau 15 phút không dùng, lần đầu mở sẽ mất ~30s.

### **Q: Nếu gặp lỗi thì sao?**
A: Xem mục **"XỬ LÝ LỖI THƯỜNG GẶP"** trong file `HUONG-DAN-DEPLOY.md`

### **Q: Có thể tùy chỉnh domain không?**
A: Có! Free: `yourname.vercel.app`. Muốn custom domain (vd: `myfinance.com`) thì phải mua domain (~$10/năm).

---

## 🎯 LỘ TRÌNH HỌC TẬP

### **Level 1: Người Dùng (Hiện Tại)**
✅ Deploy và sử dụng app  
✅ Thêm/sửa/xóa giao dịch  
✅ Quản lý ngân sách  

### **Level 2: Tùy Chỉnh**
🔧 Đổi màu sắc giao diện  
🔧 Thêm logo riêng  
🔧 Thay đổi tên app  

### **Level 3: Lập Trình Viên**
💻 Thêm tính năng mới  
💻 Tích hợp API bên thứ 3  
💻 Tối ưu hiệu suất  

---

## 📞 HỖ TRỢ

**Cần giúp đỡ?**

1. 📖 Đọc `HUONG-DAN-DEPLOY.md` (hướng dẫn chi tiết)
2. 🔍 Tìm kiếm lỗi trên Google
3. 💬 Hỏi ChatGPT/AI
4. 🐛 Tạo Issue trên GitHub

---

## ✅ CHECKLIST DEPLOY

In file này ra và tick khi hoàn thành:

**GITHUB:**
- [ ] Đã tạo tài khoản GitHub
- [ ] Đã tạo repository `aurora-ledger`
- [ ] Đã push code lên GitHub thành công
- [ ] Thấy code trên `https://github.com/YOUR_USERNAME/aurora-ledger`

**NEON (DATABASE):**
- [ ] Đã đăng ký tài khoản Neon
- [ ] Đã tạo project `aurora-ledger`
- [ ] Đã copy Connection String
- [ ] Đã chạy migration thành công

**RENDER (BACKEND):**
- [ ] Đã đăng ký tài khoản Render
- [ ] Đã connect GitHub repository
- [ ] Đã config Root Directory = `backend`
- [ ] Đã thêm Environment Variables
- [ ] Deploy thành công, có URL backend
- [ ] Test `/health` endpoint → thấy `{"status":"ok"}`

**VERCEL (FRONTEND):**
- [ ] Đã đăng ký tài khoản Vercel
- [ ] Đã import project từ GitHub
- [ ] Đã config Root Directory = `frontend`
- [ ] Đã thêm `VITE_API_URL`
- [ ] Deploy thành công, có URL frontend
- [ ] Website mở được, đăng nhập được

**HOÀN TẤT:**
- [ ] Đã cập nhật `FRONTEND_URL` trên Render
- [ ] Website hoạt động đầy đủ
- [ ] Đã test thêm giao dịch, tạo ngân sách
- [ ] Đã bookmark URL để dùng sau

---

## 🎉 CHÚC MỪNG!

Nếu bạn đã tick hết checklist ở trên, nghĩa là bạn đã:

✅ Deploy thành công 1 ứng dụng web full-stack  
✅ Sử dụng PostgreSQL database  
✅ Làm việc với Git và GitHub  
✅ Triển khai lên production (internet)  

**Đây là thành tựu đáng tự hào!** 🚀

Giờ bạn có thể:
- Chia sẻ link với bạn bè
- Thêm vào CV/Portfolio
- Học thêm để nâng cấp app

---

## 📚 TÀI LIỆU THAM KHẢO

- **Hướng dẫn chi tiết:** `HUONG-DAN-DEPLOY.md`
- **Giới thiệu dự án:** `README.md`
- **Hướng dẫn kỹ thuật:** `DEPLOYMENT.md`

---

**BẮT ĐẦU NGAY!** 🚀

**Bước đầu tiên:** Tạo tài khoản GitHub → https://github.com/signup

---

Made with ❤️ for Vietnamese Developers

