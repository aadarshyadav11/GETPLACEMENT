import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email :{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,   
        },
        resume: {
            type: String,   // file path from uploads folder 
        },
        skills: {
            type: String,
        },
        cgpa:{
            type: Number,
            min: 0,
            max: 10
        },
        achievements:{
            type: String,
        },
        careerGoals:{
            type: String,
        },
        placementReadinessScore:{
            type:Number,
            default: 0,
        }
    }, 
    {timestamps: true}

);

const User = mongoose.model("User", userSchema);

export default User; 