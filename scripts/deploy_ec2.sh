#!/bin/bash
# ================================================================
# AWS EC2 One-Command Automated Redeployment Script
# Data Engineer Preparation Suite
# ================================================================

set -e

echo "🚀 Starting AWS EC2 Automated Deployment Process..."

# 1. Pull Latest Changes from Git
echo "📥 Fetching latest code from GitHub..."
git pull origin main

# 2. Install / Update Node Modules
echo "📦 Installing npm dependencies..."
npm install

# 3. Build Production React Frontend
echo "🛠️ Building React Production Bundle..."
npm run build

# 4. Restart Express API Server with PM2
echo "🔄 Restarting Express Backend API on PM2..."
if pm2 list | grep -q "data-eng-api"; then
    pm2 restart data-eng-api
else
    pm2 start server/server.js --name "data-eng-api"
fi
pm2 save

# 5. Reload NGINX Web Server
echo "⚡ Reloading NGINX Web Server..."
sudo systemctl reload nginx

echo "✅ AWS EC2 Deployment Completed Successfully!"
echo "🌐 Your app is live!"
