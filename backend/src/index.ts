// backend/index.js
<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
=======
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config();
>>>>>>> upstream/master

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
<<<<<<< HEAD
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, {
=======
app.use(json());

<<<<<<< HEAD:backend/src/index.js
connect(process.env.MONGO_URI, {
>>>>>>> upstream/master
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
=======
connect(process.env.MONGO_URI!)
>>>>>>> upstream/master:backend/src/index.ts
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
