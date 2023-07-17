import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { dbConnection } from './database/config.js';

// Create the express server
const app = express();

// Configuration of CORS
app.use( cors() );

// Read and parse of the body
app.use( express.json() );

// Database
dbConnection();

// Public Directory
app.use( express.static('public') );

// Routes
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import billRouter from './routes/bills.js';

app.use( '/api/users', usersRouter);
app.use( '/api/login', authRouter);
app.use('/api/bills', billRouter);

app.listen( process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT );
});