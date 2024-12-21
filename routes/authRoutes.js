import express from 'express';
import { googleLogin } from '../controllers/authController.js'; // Import the googleLogin controller

const router = express.Router();

// Google OAuth Login Route
router.post('/google', googleLogin);

export default router;
