import { getUmzug } from '../../utils.js'

const resetSeeders = async () => {
    console.log('Reset seeders...')
    const umzugSeeder = await getUmzug('./database/seeders/*.js')
    await umzugSeeder.down({ to: 0 })
    console.log('Reset seeders done.')
}

export default resetSeeders
