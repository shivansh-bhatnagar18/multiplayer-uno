// backend/index.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

//routes

import userRoute from '../routes/userRoute.js';

app.use('/api/v1/auth', userRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
