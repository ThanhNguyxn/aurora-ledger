# 🎯 SETUP NHANH CHO BẠN

## Bước 1: Deploy Code Mới

### Backend (Render)
1. Commit và push code lên GitHub
2. Render sẽ tự động deploy (hoặc trigger manual deploy)
3. Đợi deploy xong (khoảng 2-3 phút)

### Frontend (Vercel)
1. Vercel sẽ tự động build khi bạn push code
2. Đợi build xong (khoảng 1-2 phút)

---

## Bước 2: Chạy Setup Admin

### Mở Browser Console:
1. Vào trang web của bạn (frontend URL)
2. Nhấn **F12** để mở DevTools
3. Chọn tab **Console**
4. Copy/paste code này và nhấn **Enter**:

```javascript
// THAY ĐỔI URL này thành backend URL thực tế của bạn
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
  console.log('✅ KẾT QUẢ:', data);
  if (data.success) {
    alert('🎉 Setup thành công!\n\n' + 
          '1. Đăng xuất\n' + 
          '2. Đăng nhập lại\n' +
          '3. Bạn sẽ thấy menu Admin');
  } else {
    alert('❌ Lỗi: ' + (data.error || 'Unknown error'));
  }
})
.catch(err => {
  console.error('❌ LỖI:', err);
  alert('❌ Không kết nối được backend. Check URL!');
});
```

### ⚠️ QUAN TRỌNG:
- **Sửa dòng 2**: Thay `https://aurora-ledger-backend.onrender.com` bằng URL backend thực tế của bạn
- Nếu chưa đăng ký tài khoản thanhnguyentuan2007@gmail.com trên web, hãy đăng ký/login bằng Google trước

---

## Bước 3: Logout & Login Lại
1. Click vào profile menu → Logout
2. Login lại bằng Google (email thanhnguyentuan2007@gmail.com)
3. Bạn sẽ thấy menu **"Admin"** trong sidebar

---

## Bước 4: Test OAuth Password Feature

### Nếu bạn đăng nhập bằng Google:
1. Vào trang **Profile** (`/profile`)
2. Bạn sẽ thấy thông báo màu xanh:
   > ℹ️ You logged in with Google. Set a password to also login with email.
3. **Không cần nhập "Current Password"**
4. Chỉ cần nhập:
   - New Password (ít nhất 6 ký tự)
   - Confirm Password
5. Click "Change Password"
6. Sau khi đổi xong, bạn có thể login bằng **Email/Password** hoặc **Google**

### Nếu bạn đăng nhập bằng Email/Password:
1. Vào trang Profile
2. Sẽ thấy 3 trường:
   - Current Password (bắt buộc)
   - New Password
   - Confirm Password
3. Nhập đầy đủ 3 trường để đổi password

---

## Bước 5: Test Admin Panel

### Vào Admin Dashboard:
1. Click "Admin" trong sidebar
2. Bạn sẽ thấy:
   - ✅ Danh sách tất cả users
   - ✅ Nút "Toggle Role" (user ↔ admin)
   - ✅ Nút "Reset Password"
   - ✅ Nút "Delete User"

### Test Reset Password cho OAuth User:
1. Tạo 1 tài khoản test bằng Google login
2. Vào Admin panel
3. Click "Reset Password" cho user đó
4. Set password mới
5. User đó giờ có thể login bằng email/password

---

## 🎉 XONG!

### Bạn đã có:
- ✅ Admin panel đầy đủ chức năng
- ✅ OAuth users có thể set password
- ✅ Profile page hoàn chỉnh với dark mode
- ✅ Role-based access control

### Backend đã thêm:
- `oauth_provider` column (để phân biệt Google vs Email login)
- `role` column (user/admin)
- Logic xử lý password cho OAuth users

### Frontend đã update:
- Ẩn "Current Password" field cho OAuth users
- Hiển thị thông báo hướng dẫn cho OAuth users
- Update user context sau khi OAuth user set password

---

## ⚠️ Nếu gặp lỗi:

### "User not found"
→ Email chưa đăng ký. Login vào web trước.

### "Invalid setup secret"
→ Check xem có set env variable `SETUP_SECRET` không. Mặc định là `aurora-setup-2024`

### Không thấy menu Admin
→ **Phải logout hoàn toàn rồi login lại**. Không chỉ refresh page.

### Setup script không chạy
→ Check:
1. Backend URL có đúng không
2. Backend đã deploy chưa
3. Mở Network tab (F12) xem request có gửi đi không

---

## 📞 Backend URL của bạn là gì?
Bạn cần biết URL backend để chạy setup script. Thường có dạng:
- Render: `https://[your-app-name].onrender.com`
- Railway: `https://[your-app-name].up.railway.app`
- Heroku: `https://[your-app-name].herokuapp.com`

Check trong:
- Render Dashboard → Your Service → URL ở góc trên
- Hoặc file `.env` trong frontend → `VITE_API_URL`

---

Good luck! 🚀
