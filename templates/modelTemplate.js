import { DataTypes } from 'sequelize'
import sequelize from '../database/database.js'

const ModelName = sequelize.define('TableBaseName', {
    name: { type: DataTypes.STRING,  allowNull: false  }
}, {
    timestamps: true,
    freezeTableName: true
})

export default ModelName
