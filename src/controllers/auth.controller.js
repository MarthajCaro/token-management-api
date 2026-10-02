const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const signToken = (payload, expiresIn = '5m') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// POST /api/auth/token - Client credentials grant.
// Intended for machine-to-machine consumers (Postman, other services), NOT for
// the browser: the client_secret must never be shipped to a frontend.
const createToken = (req, res) => {
  try {
    const { client_id, client_secret } = req.body;

    if (client_id == process.env.CLIENT_ID
        && client_secret == process.env.CLIENT_SECRET) {
        const payload = { client_id };

        const accesToken = signToken(payload);

        return res.json({ access_token: accesToken, token_type: "Bearer", expires_in: 300 });
    }

    res.status(401).json({ error: 'Invalid client credentials' });
  } catch (error) {
    console.error('Error creating the token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/auth/login - User login.
// The password is compared here on the server and is never returned.
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const payload = { user_id: user.id, email: user.email, role: user.role };
    const accesToken = signToken(payload);

    return res.json({
      access_token: accesToken,
      token_type: 'Bearer',
      expires_in: 300,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createToken, login };