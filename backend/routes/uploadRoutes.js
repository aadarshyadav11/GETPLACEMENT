import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Route: POST  /api/upload/resume
router.post('/resume', upload.single("resume"), (req, res) => {
    res.json({
        message: "Resume uploaded successfully...",
        file: req.file
    });
}); 



export default router;