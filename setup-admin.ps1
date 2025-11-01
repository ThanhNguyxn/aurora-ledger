# Setup Admin Script
$BACKEND_URL = "https://aurora-ledger-backend.onrender.com"

$body = @{
    email = "thanhnguyentuan2007@gmail.com"
    secret = "aurora-setup-2024"
} | ConvertTo-Json

Write-Host " Đang gửi request đến $BACKEND_URL..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/setup/init-admin" -Method POST -Body $body -ContentType "application/json"
    Write-Host " THÀNH CÔNG!" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 5)
    Write-Host "`n Bước tiếp theo:" -ForegroundColor Cyan
    Write-Host "1. Logout khỏi web app" -ForegroundColor White
    Write-Host "2. Login lại với email: thanhnguyentuan2007@gmail.com" -ForegroundColor White
    Write-Host "3. Bạn sẽ thấy menu Admin!" -ForegroundColor White
} catch {
    Write-Host " LỖI: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n Kiểm tra:" -ForegroundColor Yellow
    Write-Host "- Backend URL có đúng không?" -ForegroundColor White
    Write-Host "- Backend đã deploy xong chưa?" -ForegroundColor White
    Write-Host "- Email đã đăng ký trên web chưa?" -ForegroundColor White
}
