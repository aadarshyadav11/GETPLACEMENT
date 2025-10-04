import express from 'express';
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

//looged-in user profile
router.get("/me", protect, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch(error){
        res.status(500).json({ error : error.message});
    }
})

//Protected route to fetch user profile
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);


export default router;
