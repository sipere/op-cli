
import { isFileExists, getUmzug } from '../../utils.js'

const startSeeder = async (name) => {
    if(name) {
        await runOneSeeder(name)
    }else {
        await runAllSeeder()
    }
}

const runOneSeeder = async (name) => {
    console.log('Run one seeder...', name)
    if(!name.endsWith('.js')) {
        name += '.js'
    }
    let seederPath = ''
    if(!name.startsWith('database/seeders/')) {
        seederPath = `database/seeders/${name}`
    }else {
        seederPath = name
    }

    if(!await isFileExists(seederPath)) {
        console.log(`The seeder file ${seederPath} not already exists.`)
        process.exit(1)
    }

    const umzug = await getUmzug(seederPath)
    await umzug.up()
    console.log('Run one seeder done.')
}

const runAllSeeder = async (name) => {
    console.log('Run all seeder...')
    const umzug = await getUmzug('./database/seeders/*.js')
    await umzug.up()
    console.log('Run all seeder done.')
}

export default startSeeder
