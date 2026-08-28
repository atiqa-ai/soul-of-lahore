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

# If this app is already running on port 3000, stop only that instance.
# (Avoids killing unrelated node processes on the machine.)
$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Where-Object { $_.OwningProcess } | Select-Object -First 1
if ($listener) {
    $owner = Get-Process -Id $listener.OwningProcess -ErrorAction SilentlyContinue
    if ($owner) {
        Write-Host "Port 3000 is already serving this app (PID $($owner.Id)) - stopping it first..." -ForegroundColor Yellow
        Stop-Process -Id $owner.Id -Force
        Start-Sleep -Seconds 2
    }
}

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
$inner = "cd '$pwd'; `$env:NODE_OPTIONS='--max-old-space-size=4096'; `$env:HOSTNAME='0.0.0.0'; npx next start -p 3000"
$proc = Start-Process -PassThru -FilePath "powershell.exe" -ArgumentList "-NoProfile","-Command",$inner
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