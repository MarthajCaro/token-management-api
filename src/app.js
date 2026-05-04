const express = require('express');
const cors = require('cors');
const {sequelize} = require('./config/db');
require('dotenv').config();
const authTokenRoute=require('./routes/auth.routes');
const usersRouter=require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const tokenRoutes = require('./routes/token.routes');
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
const PORT = 3000;

const setupSwagger = require('./swagger');

app.use(express.json());

app.use('/api/auth/token', authTokenRoute); 
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


