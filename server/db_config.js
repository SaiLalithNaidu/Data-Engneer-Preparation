import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration
dotenv.config({ path: path.join(__dirname, '../.env') });

export const DB_CONFIG = {
  port: process.env.PORT || 5000,
  dbType: process.env.DB_TYPE || 'sqlite',
  host: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'data_engineer_prep_db',
  jwtSecret: process.env.JWT_SECRET || 'de_prep_super_secret_jwt_key_2026',
  filePath: process.env.DB_FILE_PATH || './server/data_store.json'
};

console.log(`[CONFIG] Database settings loaded: Type=${DB_CONFIG.dbType}, Host=${DB_CONFIG.host}, Port=${DB_CONFIG.port}`);
