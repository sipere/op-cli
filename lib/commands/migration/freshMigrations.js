import resetMigrations from "./resetMigrations.js"
import runMigration from "./startMigration.js"


const freshMigrations = async () => {
    console.log('Run fresh migration...')
    await resetMigrations()
    await runMigration()
}

export default freshMigrations
