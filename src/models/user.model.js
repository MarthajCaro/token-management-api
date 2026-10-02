const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
 
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {    
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor', 'reader'),
    allowNull: false
  }
}, 
{
  tableName: 'users',
  timestamps: false,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    // Only for the login flow, where the password must be read to compare it.
    withPassword: { attributes: { include: ['password'] } }
  }
});
 
module.exports = User;