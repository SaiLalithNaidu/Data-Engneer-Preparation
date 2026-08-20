import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/data_engineer_prep_db';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return true;

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000 // Fast fail to fallback if local mongod is offline
    });

    isConnected = true;
    console.log(`[MONGODB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MONGODB] MongoDB Connection Warning (${MONGODB_URI}): ${error.message}`);
    console.warn(`[MONGODB] Operating in hybrid local mode with atomic fallback store.`);
    return false;
  }
}

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
