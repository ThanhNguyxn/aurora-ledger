# 📤 CÁCH PUSH CODE LÊN GITHUB

## 🎯 CÁCH 1: Dùng Script Tự Động (Dễ Nhất)

### Bước 1: Tạo Repository Trên GitHub

1. Vào: **https://github.com/new**
2. Điền:
   - **Repository name:** `aurora-ledger`
   - **Public** ✅
   - **KHÔNG tick** gì khác
3. Click **"Create repository"**

### Bước 2: Chạy Script

**Cách 1: Double-click**
1. Tìm file `push-to-github.ps1` trong thư mục dự án
2. **Click phải** → **"Run with PowerShell"**
3. Nhập username GitHub khi được hỏi
4. Làm theo hướng dẫn

**Cách 2: Chạy từ PowerShell**
```powershell
cd D:\Code\Aurora-Ledger
.\push-to-github.ps1
```

### Bước 3: Đăng Nhập (Nếu Hỏi)

**Username:** `your_github_username`  
**Password:** **DÙNG PERSONAL ACCESS TOKEN** (không phải password thường)

#### Tạo Personal Access Token:

1. Vào: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Điền:
   - **Note:** `Git Access`
   - **Expiration:** `90 days`
   - ✅ Tick **repo** (chọn tất cả)
4. Click **"Generate token"**
5. **COPY token** (chỉ hiện 1 lần!)
6. Paste làm password khi Git hỏi

### ✅ Xong!

Xem code tại: `https://github.com/YOUR_USERNAME/aurora-ledger`

---

## 🎯 CÁCH 2: Chạy Lệnh Thủ Công

### Mở PowerShell và chạy:

```powershell
# Bước 1: Di chuyển vào thư mục
cd D:\Code\Aurora-Ledger

# Bước 2: Thêm remote (THAY YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/aurora-ledger.git

# Bước 3: Push code
git push -u origin main
```

**Lưu ý:** Thay `YOUR_USERNAME` bằng username GitHub của bạn!

---

## ❓ XỬ LÝ LỖI

### Lỗi: "remote origin already exists"

```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/aurora-ledger.git
git push -u origin main
```

### Lỗi: "repository not found"

**Nguyên nhân:** Chưa tạo repository trên GitHub hoặc sai username

**Giải pháp:**
1. Kiểm tra đã tạo repository chưa: https://github.com/YOUR_USERNAME/aurora-ledger
2. Nếu chưa có → Tạo mới tại: https://github.com/new
3. Chạy lại lệnh push

### Lỗi: "authentication failed"

**Nguyên nhân:** Sai username hoặc password

**Giải pháp:**
1. Username: Phải đúng username GitHub
2. Password: Phải dùng **Personal Access Token** (không phải password GitHub)
3. Tạo token tại: https://github.com/settings/tokens

### Lỗi: "Permission denied"

**Giải pháp:** Dùng Personal Access Token thay vì SSH key

---

## 📋 CHECKLIST

- [ ] Đã tạo tài khoản GitHub
- [ ] Đã tạo repository tên `aurora-ledger`
- [ ] Repository là **Public** (để deploy miễn phí)
- [ ] Đã chạy script hoặc lệnh push
- [ ] Vào GitHub thấy code đã lên
- [ ] URL repository: `https://github.com/YOUR_USERNAME/aurora-ledger`

---

## 🚀 BƯỚC TIẾP THEO

**Sau khi push code lên GitHub thành công:**

1. Mở file **`BAT-DAU-NHANH.md`**
2. Làm theo **BƯỚC 4** và **BƯỚC 5** để deploy lên web
3. Trong 25 phút, website của bạn sẽ LIVE! 🎉

---

## 📞 CẦN GIÚP?

**Xem hướng dẫn chi tiết:**
- `BAT-DAU-NHANH.md` - Quick start guide
- `HUONG-DAN-DEPLOY.md` - Hướng dẫn deploy từng bước
- `DEPLOYMENT.md` - Hướng dẫn kỹ thuật

---

**CHÚC BẠN THÀNH CÔNG! 🚀**

