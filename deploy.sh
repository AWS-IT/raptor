#!/bin/bash

# Конфигурация сервера
SERVER_IP="89.108.98.89"
SERVER_USER="root"
APP_DIR="/var/www/webraptor"

echo "=== Развёртывание webraptor на сервере $SERVER_IP ==="

# 1. Обновление системы и установка Node.js
echo ">>> Обновление системы и установка Node.js..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx
npm install -g pm2
ENDSSH

# 2. Создание директории проекта
echo ">>> Создание директории проекта..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $APP_DIR"

# 3. Копирование файлов проекта (без node_modules)
echo ">>> Копирование файлов проекта..."
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
    -e ssh ./ $SERVER_USER@$SERVER_IP:$APP_DIR/

# 4. Установка зависимостей и сборка
echo ">>> Установка зависимостей и сборка..."
ssh $SERVER_USER@$SERVER_IP << ENDSSH
cd $APP_DIR
npm install
npm run build
ENDSSH

# 5. Настройка PM2
echo ">>> Настройка PM2..."
ssh $SERVER_USER@$SERVER_IP << ENDSSH
cd $APP_DIR
pm2 delete webraptor 2>/dev/null || true
pm2 start npm --name "webraptor" -- start
pm2 save
pm2 startup
ENDSSH

# 6. Настройка Nginx
echo ">>> Настройка Nginx..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cat > /etc/nginx/sites-available/webraptor << 'EOF'
server {
    listen 80;
    server_name 89.108.98.89;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/webraptor /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
systemctl enable nginx
ENDSSH

echo "=== Развёртывание завершено! ==="
echo "Сайт доступен по адресу: http://$SERVER_IP"
