# Hướng dẫn cài đặt Admin Dashboard

## 1. Chạy Migration để thêm cột `role` vào database

### Trên local (development):
```bash
cd backend
node scripts/migrate-add-role.js
```

### Trên Render (production):
1. Vào Render Dashboard
2. Chọn service backend của bạn
3. Vào tab "Shell"
4. Chạy lệnh:
```bash
node scripts/migrate-add-role.js
```

## 2. Set Admin Role cho tài khoản của bạn

### Cách 1: Qua Render Dashboard (Khuyên dùng)
1. Vào Render Dashboard
2. Chọn service PostgreSQL của bạn
3. Vào tab "Shell" hoặc "Connect"
4. Chạy SQL query:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

**Thay `your-email@example.com` bằng email tài khoản của bạn!**

### Cách 2: Qua script migration (Chỉnh sửa file trước)
1. Mở file `backend/scripts/migrate-add-role.js`
2. Tìm dòng:
```javascript
// const adminEmail = 'your-email@example.com';
```
3. Uncomment và thay email:
```javascript
const adminEmail = 'your-email@example.com';
await client.query(`UPDATE users SET role = 'admin' WHERE email = $1`, [adminEmail]);
console.log(`✅ Admin role set for ${adminEmail}`);
```
4. Chạy lại migration:
```bash
node scripts/migrate-add-role.js
```

## 3. Verify Admin Access

1. Đăng xuất (Logout)
2. Đăng nhập lại (Login)
3. Kiểm tra sidebar - bạn sẽ thấy link "Admin" (biểu tượng Shield)
4. Click vào "Admin" để truy cập trang quản trị

## 4. Tính năng Admin Dashboard

- **Thống kê hệ thống:**
  - Tổng số người dùng
  - Người dùng mới (30 ngày)
  - Tổng số giao dịch
  - Số lượng admin

- **Quản lý người dùng:**
  - Xem danh sách tất cả users
  - Tìm kiếm theo email/tên
  - Chuyển đổi role (user ↔ admin)
  - Reset mật khẩu cho user
  - Xóa tài khoản user
  - Xem thống kê từng user

- **Bảo mật:**
  - Chỉ admin mới thấy và truy cập được
  - Admin không thể xóa chính mình
  - Admin không thể gỡ quyền admin của chính mình

## 5. Khôi phục tài khoản bị quên mật khẩu

Nếu bạn quên mật khẩu tài khoản đã đăng ký:

### Cách 1: Qua Forgot Password (Nếu có email)
1. Click "Forgot Password" ở trang login
2. Nhập email
3. Check email để lấy link reset password

### Cách 2: Qua Admin (Nếu đã có admin account khác)
1. Đăng nhập bằng tài khoản admin
2. Vào trang Admin
3. Tìm tài khoản cần reset
4. Click nút "Reset Password" (icon khóa)
5. Nhập mật khẩu mới

### Cách 3: Qua Database (Direct SQL)
1. Vào Render PostgreSQL Shell
2. Chạy SQL:
```sql
-- Tìm user ID
SELECT id, email, full_name FROM users WHERE email = 'your-email@example.com';

-- Reset password thành "123456"
-- Hash của "123456" với bcrypt rounds=10
UPDATE users SET password = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' 
WHERE email = 'your-email@example.com';
```

**Lưu ý:** Password hash trên là cho "123456". Sau khi login, nên đổi lại mật khẩu mới ngay!

## 6. Troubleshooting

### Admin link không hiện trong sidebar?
- Đăng xuất và đăng nhập lại
- Kiểm tra database: `SELECT email, role FROM users WHERE email = 'your-email@example.com';`
- Role phải là 'admin' chứ không phải 'user'

### "Access Denied" khi vào trang Admin?
- Tài khoản chưa có role admin
- Chạy lại bước 2 để set admin role

### Migration báo lỗi?
- Kiểm tra kết nối database
- Đảm bảo DATABASE_URL được set đúng trong .env

## Notes

- Role mặc định khi đăng ký mới: `user`
- Chỉ admin mới có thể:
  - Xem danh sách tất cả users
  - Thay đổi role của users khác
  - Reset password cho users khác
  - Xóa users khác
