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
        user.skills = req.body.skills || user.skills;
        user.cgpa = req.body.cgpa || user.cgpa;
        user.achievements = req.body.achievements || user.achievements;
        user.careerGoals = req.body.careerGoals || user.careerGoals;

        
        const updatedUser = await user.save();
        console.log(updatedUser);
        res.json(updatedUser);
    }
    catch(error){
        res.status(500).json({ error: error.message});
    }
};