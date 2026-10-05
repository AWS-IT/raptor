#!/bin/bash

SERVER="89.108.83.13"
USER="root"
REMOTE_DIR="/var/www/webraptor"

echo "=== Deploying webraptor to $SERVER ==="

# Загрузка файлов (rsync)
echo ">>> Uploading files..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'deploy.sh' \
  ./ "$USER@$SERVER:$REMOTE_DIR/"

echo ">>> Building on server..."
ssh "$USER@$SERVER" "
  cd $REMOTE_DIR &&
  npm ci --production=false &&
  npm run build &&
  pm2 restart webraptor || pm2 start npm --name webraptor -- start &&
  pm2 save
"

echo "=== Deploy complete! ==="
echo "Site: https://webraptor.ru"