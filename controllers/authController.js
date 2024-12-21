import { verifyToken } from "../config/googleAuth.js";  // Ensure this is the correct path
import User from "../models/userModel.js";  // Ensure you have the User model

export const googleLogin = async (req, res) => {
  const { token } = req.body;

  console.log("Received token ID:", token); // Debug: check if the tokenId is received

  if (!token) {
    return res.status(400).json({ message: 'Token ID is required' });
  }

  try {
    // Step 1: Verify the token and get the payload
    const payload = await verifyToken(token);  // verifyToken should return payload or throw error

    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log("Payload from Google:", payload); // Debug: log the payload

    // Step 2: Check if the user already exists
    let user = await User.findOne({ googleId: payload.sub });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        token: token,  // Optionally store the token for future use
      });

      await user.save();  // Save the new user in the database
      console.log("User created:", user);  // Debug: check if user is created
    }

    // Step 3: Return success response with the user data
    res.json({ message: 'User authenticated successfully', user });
  } catch (error) {
    // Step 4: Error handling
    console.error("Error during Google login:", error);  // Debug: log any errors
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
