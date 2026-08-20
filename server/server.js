import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5100;

// Connect to MongoDB Atlas
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());

// API Routes Mounting
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 404 & Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Start Express API Server
app.listen(PORT, () => {
  console.log(`🚀 Data Engineer Prep Backend Server running on Port ${PORT}`);
  console.log(`📡 AWS Base API Endpoint: http://52.228.19.191:${PORT}/api`);
});

export default app;
