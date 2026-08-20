import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Configure DNS fallback for MongoDB Atlas SRV record resolution on local ISP networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (dnsErr) {
  console.warn('[DNS CONFIG WARNING]', dnsErr.message);
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return true;

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('[MONGODB ERROR] MONGODB_URI is not defined in environment variables.');
    return false;
  }

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000 // 8 seconds timeout for initial cluster connection
    });

    isConnected = true;
    console.log(`[MONGODB ATLAS] ✅ Connected successfully to Cluster: ${conn.connection.host} / DB: ${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MONGODB ATLAS WARNING] Connection failed: ${error.message}`);
    console.warn('[MONGODB ATLAS] Server running with resilient fallback.');
    return false;
  }
}

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
