import { DataTypes } from 'sequelize'
import sequelize from '../database/database.js'

const ModelName = sequelize.define('TableBaseName', {
    name: { type: DataTypes.STRING,  allowNull: false  }
})

export default ModelName
