# Script Push Code Lên GitHub
# Chạy file này trong PowerShell

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  PUSH CODE LÊN GITHUB" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Git
Write-Host "Kiểm tra Git..." -ForegroundColor Yellow
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCheck) {
    Write-Host "❌ Lỗi: Chưa cài Git. Download tại: https://git-scm.com" -ForegroundColor Red
    exit
}
Write-Host "✅ Git đã cài đặt" -ForegroundColor Green
Write-Host ""

# Lấy username GitHub từ user
Write-Host "Nhập username GitHub của bạn:" -ForegroundColor Yellow
$username = Read-Host "Username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Bạn phải nhập username!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Đang cấu hình repository..." -ForegroundColor Yellow

# Xóa remote cũ nếu có
git remote remove origin 2>$null

# Thêm remote mới
$repoUrl = "https://github.com/$username/aurora-ledger.git"
git remote add origin $repoUrl

Write-Host "✅ Đã kết nối với: $repoUrl" -ForegroundColor Green
Write-Host ""

Write-Host "Đang push code lên GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  LƯU Ý:" -ForegroundColor Yellow
Write-Host "Nếu Git hỏi password, KHÔNG dùng password GitHub thường!" -ForegroundColor Yellow
Write-Host "Bạn phải dùng Personal Access Token." -ForegroundColor Yellow
Write-Host ""
Write-Host "Cách tạo Personal Access Token:" -ForegroundColor Cyan
Write-Host "1. Vào: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Click 'Generate new token' → 'Generate new token (classic)'" -ForegroundColor White
Write-Host "3. Chọn 'repo' (tick tất cả)" -ForegroundColor White
Write-Host "4. Click 'Generate token'" -ForegroundColor White
Write-Host "5. Copy token và dùng làm password" -ForegroundColor White
Write-Host ""
Write-Host "Nhấn Enter để tiếp tục..." -ForegroundColor Cyan
Read-Host

# Push code
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Green
    Write-Host "  ✅ PUSH THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Xem code tại:" -ForegroundColor Cyan
    Write-Host "https://github.com/$username/aurora-ledger" -ForegroundColor White
    Write-Host ""
    Write-Host "Bước tiếp theo:" -ForegroundColor Yellow
    Write-Host "1. Mở file: BAT-DAU-NHANH.md" -ForegroundColor White
    Write-Host "2. Làm theo BƯỚC 4 và BƯỚC 5 để deploy lên web" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Red
    Write-Host "  ❌ PUSH THẤT BẠI" -ForegroundColor Red
    Write-Host "======================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Nguyên nhân có thể:" -ForegroundColor Yellow
    Write-Host "1. Chưa tạo repository trên GitHub" -ForegroundColor White
    Write-Host "2. Sai username" -ForegroundColor White
    Write-Host "3. Chưa đăng nhập hoặc sai token" -ForegroundColor White
    Write-Host ""
    Write-Host "Giải pháp:" -ForegroundColor Cyan
    Write-Host "1. Tạo repository mới: https://github.com/new" -ForegroundColor White
    Write-Host "   - Tên: aurora-ledger" -ForegroundColor White
    Write-Host "   - Chọn: Public" -ForegroundColor White
    Write-Host "   - KHÔNG tick gì cả" -ForegroundColor White
    Write-Host "2. Chạy lại script này" -ForegroundColor White
    Write-Host ""
}

Write-Host "Nhấn Enter để đóng..." -ForegroundColor Gray
Read-Host

