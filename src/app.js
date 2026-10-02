const express = require('express');
const cors = require('cors');
const {sequelize} = require('./config/db');
require('dotenv').config();
const authTokenRoute=require('./routes/auth.routes');
const usersRouter=require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const tokenRoutes = require('./routes/token.routes');
const app = express();

// CORS: accepts a comma-separated list of origins in CORS_ORIGIN.
// Use "*" to allow any origin (useful for local development).
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes('*') ? true : allowedOrigins
  })
);
const PORT = process.env.PORT || 3000;

const setupSwagger = require('./swagger');

app.use(express.json());

// Health check used by Render to know when the service is up.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/auth', authTokenRoute); 
app.use('/api/users', usersRouter); 
app.use('/api/services', serviceRoutes);
app.use('/api/tokens', tokenRoutes);

setupSwagger(app);

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
        return sequelize.sync(); // synchronize models
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🚀 swagger running on http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database:', err);
  });


