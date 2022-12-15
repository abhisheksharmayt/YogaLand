import { DataTypes, sequelize } from '../db/connect.js';

const Batch = sequelize.define('batch', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    timing: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    month: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }

});

export default Batch;