import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { loggerMiddleware, errorHandlerMiddleware } from './middleware/index.js';

const app = express();

// Register logger middleware
app.use(loggerMiddleware);

// Define app routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Register error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
