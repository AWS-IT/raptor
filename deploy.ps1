# deploy.ps1 — Deploy script for webraptor (Next.js)

$SERVER = "89.108.83.13"
$USER = "root"
$REMOTE_DIR = "/var/www/webraptor"

Write-Host "=== Deploying webraptor to $SERVER ===" -ForegroundColor Green

# Создаём папку на сервере
ssh ${USER}@${SERVER} "mkdir -p $REMOTE_DIR" | Out-Null

Write-Host ">>> Uploading files..." -ForegroundColor Yellow

# Загружаем всё кроме ненужного
scp -r app components data hooks public types *.config.* tsconfig.json package.json package-lock.json .env root@${SERVER}:${REMOTE_DIR}/ 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "Upload completed" -ForegroundColor Green
} else {
    Write-Host "Upload had some warnings (normal)" -ForegroundColor Yellow
}

Write-Host ">>> Installing dependencies, building and restarting..." -ForegroundColor Yellow

ssh ${USER}@${SERVER} "
    cd $REMOTE_DIR &&
    npm ci &&
    npm run build &&
    pm2 restart webraptor || pm2 start npm --name webraptor -- start &&
    pm2 save
"

Write-Host "=== Deploy complete! ===" -ForegroundColor Green
Write-Host "Site: https://webraptor.ru" -ForegroundColor Cyan