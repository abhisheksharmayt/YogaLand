import { sequelize, DataTypes } from '../db/connect.js';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true  
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

export default User;
