import resetMigrations from "./resetMigrations.js"
import runMigration from "./startMigration.js"


const freshMigrations = async () => {
    console.log('Run fresh migration...')
    await resetMigrations()
    await runMigration()
    console.log('Refresh migration done.')
}

export default freshMigrations
