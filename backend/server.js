require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const normalizePrefix = (value) => {
  if (value === undefined || value === null) return '/api';
  const trimmed = String(value).trim();
  if (trimmed === '' || trimmed === '/') return '';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
};

const apiPrefix = normalizePrefix(process.env.API_PREFIX);

// Routes
app.use(`${apiPrefix}/auth`, require('./routes/authRoutes'));
app.use(`${apiPrefix}/notes`, require('./routes/noteRoutes'));
app.use(`${apiPrefix}/bookmarks`, require('./routes/bookmarkRoutes'));

// Health check route
app.get(`${apiPrefix}/health`, (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
