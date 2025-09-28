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
        resume: {
            type: String   // file path from uploads folder 
        },
    }, 
    {timestamps: true}

);

const User = mongoose.model("User", userSchema);

export default User; 