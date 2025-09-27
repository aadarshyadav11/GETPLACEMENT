import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import uploadRoutes from './routes/uploadRoutes.js'

// middleware
const app = express();
app.use(cors());
app.use(express.json());



// API routes
app.use("/api/upload", uploadRoutes);



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