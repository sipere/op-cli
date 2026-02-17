import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import genModel from './lib/commands/genModel.js';
import genController from './lib/commands/genController.js';
import genMigration from './lib/commands/migration/genMigration.js';
import genSeeder from './lib/commands/seeder/genSeeder.js';
import startMigration from './lib/commands/migration/startMigration.js';
import startSeeder from './lib/commands/seeder/startSeeder.js';
import startGenerateKey from './lib/commands/generateKey.js';
import resetMigrations from './lib/commands/migration/resetMigrations.js';
import freshMigrations from './lib/commands/migration/freshMigrations.js';
import rollbackMigrations from './lib/commands/migration/rollbackMigrations.js';
import startGenerateAdmin from './lib/commands/startGenAdmin.js';
import runImportData from './lib/commands/importData.js';
import genRouter from './lib/commands/genRouter.js';
import genTest from './lib/commands/genTest.js';
import genModrel from './lib/commands/genModrel.js';
import resetSeeders from './lib/commands/seeder/resetSeeders.js';
import rollbackSeeders from './lib/commands/seeder/rollbackSeeders.js';
import { startGenerateConf, startGenerateTestConf } from './lib/commands/genConf.js';

const opCommander = {
    parse: (argv) => {
        run(argv)
    }
}

function run(argv) {
    yargs(hideBin(argv))
    .version()
    .strict()
    .usage('Usage: node <command> [name] [pluralName]')
    .demandCommand(3, 'Please specify at least two arguments')
    .command({
        command: 'make:model <name> [pluralName]',
        describe: 'Generate a new Sequelize model',        
        builder: (yargs) => {
            return yargs
            .positional('name', {                
                describe: 'Model name',
                type: 'string',
            })
            .positional('pluralName', {                
                describe: 'Model plural name',
                type: 'string',
            })
            .option('c', {
                alias: 'controller',
                type: 'boolean',
                description: 'Generate a controller for the model',
            })
            .option('r', {
                alias: 'router',
                type: 'boolean',
                description: 'Generate a router for the model',
            })
            .option('m', {
                alias: 'migration',
                type: 'boolean',
                description: 'Generate a migration for the model',
            })
            .option('s', {
                alias: 'seeder',
                type: 'boolean',
                description: 'Generate a seeder for the model',
            })
            .option('t', {
                alias: 'test',
                type: 'boolean',
                description: 'Generate a test for the model',
            })
            .option('modrel', {
                alias: 'modrel',
                type: 'boolean',
                description: 'Generate a modrel for the model',
            })
            .option('a', {
                alias: 'all',
                type: 'boolean',
                description: 'Generate all files for the model',
            })
        },
        handler: async (argv) => {            
            const { name, pluralName, controller, router, migration, 
                seeder, test, modrel, all } = argv
            await genModel(name, pluralName)
            if(controller && !all) {
                await genController(name, pluralName)
            }
            if(router && !all) {
                await genRouter(name, pluralName)
            }
            if(migration && !all) {
                await genMigration(name, pluralName)
            }
            if(seeder && !all) {
                await genSeeder(name, pluralName)
            }
            if(test && !all) {
                await genTest(name, pluralName)
            }
            if(modrel && !all) {
                await genModrel(name)
            }
            if(all) {
                await genController(name, pluralName)
                await genMigration(name, pluralName)
                await genSeeder(name, pluralName)
                await genTest(name, pluralName)
                await genRouter(name, pluralName)
                await genModrel(name)
            }
        }
    })
    .command({
        command: 'make:controller <name> [pluralName]',
        describe: 'Generate a new controller',        
        builder: (yargs) => {
            return yargs
            .positional('name', {
                describe: 'Controller name',
                type: 'string',
            })
            .positional('pluralName', {
                describe: 'Controller plural name',
                type: 'string',
            })
        },
        handler: async (argv) => {            
            const { name, pluralName } = argv
            await genController(name, pluralName)
        }
    })
    .command({
        command: 'make:migration <name> [pluralName]',
        describe: 'Generate a new migration',        
        builder: (yargs) => {
            return yargs
            .positional('name', {
                describe: 'Migration name',
                type: 'string',
            })
            .positional('pluralName', {
                describe: 'Migration plural name',
                type: 'string',
            })
        },
        handler: async (argv) => {            
            const { name, pluralName } = argv
            await genMigration(name, pluralName)
        }
    })
    .command({
        command: 'migrate [migrationName]',
        describe: 'Run migrations',        
        builder: (yargs) => {
            return yargs
            .positional('migrationName', {
                describe: 'Migration name',
                type: 'string',
            })
        },
        handler: async (argv) => {            
            const { migrationName } = argv
            await startMigration(migrationName)
        }
    })
    .command({
        command: 'migrate:reset',
        describe: 'Reset migrations',        
        handler: async (argv) => {            
            await resetMigrations()
        }
    })
    .command({
        command: 'migrate:fresh',
        describe: 'Run fresh migration',        
        handler: async (argv) => {            
            await freshMigrations()
        }
    })
    .command({
        command: 'migrate:rollback',
        describe: 'Rollback migrations',
        builder: (yargs) => {
            return yargs
            .positional('step', {
                describe: 'Number of migrations to rollback',
                type: 'number',
            })
        },
        handler: async (argv) => {
            const { step } = argv            
            await rollbackMigrations(step)
        }
    })
    .command({
        command: 'make:seeder <name> [pluralName]',
        describe: 'Generate a new seeder',        
        builder: (yargs) => {
            return yargs
            .positional('name', {
                describe: 'Seeder name',
                type: 'string',
            })
            .positional('pluralName', {
                describe: 'Seeder plural name',
                type: 'string',
            })
        },
        handler: async (argv) => {            
            const { name, pluralName } = argv
            await genSeeder(name, pluralName)
        }
    })
    .command({
        command: 'db:seed [seederName]',
        describe: 'Run seeders',        
        builder: (yargs) => {
            return yargs
            .positional('seederName', {
                describe: 'Seeder name',
                type: 'string',
            })
        },
        handler: async (argv) => {            
            const { seederName } = argv
            await startSeeder(seederName)
        }
    })
    .command({
        command: 'db:seed:reset',
        describe: 'Reset seeders',        
        handler: async (argv) => {            
            await resetSeeders()
        }
    })
    .command({
        command: 'db:seed:rollback',
        describe: 'Rollback seeders',
        handler: async (argv) => {
            await rollbackSeeders()
        }
    })
    .command({
        command: 'make:router <routerName> [pluralName]',
        describe: 'Generate a new router',
        builder: (yargs) => {
            return yargs
            .positional('routerName', {
                describe: 'Router name',
                type: 'string',
            })
            .positional('pluralName', {
                describe: 'Router plural name',
                type: 'string',
            })
        },
        handler: async (argv) => {
            const { routerName, pluralName } = argv
            await genRouter(routerName, pluralName)
        }
    })
    .command({
        command: 'make:test <testName> [pluralName]',
        describe: 'Generate a new test',
        builder: (yargs) => {
            return yargs
            .positional('testName', {
                describe: 'Test name',
                type: 'string',
            })
            .positional('pluralName', {
                describe: 'Test plural name',
                type: 'string',
            })
        },
        handler: async (argv) => {
            const { testName, pluralName } = argv
            await genTest(testName, pluralName)
        }
    })
    .command({
        command: 'make:modrel <modelName>',
        describe: 'Generate a new modrel',
        builder: (yargs) => {
            return yargs
            .positional('modelName', {
                describe: 'Model name',
                type: 'string',
            })
        },
        handler: async (argv) => {
            const { modelName } = argv
            await genModrel(modelName)
        }
    })
    .command({
        command: 'key:generate',
        description:'Generates a new API key',
        builder: (yargs) => {
          return yargs
        },
        handler: async (argv) => {
          startGenerateKey();
        }
    })
    .command({
        command: 'conf:generate',
        description:'Generates a new conf file: .env',
        builder: (yargs) => {
          return yargs
        },
        handler: async (argv) => {
          startGenerateConf();
        }
    })
    .command({
        command: 'testconf:generate',
        description:'Generates a new test conf file: .env.test',
        builder: (yargs) => {
          return yargs
        },
        handler: async (argv) => {
          startGenerateTestConf();
        }
    })
    .command({
        command: 'admin:generate',
        description:'Generates a new admin user',
        builder: (yargs) => {
          return yargs
        },
        handler: async (argv) => {
          startGenerateAdmin();
        }
    })
    .command({
        command: 'db:import <model> <filePath> [sep]',
        describe: `Import CSV or JSON file to database table

Examples:
node op db:import thing somethings.json
node op db:import thing somethings.csv
node op db:import thing somethings.csv ,
node op db:import thing somethings.csv :
node op db:import thing somethings.csv ";"

In CSV file the field names must match the model fields.
        `,
        builder: (yargs) => {
            return yargs
            .positional('model', {
                describe: 'Model name',
                type: 'string',
            })
            .positional('filePath', {
                describe: 'File path',
                type: 'string',
            })
            .positional('sep', {
                describe: 'Separator for the CSV file',
                type: 'string',
            })
        },
        handler: async (argv) => {            
            const { model, filePath, sep } = argv
            await runImportData(model, filePath, sep)
        }
    })
    .parse();
}

export { opCommander }
