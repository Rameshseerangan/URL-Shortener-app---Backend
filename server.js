// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { verifyToken } from './config/googleAuth.js'; // Import the verifyToken function
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Default route
app.get('/', (req, res) => res.send('Hello from Backend for URL Shortener App'));

// Example usage of verifyToken function in a route
app.post('/api/verify-token', async (req, res) => {
  const { tokenId } = req.body;
  
  if (!tokenId) {
    return res.status(400).json({ message: 'Token is required' });
  }

  const payload = await verifyToken(tokenId);

  if (!payload) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Successfully verified token
  res.json({ message: 'Token is valid', user: payload });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
