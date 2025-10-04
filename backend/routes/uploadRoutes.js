import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));  
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

// file filter (only PDFs/DOCs)
const fileFilter = (req,file,cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    ];

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(new Error("Only PDF and DOCs files are allowed!"));
    }
};

const upload = multer({storage, fileFilter});

// Protected Route: POST  /api/upload/resume
router.post('/resume', protect, upload.single("resume"), async (req, res) => {
    try {
        // by using this we upload resume without login
       /* const { name, email } = req.body;

        if(!name || !email){
            return res.status(400).json({error : "Name and Email are required!"});
        }

        let user = await User.findOne({email});

        if(user){
            user.resume = req.file.path;
            await user.save();
        }
        else{
            user = await User.create({
                name,
                email,
                resume: req.file.path,
            });
        }

    res.json({
        message: "Resume uploaded successfully & user saved...",
        user,
    });
    */


    if(!req.file){
        return res.status(400).json({ error : "No file uploaded"});
    }

    // save relative path of OS path
    req.user.resume = `/uploads/${req.file.filename}`;
    await req.user.save();

    res.json({
        message: "Resume Uploaded and linked to user",
        user: req.user,
    });

} catch(error){
    res.status(500).json({error: error.message });
}

}); 


export default router;