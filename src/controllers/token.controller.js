const Token = require('../models/token.model');

// POST - Create a new token
const createToken = async (req, res) => {
  try {
    const { value, creation_date, expiration_date, user_id, service_id } = req.body;

    if (!value || !creation_date || !expiration_date || !user_id || !service_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newToken = await Token.create({
      value_token: value,
      creation_date,
      expiration_date,
      user_id,
      service_id
    });

    res.status(201).json(newToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all tokens
const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.findAll();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tokens", error });
  }
};

// GET a token by ID
const getTokenById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await Token.findByPk(id);

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.json(token);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving token", error });
  }
};

// Refresh token by ID
const updateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Token.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedToken = await Token.findByPk(id);
      return res.json(updatedToken);
    }
    res.status(404).json({ message: "Token not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating token", error });
  }
};

// Delete token by ID
const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Token.destroy({
      where: { id }
    });
if (deleted) {
      return res.status(204).send(); // No Content
    }

    res.status(404).json({ message: "Token not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting token", error });
  }
};

module.exports = { 
  createToken,
  getAllTokens,
  getTokenById,
  updateToken,
  deleteToken
};
