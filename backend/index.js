import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
