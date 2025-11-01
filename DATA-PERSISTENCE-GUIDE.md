# 🔍 Hướng dẫn xử lý vấn đề dữ liệu bị mất

## ⚠️ Vấn đề: Dữ liệu bị mất sau 1 ngày

Có 3 nguyên nhân chính:

---

## 1. 💤 **Backend Free Tier Sleep (Render)**

### Vấn đề:
- Render free tier tự động **sleep sau 15 phút** không activity
- Khi sleep, không xử lý request → User bị logout
- Lần đầu access sau khi sleep → Mất 30-60 giây để wake up

### Giải pháp:

**A. Keep-alive Script (Miễn phí):**
```javascript
// Tạo file: backend/keep-alive.js
import https from 'https';

const BACKEND_URL = 'https://aurora-ledger-backend.onrender.com/health';

function pingServer() {
  https.get(BACKEND_URL, (res) => {
    console.log(`✅ Keep-alive ping: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('❌ Keep-alive error:', err.message);
  });
}

// Ping mỗi 14 phút (trước khi sleep)
setInterval(pingServer, 14 * 60 * 1000);
pingServer(); // Ping ngay
```

**B. Upgrade to Paid Plan:**
- Render Starter: $7/month - Không sleep
- Railway: $5/month credit
- Fly.io: $5/month

---

## 2. 🗄️ **Database Pause (Neon Free Tier)**

### Vấn đề:
- Neon free tier **pause database** sau 7 ngày không activity
- Data không mất, nhưng cần wake up

### Giải pháp:

**A. Check Neon Dashboard:**
1. Vào https://console.neon.tech
2. Xem project status
3. Nếu "Suspended" → Click "Resume"

**B. Prevent Auto-pause:**
- Tạo scheduled query (ping database)
- Hoặc upgrade to Paid ($19/month - unlimited)

**C. Alternative:**
```bash
# Chuyển sang Supabase (free tier tốt hơn)
# Hoặc ElephantSQL (không pause)
```

---

## 3. 🔐 **JWT Token Expired**

### Vấn đề:
- JWT token hết hạn sau **7 ngày**
- User bị logout → Phải login lại
- Data vẫn còn trong database

### Hiện tại:
```env
JWT_EXPIRES_IN=7d
```

### Giải pháp:

**A. Tăng thời hạn token:**
```env
# backend/.env
JWT_EXPIRES_IN=30d  # 30 ngày
# hoặc
JWT_EXPIRES_IN=365d # 1 năm
```

**B. Implement Refresh Token:**
- Token chính: 1 ngày
- Refresh token: 30 ngày
- Auto-refresh khi gần hết hạn

**C. Remember me với longer token:**
```javascript
// Trong Login.jsx, nếu remember me checked:
const expiresIn = rememberMe ? '365d' : '7d';
```

---

## 4. 📊 **Data có thể bị mất thật (Shared Demo Account)**

### Vấn đề:
- Nếu dùng account demo chung → Nhiều người cùng dùng
- Người khác có thể xóa/sửa data
- Seeding script có thể reset data

### Giải pháp:
**Tạo account riêng:**
1. Register với email riêng của bạn
2. Không dùng demo@auroraledger.com
3. Mỗi user có data riêng biệt

---

## 🔧 Quick Fixes

### Fix 1: Prevent Backend Sleep
```bash
# Dùng UptimeRobot (FREE)
# 1. Vào https://uptimerobot.com
# 2. Add monitor:
#    - URL: https://aurora-ledger-backend.onrender.com/health
#    - Interval: 5 minutes
# 3. Sẽ ping backend mỗi 5 phút → Không bao giờ sleep
```

### Fix 2: Check Database
```bash
# SSH vào Render
cd backend
node test-db.js

# Nếu error → Database issue
# Nếu OK → Backend/Auth issue
```

### Fix 3: Extend JWT
```env
# backend/.env (production)
JWT_EXPIRES_IN=90d
```

### Fix 4: Check Logs
```bash
# Render Dashboard → Logs
# Xem error nào xảy ra khi user quay lại
```

---

## 🎯 Recommended Solution

**Setup UptimeRobot (5 phút, MIỄN PHÍ):**

1. **Đăng ký:** https://uptimerobot.com (Free forever)
2. **Add Monitor:**
   - Type: HTTP(s)
   - URL: `https://aurora-ledger-backend.onrender.com/health`
   - Name: Aurora Ledger Backend
   - Monitoring Interval: 5 minutes
3. **Done!** Backend sẽ không bao giờ sleep

**Kết quả:**
- ✅ Backend luôn sẵn sàng
- ✅ User không bị logout
- ✅ Data không bị mất
- ✅ Response time < 1s
- ✅ Hoàn toàn miễn phí

---

## 📝 Checklist Troubleshooting

- [ ] Check Neon dashboard - Database có đang active không?
- [ ] Check Render logs - Backend có errors không?
- [ ] Test login lại - Token có còn valid không?
- [ ] Tạo transaction mới - Có lưu được không?
- [ ] Đợi 1 ngày - Data còn không?
- [ ] Check user_id - Có đúng account không?

---

## 💡 Long-term Solutions

**Option 1: Free (Recommended)**
- ✅ UptimeRobot để keep backend alive
- ✅ Neon free tier đủ dùng
- ✅ Tăng JWT_EXPIRES_IN lên 30-90 ngày

**Option 2: Paid (~$10/month)**
- Render Starter ($7/month)
- Neon Pro ($19/month) hoặc
- Railway ($5 credit/month)
- Supabase Free tier (better limits)

---

## 🆘 Nếu data thực sự bị mất:

**Backup Strategy:**
```bash
# Export data định kỳ
# Frontend: Reports → Export CSV
# Backend: pg_dump daily

# Cron job (nếu dùng paid tier):
0 0 * * * pg_dump $DATABASE_URL > backup.sql
```

---

**Khuyến nghị:** Setup UptimeRobot ngay để tránh backend sleep! 🚀

