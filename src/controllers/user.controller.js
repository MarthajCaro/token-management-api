const User = require('../models/user.model');
const { Op, Sequelize } = require('sequelize');

const createUser = async (req, res) => {
  try {
  
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'name, email, password y role are required' });
    }

    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);

  } catch (error) { 
    console.error('Error to create user: ', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'The email is already registered' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUsers = async (req, res) => {
  try {
    const { name, role } = req.query;
    const filters = {};

    // Filter by name or email
    if (name) {
      const search = name.toLowerCase(); 
      filters[Op.or] = [
        
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          { [Op.like]: `%${search}%` }
        ),
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('email')),
          { [Op.like]: `%${search}%` }
        )
      ];
    }

    // Filter by role if specified
    if (role) filters.role = role;

    const users = await User.findAll({ where: filters });
    return res.status(200).json(users);

  } catch (error) {
    console.error('Error in getUsers:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!name && !email && !role) {
      return res.status(400).json({ error: 'At least one field (name, email, role) is required' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update only the fields sent
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.status(200).json(user);

  } catch (error) {
    console.error('Error to update user:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'The email is already registered' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Search for user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error to delete user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };





