import { isFileExists, getUmzug } from '../../utils.js'


const startMigration = async (name) => {
    if(name) {
        await runOneMigration(name)
    }else {
        await runAllMigration()
    }
}

const runOneMigration = async (name) => {
    console.log('Run one migration...', name)

    if(!name.endsWith('.js')) {
        name += '.js'
      }
      let migrationPath = '';
      if(!name.startsWith('database/migrations/')) {
        migrationPath = `database/migrations/${name}`
      }else {
        migrationPath = name
      }
      
      if(!await isFileExists(migrationPath)) {
        console.log(`The migration file ${migrationPath} not already exists.`)
        process.exit(1)
      }
    
      const umzug = await getUmzug(migrationPath)
      await umzug.up()

}

const runAllMigration = async (name) => {
    console.log('Run all migration...')
    const umzug = await getUmzug('./database/migrations/*.js')
    await umzug.up()    
}

export default startMigration

