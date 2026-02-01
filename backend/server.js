require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Basic middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB before handling requests
let dbConnected = false;

async function ensureDB() {
    if (!dbConnected) {
        await connectDB();
        dbConnected = true;
    }
}

// Middleware to ensure DB is connected before any API route
app.use('/api', async (req, res, next) => {
    try {
        await ensureDB();
        next();
    } catch (err) {
        res.status(503).json({
            success: false,
            message: 'Database connection failed'
        });
    }
});

// Test route - NO DATABASE
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        env: {
            node: process.env.NODE_ENV,
            hasMongoUri: !!process.env.MONGODB_URI
        },
        dbConnected
    });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message
    });
});

module.exports = app;