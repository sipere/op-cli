import { getUmzug } from '../../utils.js'

const resetMigrations = async () => {
    console.log('Reset migrations...')
    const umzugSeeder = await getUmzug('./database/seeders/*.js')
    await umzugSeeder.down({ to: 0 })
    const umzug = await getUmzug('./database/migrations/*.js')
    await umzug.down({ to: 0 })
    console.log('Reset migrations done.')
}

export default resetMigrations
