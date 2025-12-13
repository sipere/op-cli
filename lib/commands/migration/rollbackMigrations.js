import { getUmzug } from "../../utils.js"

const rollbackMigrations = async (step = 1) => {
    console.log('Rollback migration...')
    const umzug = await getUmzug('./database/migrations/*.js')
    await umzug.down({ step: step })
    console.log('Rollback migration done.')
}

export default rollbackMigrations
