import express from 'express';
import { isMongoConnected } from '../config/db.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected() ? 'MongoDB_Atlas' : 'Disconnected',
    mongoConnected: isMongoConnected(),
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString()
  });
});

export default router;
