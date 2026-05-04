const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (req, res) => {
  try {
    const { client_id, client_secret } = req.body;

    if(client_id == process.env.CLIENT_ID 
        && client_secret == process.env.CLIENT_SECRET) {
        const payload = { client_id };
        const secretKey = process.env.JWT_SECRET;
        
        const options = {
            expiresIn: '5m'
        };

        const accesToken = jwt.sign(payload, secretKey, options);

        return res.json({ access_token: accesToken, token_type: "Bearer", expires_in: 300 });
    }

    res.status(404).json({ message: "Client not found" });
  } catch (error) {
    console.error('Error creating the service:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createToken };