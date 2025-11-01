# 🚀 Hướng dẫn chạy Migration (SIÊU ĐỠN GIẢN)

## Bước 1: Lấy DATABASE_URL

1. **Mở trình duyệt** → Vào https://dashboard.render.com
2. **Đăng nhập** vào Render
3. **Click vào PostgreSQL** (database bạn đang dùng)
4. Tab **"Info"** → Kéo xuống tìm **"External Database URL"**
5. **Click nút "Copy"** bên cạnh URL đó

URL sẽ có dạng:
```
postgresql://aurora_user_xxx:longpassword@dpg-xxx.oregon-postgres.render.com/aurora_db_xxx
```

---

## Bước 2: Chạy Migration

### 🪟 **Windows (PowerShell):**

**Cách 1: Dùng script tự động** ⭐ RECOMMENDED

1. Mở **PowerShell** (phải đúng PowerShell, không phải CMD)
   - Cách mở: `Win + X` → Chọn "Windows PowerShell"

2. Di chuyển vào folder backend:
   ```powershell
   cd D:\Code\Aurora-Ledger\backend
   ```

3. Chạy script:
   ```powershell
   .\run-migration.ps1
   ```

4. **Paste DATABASE_URL** khi được hỏi (Ctrl+V) → Enter

5. **Xong!** ✅

---

**Cách 2: Thủ công (nếu script không chạy)**

```powershell
cd D:\Code\Aurora-Ledger\backend

# Set DATABASE_URL (thay YOUR_URL bằng URL vừa copy)
$env:DATABASE_URL="postgresql://aurora_user_xxx:xxx@dpg-xxx.oregon-postgres.render.com/aurora_db_xxx"

# Chạy migration
node scripts/migrate-recurring-transactions.js
```

---

## ✅ Kết quả mong đợi:

Nếu thành công, bạn sẽ thấy:

```
✅ Database connected successfully
🔄 Creating recurring_transactions table...
✅ Created recurring_transactions table
✅ Created index on user_id
✅ Created index on next_occurrence
🎉 Recurring transactions migration completed!
📅 Users can now create recurring/scheduled transactions!
```

---

## ❌ Nếu gặp lỗi:

### **Lỗi: "cannot run scripts"**

Chạy lệnh này trước (trong PowerShell as Admin):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Sau đó chạy lại `.\run-migration.ps1`

---

### **Lỗi: "connection refused" hoặc "authentication failed"**

→ DATABASE_URL sai hoặc hết hạn
→ Lấy lại URL mới từ Render Dashboard

---

### **Lỗi: "node is not recognized"**

→ Chưa cài Node.js
→ Download tại: https://nodejs.org/

---

## 🎯 Sau khi Migration xong:

1. **Vào web** Aurora Ledger
2. **Hard refresh:** `Ctrl + Shift + R`
3. **Vào trang Recurring**
4. **Click "Add Recurring"**
5. **Tạo thử 1 recurring transaction**
6. **Nó sẽ hoạt động!** 🎉

---

## 💡 Lưu ý:

- Migration **chỉ cần chạy 1 lần duy nhất**
- Sau khi chạy xong, không cần chạy lại
- DATABASE_URL nhạy cảm, **không share** cho ai!

---

## 🆘 Cần help?

Nếu vẫn gặp lỗi:
1. Chụp màn hình error
2. Gửi cho tôi
3. Tôi sẽ fix! 😊

---

**Good luck!** 🍀

