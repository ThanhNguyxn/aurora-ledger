# Hướng dẫn Setup Admin qua API (Dành cho Render Free Plan)

## Cách 1: Dùng Postman hoặc Browser Console

### Bước 1: Kiểm tra setup status
```
GET https://your-backend-url.onrender.com/api/setup/check-setup
```

### Bước 2: Chạy setup admin
```
POST https://your-backend-url.onrender.com/api/setup/init-admin
Content-Type: application/json

{
  "email": "thanhnguyentuan2007@gmail.com",
  "secret": "aurora-setup-2024"
}
```

**Response thành công:**
```json
{
  "success": true,
  "message": "Admin setup completed successfully!",
  "user": {
    "id": 1,
    "email": "thanhnguyentuan2007@gmail.com",
    "role": "admin"
  },
  "note": "Please logout and login again to see admin features"
}
```

### Bước 3: Đăng xuất và đăng nhập lại
- Logout khỏi app
- Login lại bằng email: `thanhnguyentuan2007@gmail.com`
- Link "Admin" sẽ xuất hiện trong sidebar

---

## Cách 2: Dùng Browser Console (Chrome DevTools)

### 1. Mở trang web của bạn (đã deploy trên Vercel)
### 2. Mở DevTools (F12) → Tab Console
### 3. Paste và chạy code này:

```javascript
// Thay YOUR_BACKEND_URL bằng URL backend thực tế
const API_URL = 'https://aurora-ledger-backend.onrender.com'; // ⚠️ THAY ĐỔI URL NÀY

fetch(`${API_URL}/api/setup/init-admin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'thanhnguyentuan2007@gmail.com',
    secret: 'aurora-setup-2024'
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Setup Result:', data);
  if (data.success) {
    alert('Admin setup thành công! Vui lòng đăng xuất và đăng nhập lại.');
  } else {
    alert('Setup failed: ' + (data.error || 'Unknown error'));
  }
})
.catch(err => {
  console.error('❌ Setup Error:', err);
  alert('Setup failed. Check console for details.');
});
```

---

## Cách 3: Dùng cURL (Terminal/CMD)

```bash
curl -X POST https://your-backend-url.onrender.com/api/setup/init-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "thanhnguyentuan2007@gmail.com",
    "secret": "aurora-setup-2024"
  }'
```

Trên Windows PowerShell:
```powershell
Invoke-RestMethod -Uri "https://your-backend-url.onrender.com/api/setup/init-admin" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"thanhnguyentuan2007@gmail.com","secret":"aurora-setup-2024"}'
```

---

## Lưu ý quan trọng:

### 1. Tìm Backend URL của bạn:
- Vào Render Dashboard
- Chọn backend service
- Copy URL (thường là: `https://[service-name].onrender.com`)

### 2. Đảm bảo email đã đăng ký:
- Email `thanhnguyentuan2007@gmail.com` phải đã có tài khoản trong hệ thống
- Nếu chưa có, vào trang Register để đăng ký trước
- Sau đó mới chạy setup admin

### 3. Secret key:
- Mặc định: `aurora-setup-2024`
- Có thể đổi bằng cách set biến môi trường `SETUP_SECRET` trong Render

### 4. Setup chỉ thêm role column 1 lần:
- Lần đầu chạy: Sẽ tạo column `role` trong database
- Các lần sau: Chỉ set admin role cho email được chỉ định
- An toàn để chạy nhiều lần

---

## Troubleshooting

### Lỗi: "Invalid setup secret"
- Kiểm tra lại secret key
- Nếu đã set `SETUP_SECRET` trong Render environment variables, dùng giá trị đó

### Lỗi: "User not found"
- Email chưa được đăng ký
- Vào trang Register để tạo tài khoản trước

### Lỗi: CORS
- Kiểm tra backend URL đúng chưa
- Đảm bảo backend đã deploy và đang chạy

### Admin link không hiện sau khi login?
1. Xóa localStorage: `localStorage.clear()`
2. Đăng xuất
3. Đăng nhập lại
4. Check console: `JSON.parse(localStorage.getItem('user'))`

---

## Sau khi setup thành công:

✅ Đăng nhập lại với email: `thanhnguyentuan2007@gmail.com`
✅ Sidebar sẽ có link "Admin" (icon Shield)
✅ Click vào để vào trang Admin Dashboard
✅ Có thể quản lý users, reset password, đổi role

---

## Về việc đổi Email/Password trong Profile:

✅ **Đã fix:** Khi bạn đổi email trong Profile, thông tin sẽ được cập nhật ngay
✅ Đăng nhập lần sau phải dùng **email mới** và **password hiện tại** (hoặc password mới nếu đã đổi)
✅ Ví dụ:
   - Ban đầu: email A + password B
   - Đổi email thành C: Lần sau login bằng email C + password B
   - Đổi password thành D: Lần sau login bằng email C + password D
