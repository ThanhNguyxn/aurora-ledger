# 🚀 Hướng dẫn Deploy Aurora Ledger

## ✅ Code đã push lên GitHub

**Commit:** `feat: Add Recurring Transactions + Fix Dark Mode`
- 22 files changed
- 1353 insertions, 43 deletions

**Repository:** https://github.com/ThanhNguyxn/aurora-ledger

---

## 🌐 Deploy Frontend (Vercel)

### Option 1: Auto Deploy (Recommended)
Vercel sẽ tự động deploy khi có commit mới trên `main` branch.

1. **Check Vercel Dashboard:** https://vercel.com/dashboard
2. **Xem deployment status** - Sẽ thấy build đang chạy
3. **Wait ~2-3 phút** cho build hoàn thành
4. **Done!** Frontend tự động update

### Option 2: Manual Deploy
Nếu auto deploy không chạy:

```bash
cd frontend
vercel --prod
```

### Verify Frontend
- URL: `https://aurora-ledger.vercel.app`
- Test dark mode toggle
- Test recurring transactions page
- Check tất cả 10 ngôn ngữ

---

## 🔧 Deploy Backend (Render)

### Bước 1: Push code (✅ Done)
Code đã push lên GitHub → Render sẽ detect

### Bước 2: Database Migration

**QUAN TRỌNG:** Phải chạy migration cho recurring_transactions table!

#### Option A: Via Render Shell (Paid Plan)
```bash
cd backend
node scripts/migrate-recurring-transactions.js
```

#### Option B: Locally kết nối Production DB (Recommended cho Free Tier)

1. **Get database URL từ Render Dashboard:**
   - Vào Render Dashboard → Database
   - Copy **External Database URL**

2. **Chạy migration local:**
```bash
cd backend

# Set DATABASE_URL tạm thời
$env:DATABASE_URL="postgresql://user:pass@host/dbname"

# Run migration
node scripts/migrate-recurring-transactions.js
```

3. **Verify:**
```sql
-- Check table exists
SELECT * FROM recurring_transactions LIMIT 1;
```

### Bước 3: Update Environment Variables

Vào **Render Dashboard** → **Web Service** → **Environment**

Thêm (nếu chưa có):
```env
NODE_ENV=production
PROCESS_RECURRING_ON_STARTUP=false  # Optional, để false cho production
```

### Bước 4: Deploy

Render sẽ tự động deploy khi detect commit mới:

1. **Vào Render Dashboard** → Web Service
2. **Check deploy logs** - Sẽ thấy:
   - `Building...`
   - `Installing dependencies...`
   - `🚀 Server running on port 5000`
   - `⏰ Recurring transactions cron job scheduled (daily at 00:05)`
3. **Wait ~5-10 phút** cho build + deploy
4. **Verify:** Check logs có dòng cron job scheduled

### Verify Backend

Test API endpoints:

```bash
# Health check
curl https://your-backend.onrender.com/health

# Test recurring routes (need auth token)
curl https://your-backend.onrender.com/api/recurring \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎯 Post-Deployment Checklist

### Frontend ✅
- [ ] Dark mode toggle hoạt động
- [ ] Recurring transactions page hiển thị
- [ ] Tất cả 10 ngôn ngữ hoạt động
- [ ] UI đẹp trên mobile
- [ ] No console errors

### Backend ✅
- [ ] Database migration thành công
- [ ] `/api/recurring` routes hoạt động
- [ ] Cron job được scheduled (check logs)
- [ ] Health check returns OK
- [ ] No server errors

### Full Stack Test ✅
- [ ] Tạo recurring transaction từ UI
- [ ] Edit recurring transaction
- [ ] Toggle active/inactive
- [ ] Delete recurring transaction
- [ ] Check database có data

---

## 🔄 Testing Recurring Auto-Create

### Test ngay (không đợi 24h)

**Option 1: Manual trigger (Dev only)**
Thêm test endpoint vào `backend/routes/recurring.js`:

```javascript
// ONLY FOR TESTING - Remove in production
router.post('/test/process', async (req, res) => {
  try {
    const { processRecurringTransactions } = await import('../utils/recurring-processor.js');
    const result = await processRecurringTransactions();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Call endpoint:
```bash
curl -X POST https://your-backend.onrender.com/api/recurring/test/process \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Option 2: Wait 24 hours**
- Cron job chạy daily lúc 00:05 UTC
- Tạo recurring với `start_date = today`
- Check vào ngày mai lúc 00:10 UTC

**Option 3: Use UptimeRobot (Recommended)**
- Tạo monitor ping app mỗi 10 phút
- Giữ app không sleep
- Cron job sẽ chạy đúng giờ

---

## 🐛 Troubleshooting

### Frontend không update?
```bash
# Clear Vercel cache
vercel --prod --force
```

### Backend không deploy?
1. Check Render logs
2. Verify git push thành công
3. Manual redeploy từ Render dashboard

### Dark mode không hoạt động?
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Check Tailwind config có `darkMode: 'class'`

### Recurring không tạo transactions?
1. Check cron logs: `⏰ Running scheduled recurring transactions processor...`
2. Verify database có recurring_transactions table
3. Check `is_active = true` và `next_occurrence <= today`

### Migration errors?
```bash
# Rollback và chạy lại
# Xóa table nếu cần
DROP TABLE IF EXISTS recurring_transactions;

# Chạy lại migration
node scripts/migrate-recurring-transactions.js
```

---

## 📊 Monitoring

### Logs to Watch

**Backend (Render):**
```
🚀 Server running on port 5000
⏰ Recurring transactions cron job scheduled (daily at 00:05)
⏰ Running scheduled recurring transactions processor...
📊 Found X due recurring transactions
✅ Processed recurring #1, next: 2024-XX-XX
```

**Frontend (Browser Console):**
```
🎨 Theme toggled: light → dark
```

### Daily Checks
1. **00:10 UTC** - Check cron logs
2. **Weekly** - Verify recurring transactions tạo đúng
3. **Monthly** - Check database size

---

## 🎉 Success Criteria

### ✅ Deployment Success khi:

1. **Frontend:**
   - URL accessible
   - Dark mode toggle works
   - Recurring page loads
   - All languages work

2. **Backend:**
   - Health check OK
   - API endpoints respond
   - Cron job scheduled
   - Database connected

3. **Recurring Feature:**
   - Can CRUD recurring transactions
   - Toggle active/inactive works
   - Auto-create logic scheduled (check logs)

---

## 📞 Support

Nếu gặp vấn đề:
1. Check logs (Render + Vercel + Browser Console)
2. Verify environment variables
3. Test API endpoints manually
4. Check database connection

---

## 🚀 Ready to Go!

Bạn đã sẵn sàng deploy! Commands tóm tắt:

```bash
# 1. Code đã push ✅
git push origin main

# 2. Vercel tự động deploy ✅
# Hoặc: vercel --prod

# 3. Chạy migration (nếu chưa)
cd backend
node scripts/migrate-recurring-transactions.js

# 4. Check deployments
# Vercel: https://vercel.com/dashboard
# Render: https://dashboard.render.com

# Done! 🎉
```

**Thời gian deploy:** ~5-10 phút
**Downtime:** ~0 (zero downtime deployment)

Enjoy your new features! 🎊

