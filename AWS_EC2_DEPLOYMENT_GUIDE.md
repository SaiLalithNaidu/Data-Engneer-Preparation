# ☁️ AWS EC2 Deployment Guide — Target IP: 52.228.19.191

This guide details the deployment of the **Data Engineer Preparation Suite** connected to your active AWS EC2 instance at **`52.228.19.191`** running on **Port 5100**.

---

## 📌 1. Target AWS Configuration Details

- **AWS EC2 Public IP**: `52.228.19.191`
- **Backend API Port**: `5100`
- **Full API Base URL**: `http://52.228.19.191:5100/api`
- **MongoDB Atlas URI**: `mongodb+srv://konasailalith20_db_user:BNl64Xy5tDhw7vmc@dataengneerdb.ioqulmj.mongodb.net/data_engineer_prep?retryWrites=true&w=majority`

---

## 🔒 2. Mandatory AWS Security Group Inbound Rule

To allow frontend apps, mobile clients, and browsers to reach your Express API on Port 5100:

1. Open **AWS EC2 Console** -> **Instances** -> Select your instance (`52.228.19.191`).
2. Click **Security** tab -> Click your **Security Group ID**.
3. Click **Edit Inbound Rules** -> Add Rule:
   - **Type**: `Custom TCP`
   - **Port Range**: `5100`
   - **Source**: `0.0.0.0/0` (Anywhere)
4. Click **Save Rules**.

---

## ⚙️ 3. Configured Environment Files (`.env`)

### Local & AWS Frontend `.env` (`d:\Data Engneer Preparation\.env`):
```env
PORT=5100
MONGODB_URI=mongodb+srv://konasailalith20_db_user:BNl64Xy5tDhw7vmc@dataengneerdb.ioqulmj.mongodb.net/data_engineer_prep?retryWrites=true&w=majority
VITE_API_BASE_URL=http://52.228.19.191:5100/api
JWT_SECRET=de_prep_super_secret_jwt_key_2026_aws
```

---

## 🚀 4. EC2 Execution Commands

On your AWS EC2 instance (`52.228.19.191`):

```bash
# 1. Pull Latest Changes from GitHub
cd /var/www/Data-Engneer-Preparation
git pull origin main

# 2. Install NPM dependencies (including jsonwebtoken & bcryptjs)
npm install

# 3. Start Node.js Express API on Port 5100 with PM2
pm2 start server/server.js --name "data-eng-api"
pm2 save

# 4. Check server logs & status
pm2 status
pm2 logs data-eng-api
```

---

## 🧪 5. Active API Routes on `http://52.228.19.191:5100`

| Method | Route | Description | Auth Required |
|---|---|---|---|
| **`GET`** | `http://52.228.19.191:5100/api/health` | Health Check & Atlas MongoDB status | ❌ No |
| **`POST`** | `http://52.228.19.191:5100/api/auth/signup` | User Registration & JWT generation | ❌ No |
| **`POST`** | `http://52.228.19.191:5100/api/auth/signin` | User Login & Password Validation | ❌ No |
| **`GET`** | `http://52.228.19.191:5100/api/auth/me` | Fetch authenticated user profile | ✅ Yes (`Bearer token`) |
| **`GET`** | `http://52.228.19.191:5100/api/user/progress` | Fetch mastered question IDs & mock test results | ✅ Yes (`Bearer token`) |
| **`POST`** | `http://52.228.19.191:5100/api/user/progress` | Save mastered question IDs | ✅ Yes (`Bearer token`) |
| **`GET`** | `http://52.228.19.191:5100/api/user/bookmarks` | Fetch user bookmarked question IDs | ✅ Yes (`Bearer token`) |
| **`POST`** | `http://52.228.19.191:5100/api/user/bookmarks` | Save user bookmarked question IDs | ✅ Yes (`Bearer token`) |
| **`POST`** | `http://52.228.19.191:5100/api/user/mock-result` | Save mock quiz topic score | ✅ Yes (`Bearer token`) |
