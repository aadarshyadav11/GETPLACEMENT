import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');  // remove password field

        if(!user){
            return res.status(404).json({ error: "User not found"});
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({ error: "server error"});    
    }
};

export const updateUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({ error: "User not found"});
        }

        //update fields (unly if provided)
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            resume: updatedUser.resume,
            createdAt: updatedUser.createdAt,
        })
    }
    catch(error){
        res.status(500).json({ error: "Server error"});
    }
};