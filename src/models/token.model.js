const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value_token: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'value_token',
    get() {
      const rawValue = this.getDataValue('value_token');
      // If it is Buffer, convert to string
      return rawValue ? rawValue.toString() : null;
    }
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'tokens',
  timestamps: false
});

module.exports = Token;
