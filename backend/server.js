import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/database.js';

connectDB();

// importing routes
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


// middleware
const app = express();
app.use(cors());
app.use(express.json());



// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);



// serve uploaded files
app.use("/uploads", express.static("uploads"));




app.get('/api/health', (req,res) => {
    res.json({ok:true, env: process.env.NODE_ENV || 'dev'});
});

app.get('/', (req,res) => {
    res.json({greet : "Welcome Guys! How are you all ?"});
});


const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log(`Server is running on the http://localhost:${PORT}`);
});