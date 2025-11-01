# 🚀 Hướng Dẫn Setup Tự Động

## 📋 Tổng Quan
Script này sẽ tự động:
1. Thêm cột `oauth_provider` vào bảng users (để phân biệt Google login vs Email/Password)
2. Thêm cột `role` vào bảng users (nếu chưa có)
3. Set admin role cho email: **thanhnguyentuan2007@gmail.com**

## 🔧 Cách 1: Setup Qua API (Khuyến Nghị)

### Bước 1: Đảm bảo backend đã deploy
Kiểm tra backend URL của bạn (ví dụ: https://aurora-ledger-backend.onrender.com)

### Bước 2: Chạy setup bằng 1 trong các cách sau:

#### 💻 Option A: Dùng Browser Console
1. Mở browser và vào trang web frontend của bạn
2. Nhấn F12 để mở Developer Tools
3. Chọn tab "Console"
4. Paste code sau và nhấn Enter:

```javascript
// Thay YOUR_BACKEND_URL bằng URL backend thực tế
const BACKEND_URL = 'https://aurora-ledger-backend.onrender.com';

fetch(`${BACKEND_URL}/api/setup/init-admin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'thanhnguyentuan2007@gmail.com',
    secret: 'aurora-setup-2024'
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Setup Success:', data);
  alert('Setup thành công! Đăng xuất rồi đăng nhập lại để thấy Admin panel.');
})
.catch(err => {
  console.error('❌ Setup Error:', err);
  alert('Setup thất bại: ' + err.message);
});
```

#### 📮 Option B: Dùng Postman/Insomnia
1. Tạo POST request
2. URL: `https://YOUR_BACKEND_URL/api/setup/init-admin`
3. Headers:
   ```
   Content-Type: application/json
   ```
4. Body (raw JSON):
   ```json
   {
     "email": "thanhnguyentuan2007@gmail.com",
     "secret": "aurora-setup-2024"
   }
   ```
5. Send

#### 🖥️ Option C: Dùng PowerShell (Windows)
```powershell
$body = @{
    email = "thanhnguyentuan2007@gmail.com"
    secret = "aurora-setup-2024"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://YOUR_BACKEND_URL/api/setup/init-admin" -Method POST -Body $body -ContentType "application/json"
```

#### 🐧 Option D: Dùng curl (Mac/Linux)
```bash
curl -X POST https://YOUR_BACKEND_URL/api/setup/init-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "thanhnguyentuan2007@gmail.com",
    "secret": "aurora-setup-2024"
  }'
```

### Bước 3: Kiểm tra kết quả
Nếu thành công, bạn sẽ nhận response:
```json
{
  "success": true,
  "message": "Admin setup completed successfully!",
  "user": {
    "id": 123,
    "email": "thanhnguyentuan2007@gmail.com",
    "role": "admin"
  },
  "note": "Please logout and login again to see admin features"
}
```

### Bước 4: Đăng xuất và đăng nhập lại
1. Logout khỏi web app
2. Login lại với email thanhnguyentuan2007@gmail.com
3. Bạn sẽ thấy menu "Admin" trong sidebar

---

## 🔧 Cách 2: Chạy Migration Script Thủ Công (Nếu có quyền truy cập server)

### Nếu bạn có thể SSH vào server hoặc chạy command local:

#### Bước 1: Thêm cột oauth_provider
```bash
cd backend
node scripts/migrate-oauth-provider.js
```

#### Bước 2: Set admin role
```bash
node scripts/migrate-add-role.js
```

Sau đó chỉnh sửa `migrate-add-role.js` để set email admin:
```javascript
// Trong migrate-add-role.js, tìm dòng set admin và sửa email
await client.query(
  "UPDATE users SET role = 'admin' WHERE email = 'thanhnguyentuan2007@gmail.com'"
);
```

---

## ⚠️ Troubleshooting

### Lỗi: "User not found"
→ Email chưa được đăng ký. Hãy đăng ký tài khoản trước bằng cách login vào web app.

### Lỗi: "Invalid setup secret"
→ Secret key sai. Mặc định là `aurora-setup-2024`. Nếu bạn đã đổi env variable `SETUP_SECRET`, hãy dùng giá trị đó.

### Lỗi: "Column already exists"
→ OK! Cột đã tồn tại rồi, script sẽ bỏ qua bước này.

### Không thấy menu Admin sau khi login
→ Hãy chắc chắn bạn đã **logout hoàn toàn** và **login lại**. Role chỉ được load khi login.

---

## 🎯 Sau Khi Setup Thành Công

### Bạn có thể:
1. ✅ Truy cập Admin Dashboard tại `/admin`
2. ✅ Xem danh sách tất cả users
3. ✅ Thay đổi role của users (user ↔ admin)
4. ✅ Reset password của bất kỳ user nào
5. ✅ Xóa users (trừ chính bạn)

### User đăng nhập Google:
- ✅ Có thể set password từ trang Profile
- ✅ Sau khi set password, có thể login bằng cả Google **hoặc** Email/Password
- ✅ Không cần nhập "Current Password" khi set password lần đầu

---

## 🔒 Bảo Mật

### Lưu ý:
- Secret key `aurora-setup-2024` chỉ dùng cho setup ban đầu
- Endpoint `/api/setup/init-admin` chỉ có thể set admin, không thể tạo user mới
- Sau khi setup xong, bạn có thể xóa endpoint này khỏi code (optional)
- Hoặc set `SETUP_SECRET` thành giá trị phức tạp hơn trong environment variables

### Để đổi secret key:
```bash
# Trong Render Dashboard > Environment Variables
SETUP_SECRET=your-super-secret-key-here-12345
```

Sau đó dùng secret mới trong request JSON.

---

## 📞 Hỗ Trợ
Nếu gặp vấn đề, check:
1. Backend logs trong Render Dashboard
2. Browser Console (F12) để xem error messages
3. Response từ API để biết lỗi cụ thể

Good luck! 🚀
