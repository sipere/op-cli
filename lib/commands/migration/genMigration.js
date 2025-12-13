import fse from 'fs-extra';

const generateMigrationFileName = (name) =>{
    const lowerName = name.toLowerCase()
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const timestamp = `${year}_${month}_${day}_${hours}${minutes}${seconds}`
  
    const migrationName = `${timestamp}_create_${lowerName}`
  
    return migrationName 
}

const genMigration = async (name) => {
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'migrationTemplate.js'
    const migrationTemplate = await fse.readFile(sourcePath, 'utf-8')
    let content = migrationTemplate.replace(/TableName/g, name + 's')
    const fileName = generateMigrationFileName(name)
    const filePath = `./database/migrations/${fileName}.js`
    fse.outputFile(filePath, content)
    console.log(`Genarated migration file: ${filePath}`)
}

export default genMigration
