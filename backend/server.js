const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();
connectDB();

// CORS configuration - allow Vercel preview deployments
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://task-m-qbw6.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if origin matches allowed origins or is a Vercel preview deployment
        if (allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.includes('vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Root welcome endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'TaskFlow API is running!',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            tasks: '/api/tasks'
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
