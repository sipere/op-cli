import fsp from 'fs/promises';
import path from 'path';

const importFromJson = async (model, filePath) => {
    console.log('Import from json...')
    try {
        const data = JSON.parse(await fsp.readFile(filePath, 'utf8'))
        await model.bulkCreate(data)
        console.log(`Data imported successfully! ${model.name}`)
    } catch (error) {
        console.error(error)
    }
}

const importFromCsv = async (model, filePath, sep) => {
    try {
        const data = await fsp.readFile(filePath, 'utf8')
        const clearData = data.replace(/"/g, '').trim()
        const rows = clearData.split('\n')
        const headerColumns = rows.shift().split(sep)
        
        const dataToInsert = rows.map(row => {
            const columns = row.split(sep).map(item => {
              const number = Number(item)
              return Number.isNaN(number) ? `${item}` : number
            })
            return headerColumns.reduce((obj, header, index) => {
                obj[header] = columns[index]
                return obj
            }, {})
        })
  
        await model.bulkCreate(dataToInsert)
        console.log(`Data imported successfully! ${model.name}`)
    } catch (error) {
        console.error(error)
    }
  }
  
  async function runImportData(model, filePath, sep=',') {
    
    if(!filePath || !model) {
        console.log('Usage: node db:import <modelName> <filePath> [sep]')
        process.exit(1)
    }
    
    try {
      await import(`../../../../../app/models/${model}.js`)
    } catch (error) {
      console.error(error)
      console.log(`The ${model} model file does not exist!`)
      process.exit(1)
    }
  
    try {
      await fsp.stat(filePath)
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`The file ${filePath} does not exist!`)
        process.exit(1)
      } else {
        console.error(error)
        process.exit(1)
      }
    }
  
    const modelInstance = await import(`../../../../../app/models/${model}.js`)
    const modelObject = modelInstance.default
  
    const ext = path.extname(filePath).toLowerCase()
    if(ext !== '.json' && ext !== '.csv') {
        console.log('The file must have .json or .csv extension!')
        process.exit(1)
    }
    const { default: sequelize } = await import('../../../../../app/database/database.js')
    try {
        await sequelize.sync({ force: true })
        await sequelize.authenticate()
        if(ext === '.csv') {
            await importFromCsv(modelObject, filePath, sep)
        }else {
            await importFromJson(modelObject, filePath)
        }        
    } catch (error) {
        console.error(error)
    }
  
  }
  
  export default runImportData
