# 🚀 HƯỚNG DẪN DEPLOY BACKEND - SIÊU ĐƠN GIẢN

## ❗ VẤN ĐỀ HIỆN TẠI

Backend trên Render đang chạy **CODE CŨ** (chưa có recurring routes)

→ Cần deploy code mới + run migration

---

## 📋 BƯỚC 1: DEPLOY BACKEND

### 1️⃣ Vào Render Dashboard

**Link:** https://dashboard.render.com

### 2️⃣ Login và chọn service

- Đăng nhập vào Render
- Click vào **Web Service** (aurora-ledger-backend hoặc tên gì đó)

### 3️⃣ Manual Deploy

- Click nút **"Manual Deploy"** (góc trên bên phải)
- Chọn **"Deploy latest commit"**
- Click **"Deploy"**

### 4️⃣ Đợi Deploy hoàn thành (~5-10 phút)

**Xem tab "Logs"** - Phải thấy:
```
==> Installing dependencies...
==> Building...
==> Starting server...
🚀 Server running on port 5000
⏰ Recurring transactions cron job scheduled (daily at 00:05)
```

**Khi thấy dòng cuối → Deploy XONG!** ✅

---

## 📋 BƯỚC 2: RUN MIGRATION

### 1️⃣ Lấy Database URL

**Trong Render Dashboard:**
- Click vào **PostgreSQL** (database)
- Kéo xuống tìm **"External Database URL"**
- Click nút **"Copy"** bên cạnh URL

URL dạng:
```
postgresql://aurora_xxx:longpassword@dpg-xxx.oregon-postgres.render.com/aurora_xxx
```

### 2️⃣ Mở PowerShell

- Nhấn `Win + X`
- Chọn **"Windows PowerShell"** (KHÔNG phải CMD!)

### 3️⃣ Chạy Migration Script

**Copy paste từng lệnh này:**

```powershell
cd D:\Code\Aurora-Ledger\backend
```

**Enter**, sau đó:

```powershell
.\run-migration.ps1
```

**Enter** → Script sẽ hỏi paste DATABASE_URL

**Paste URL** vừa copy từ Render (Ctrl+V) → **Enter**

### 4️⃣ Xem kết quả

**Phải thấy:**
```
✅ Database connected successfully
🔄 Creating recurring_transactions table...
✅ Created recurring_transactions table
✅ Created index on user_id
✅ Created index on next_occurrence
🎉 Recurring transactions migration completed!
```

**→ XONG!** ✅

---

## 📋 BƯỚC 3: TEST TRÊN WEB

### 1️⃣ Vào web production

**URL:** https://aurora-ledger.vercel.app

### 2️⃣ Hard Refresh

```
Ctrl + Shift + R
```

(Xóa cache, load code mới)

### 3️⃣ Test Recurring

1. Login
2. Click **"Recurring"** ở sidebar
3. Click **"+ Add Recurring"**
4. Fill form:
   - Type: Expense (click nút 💸)
   - Amount: 100
   - Currency: USD
   - Frequency: Monthly (click nút 📊)
   - Start Date: chọn ngày hôm nay
5. Click **"Create"**

**Nếu thành công → Thấy recurring mới trong list!** 🎉

---

## ❌ NẾU GẶP LỖI

### Lỗi: "cannot run scripts" khi chạy .ps1

**Fix:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Sau đó chạy lại `.\run-migration.ps1`

---

### Lỗi: 502 Bad Gateway

→ Backend chưa deploy xong hoặc đang restart

**Fix:** Đợi thêm 5 phút, refresh lại

---

### Lỗi: 400 Bad Request

→ Migration chưa chạy

**Fix:** Run migration script (Bước 2)

---

### Lỗi: Connection refused

→ DATABASE_URL sai hoặc hết hạn

**Fix:** Lấy lại URL mới từ Render → Chạy lại migration

---

## 🎯 CHECKLIST ĐẦY ĐỦ

- [ ] **Backend deployed** (Render Dashboard → Manual Deploy)
- [ ] **Deploy logs OK** (Thấy "Server running")
- [ ] **Migration completed** (Run PowerShell script)
- [ ] **Migration logs OK** (Thấy "✅ Created table")
- [ ] **Web hard refresh** (Ctrl+Shift+R)
- [ ] **Test create recurring** (Thành công!)

---

## ⏰ TIMELINE

- **Deploy backend:** 5-10 phút
- **Run migration:** 30 giây
- **Test:** 1 phút

**TỔNG:** ~10-15 phút

---

## 💡 LƯU Ý QUAN TRỌNG

### ✅ LÀM ĐÚng THỨ TỰ:

1. **Deploy backend TRƯỚC**
2. **Đợi deploy XONG** (xem logs)
3. **RUN migration SAU**
4. **Test cuối cùng**

### ❌ ĐỪNG:

- Đừng run migration trước khi backend deploy
- Đừng skip bước nào
- Đừng dùng CMD (phải dùng PowerShell!)

---

## 🆘 CẦN HELP?

Nếu vẫn lỗi:
1. Chụp màn hình error
2. Gửi cho tôi
3. Tôi sẽ debug! 😊

---

## ✨ SAU KHI XONG

**Bạn sẽ có:**
- ✅ Recurring Transactions hoạt động
- ✅ Auto-create mỗi ngày (cron job)
- ✅ UI đẹp, đồng bộ
- ✅ 10 ngôn ngữ
- ✅ Dark mode đẹp

---

**BẮT ĐẦU THÔI!** 🚀

Bước đầu tiên: Vào Render Dashboard → Manual Deploy!

