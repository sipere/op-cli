import db from '../../app/models/modrels.js';

async function up({context: QueryInterface}) {
  if(db.ModelName) {
    await db.ModelName.bulkCreate([
      
    ]);
  }else {
    await QueryInterface.bulkInsert('TableName', [

    ]);
  }

}

async function down({context: QueryInterface}) {
  await QueryInterface.bulkDelete('TableName');
}

export { up, down }
