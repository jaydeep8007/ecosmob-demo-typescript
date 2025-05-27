import express from "express"
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';



import connectDB from './db/db';


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// Default Route


app.get('/', (req: Request, res: Response) => {
  res.send("demo typescript app check");
});


export default app;