import fse from 'fs-extra'
import { isFileExists } from '../utils.js'

const startGenerateConf = async () => {
    console.log('Generate conf...')
    const content = `
APP_PORT=8000
APP_KEY=
APP_LOG=console.log

DB_DIALECT=sqlite
DB_HOST=127.0.0.1
DB_NAME=
DB_USER=
DB_PASS=
DB_STORAGE=database.sqlite
    `
      const destinationFileName = '.env'
      if(await isFileExists(destinationFileName)) {
        process.exit(1);
      }
    
      await fse.writeFile(destinationFileName, content, 'utf8')
}


const startGenerateTestConf =async () => {
    const content = `
APP_PORT=8000
APP_KEY=my_secret_key
APP_LOG=console.log

DB_DIALECT=sqlite
DB_STORAGE=:memory:
  `
    const destinationFileName = '.env.test'
    if(await isFileExists(destinationFileName)) {
      process.exit(1);
    }
  
    await fse.writeFile(destinationFileName, content, 'utf8')
}

export {
    startGenerateConf,
    startGenerateTestConf
}
