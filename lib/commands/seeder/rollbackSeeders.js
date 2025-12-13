import { getUmzug } from "../../utils.js"

const rollbackSeeders = async (step = 1) => {
    console.log('Rollback seeder...')
    const umzug = await getUmzug('./database/seeders/*.js')
    await umzug.down({ step: step })
    console.log('Rollback seeder done.')
}

export default rollbackSeeders
