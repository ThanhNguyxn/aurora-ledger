# 📧 SendGrid Setup - Hướng Dẫn Chi Tiết (5 Phút)

## ✅ Bước 1: Tạo Tài Khoản SendGrid (2 phút)

### 1.1 Đăng Ký
1. Mở: **https://sendgrid.com**
2. Click **"Start for Free"** (góc trên phải)
3. Điền form:
   - **Email**: Email của bạn (ví dụ: youremail@gmail.com)
   - **Password**: Tạo password mới
   - **Confirm Password**: Nhập lại
   - **First Name**: Tên bạn
   - **Last Name**: Họ bạn
4. Click **"Create Account"**

### 1.2 Verify Email
1. Check hộp thư của bạn
2. Mở email từ SendGrid
3. Click **"Verify Email Address"**
4. Màn hình sẽ chuyển về SendGrid dashboard

---

## ✅ Bước 2: Verify Sender (2 phút)

### 2.1 Mở Sender Authentication
1. Trong SendGrid dashboard
2. Sidebar trái → Click **"Settings"** (bánh răng)
3. Click **"Sender Authentication"**

### 2.2 Verify Single Sender
1. Trong trang Sender Authentication
2. Tìm box **"Verify a Single Sender"**
3. Click **"Get Started"** hoặc **"Create New Sender"**

### 2.3 Điền Form
Điền thông tin (có thể dùng thông tin cá nhân):

**From:**
- **From Name**: `Aurora Ledger`
- **From Email Address**: Email của bạn (ví dụ: `youremail@gmail.com`)
- **Reply To**: Giống email trên
- **Company**: `Personal` hoặc `Aurora Ledger`

**Address:**
- **Address Line 1**: Địa chỉ bất kỳ (ví dụ: `123 Main St`)
- **City**: `Hanoi` (hoặc thành phố bạn)
- **State/Province**: `Hanoi`
- **Postal Code**: `100000` (bất kỳ)
- **Country**: Chọn **Vietnam** (hoặc quốc gia bạn)

**Nickname** (optional): `Aurora Ledger`

4. Tick: **"I have read and agree to the Terms of Service"**
5. Click **"Create"**

### 2.4 Verify Email Sender
1. Check hộp thư (email bạn vừa nhập)
2. Mở email từ SendGrid: **"Please Verify Your Single Sender"**
3. Click **"Verify Single Sender"**
4. ✅ Màn hình hiện **"Sender verified successfully!"**

---

## ✅ Bước 3: Tạo API Key (1 phút)

### 3.1 Mở API Keys
1. Sidebar trái → **"Settings"** → **"API Keys"**
2. Click **"Create API Key"** (nút xanh)

### 3.2 Configure API Key
**API Key Name**: `Aurora Ledger Production`

**API Key Permissions**: Chọn **"Restricted Access"**

Scroll xuống tìm **"Mail Send"**:
- Click vào **"Mail Send"**
- Chọn **"Full Access"** (màu xanh)
- Tất cả mục khác để **"No Access"**

Click **"Create & View"**

### 3.3 Copy API Key
1. Màn hình hiện API Key (rất dài, bắt đầu với `SG.`)
2. **COPY TOÀN BỘ** (click icon copy hoặc Ctrl+C)
3. ⚠️ **LƯU LẠI NGAY** vào Notepad - không xem lại được!

**Ví dụ API Key:**
```
SG.1234567890abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

---

## ✅ Bước 4: Thêm vào Render (1 phút)

### 4.1 Mở Render Dashboard
1. Vào: **https://dashboard.render.com**
2. Login nếu cần
3. Click vào service: **aurora-ledger-backend**

### 4.2 Thêm Environment Variables
1. Tab **"Environment"** (trên cùng)
2. Scroll xuống phần **"Environment Variables"**
3. Click **"Add Environment Variable"**

**Variable 1:**
- **Key**: `SENDGRID_API_KEY`
- **Value**: Paste API key vừa copy (bắt đầu với `SG.`)

Click **"Add"** hoặc **"Save"**

4. Click **"Add Environment Variable"** lần nữa

**Variable 2:**
- **Key**: `EMAIL_FROM`
- **Value**: Email bạn đã verify ở Bước 2 (ví dụ: `youremail@gmail.com`)

Click **"Add"** hoặc **"Save"**

### 4.3 Deploy
1. Sau khi thêm 2 biến
2. Click **"Save Changes"** (nếu có)
3. Render sẽ tự động **Deploy** lại (mất 2-3 phút)

---

## ✅ Bước 5: Test Email (1 phút)

### 5.1 Đợi Deploy Xong
Chờ **2-3 phút** để Render deploy

Kiểm tra: Logs tab sẽ hiện:
```
📧 Using SendGrid for email delivery
```

### 5.2 Test Forgot Password
1. Mở: **https://aurora-ledger.vercel.app/forgot-password**
2. Nhập email của bạn (đã đăng ký trong Aurora Ledger)
3. Click **"Send Reset Link"**
4. Đợi vài giây

### 5.3 Check Email
**Mở hộp thư** → Tìm email từ **"Aurora Ledger"**

**Subject:** `Password Reset Request - Aurora Ledger`

**Nội dung:**
- Design đẹp với logo Aurora Ledger
- Nút "Reset Your Password" màu xanh
- Link backup để copy
- Cảnh báo hết hạn sau 1 giờ

### 5.4 Reset Password
1. Click nút **"Reset Your Password"** trong email
2. Nhập password mới
3. Confirm password
4. Click "Reset Password"
5. ✅ Done! Login với password mới

---

## 🔍 Troubleshooting

### ❌ Email vẫn không nhận được

**Check 1: Verify Sender Email**
- Vào SendGrid → Settings → Sender Authentication
- Email phải có dấu tích xanh ✅ **"Verified"**
- Nếu chưa → Check inbox để verify

**Check 2: API Key đúng chưa**
- Vào Render → Environment tab
- `SENDGRID_API_KEY` phải bắt đầu với `SG.`
- Không có khoảng trắng thừa
- Nếu sai → Tạo API Key mới và update

**Check 3: EMAIL_FROM đúng chưa**
- Phải giống 100% với email đã verify
- Ví dụ: `youremail@gmail.com` (lowercase, không space)

**Check 4: Check SendGrid Dashboard**
- SendGrid → Activity → Email Activity
- Tìm email của bạn
- Xem status: Delivered, Bounced, hoặc Dropped?

**Check 5: Check Render Logs**
- Render → Logs tab
- Tìm dòng có "📧 Using SendGrid"
- Nếu không có → Env vars chưa được set
- Nếu có error → Copy error message

---

### ❌ Email vào Spam

**Giải pháp:**
1. Mở thư mục Spam
2. Tìm email từ Aurora Ledger
3. Click **"Not Spam"** hoặc **"Report not spam"**
4. Lần sau sẽ vào Inbox

---

### ❌ Error: "The from address does not match a verified Sender Identity"

**Nguyên nhân:** `EMAIL_FROM` không khớp với email đã verify

**Fix:**
1. Check SendGrid → Sender Authentication
2. Xem email nào đã verify (có dấu ✅)
3. Update Render env var `EMAIL_FROM` cho khớp CHÍNH XÁC

---

### ❌ Error: "Unauthorized"

**Nguyên nhân:** API Key sai hoặc hết hạn

**Fix:**
1. Tạo API Key mới trong SendGrid
2. Copy lại
3. Update `SENDGRID_API_KEY` trong Render
4. Redeploy

---

## ✅ Checklist Đầy Đủ

- [ ] Tạo tài khoản SendGrid
- [ ] Verify email tài khoản
- [ ] Verify Sender Email (có dấu tích xanh)
- [ ] Tạo API Key với Mail Send = Full Access
- [ ] Copy API Key (bắt đầu với SG.)
- [ ] Add `SENDGRID_API_KEY` vào Render
- [ ] Add `EMAIL_FROM` vào Render (email đã verify)
- [ ] Save Changes → Đợi deploy (2-3 phút)
- [ ] Test forgot password
- [ ] Check inbox → Email nhận được
- [ ] Click link → Reset password thành công

---

## 🎯 Expected Results

### Khi Setup Đúng:

**User request reset:**
```
https://aurora-ledger.vercel.app/forgot-password
→ Nhập email → Submit
→ "Email sent! Check your inbox"
```

**Render Logs:**
```
📧 Using SendGrid for email delivery
✅ Password reset email sent successfully
   To: user@example.com
   Message ID: <abc123@sendgrid.net>
   Response: 250 Ok: queued
```

**Email Inbox:**
```
From: Aurora Ledger <youremail@gmail.com>
Subject: Password Reset Request - Aurora Ledger
[Beautiful HTML email with reset button]
```

**Click Button:**
```
→ Opens https://aurora-ledger.vercel.app/reset-password?token=xxx
→ Enter new password
→ Password changed!
→ Login with new password ✅
```

---

## 💡 Alternative: Gmail App Password

Nếu SendGrid không work, dùng Gmail:

### Setup Gmail
1. Enable 2FA: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Add to Render:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop (16 chars, no spaces)
   ```

**Giới hạn:** Gmail = 500 emails/day (nhiều hơn SendGrid)

---

## 📞 Cần Giúp?

**Nếu làm theo tất cả mà vẫn không nhận email:**

1. Screenshot trang Sender Authentication (SendGrid)
2. Screenshot Environment variables (Render)
3. Copy logs khi test forgot password
4. Gửi cho developer để debug

---

## 🎉 Sau Khi Setup Xong

Email sẽ:
- ✅ Gửi tự động khi user quên mật khẩu
- ✅ Đẹp, chuyên nghiệp
- ✅ An toàn (token hết hạn sau 1h)
- ✅ Không cần admin can thiệp

**Free tier:** 100 emails/ngày = đủ cho hầu hết apps!

---

**Created:** October 27, 2025  
**Author:** Aurora Ledger Team  
**Time Required:** 5 minutes  
**Cost:** FREE (100 emails/day forever)

