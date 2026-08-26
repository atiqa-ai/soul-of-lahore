Write-Host "=== Soul of Lahore - Server Starter ===" -ForegroundColor Yellow
Write-Host ""

# Get the actual network IP
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -eq "Wi-Fi" -and $_.PrefixOrigin -eq "Dhcp" }).IPAddress
if (-not $ip) {
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback|Virtual|Bluetooth" -and $_.PrefixOrigin -eq "Dhcp" } | Select-Object -First 1).IPAddress
}
if (-not $ip) {
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback" -and $_.IPAddress -notlike "169.*" -and $_.IPAddress -ne "127.0.0.1" } | Select-Object -First 1).IPAddress
}

Write-Host "Network IP: $ip" -ForegroundColor Green
Write-Host ""

# Kill any existing node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Build
Write-Host "Building..." -ForegroundColor Cyan
$env:NODE_OPTIONS="--max-old-space-size=4096"
npx next build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Start server
Write-Host "Starting server..." -ForegroundColor Cyan
$env:HOSTNAME="0.0.0.0"
$proc = Start-Process -PassThru -FilePath "powershell" -ArgumentList "-NoProfile -Command `"cd '$pwd'; `$env:NODE_OPTIONS='--max-old-space-size=4096'; `$env:HOSTNAME='0.0.0.0'; npx next start -p 3000`""
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "==================================" -ForegroundColor Yellow
Write-Host "  SERVER IS RUNNING" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Local:    http://localhost:3000" -ForegroundColor White
Write-Host "  Network:  http://${ip}:3000" -ForegroundColor White
Write-Host ""
Write-Host "  Open http://${ip}:3000 on any device" -ForegroundColor Cyan
Write-Host "  connected to the same Wi-Fi network." -ForegroundColor Cyan
Write-Host ""
Write-Host "  PID: $($proc.Id)" -ForegroundColor DarkGray
Write-Host "==================================" -ForegroundColor Yellow
