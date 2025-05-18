import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModel } from './db';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load .env variables
// d.ts for the declation file
const app = express();
app.use(express.json());
// Routes

app.post('/api/v1/signup', async (req, res) => {
    // Zod validation
    const username = req.body.username;
    const password = req.body.password;
    await UserModel.create({
        username: username,
        password: password
    })
    res.json({
        message:"User signed up"
    })
})

app.post('/api/v1/signin', (req, res) => {
  const username=req.body
})

app.post('api/v1/content', (req, res) => {

})


app.post('/api/v1/verify', (req, res) => {

})


