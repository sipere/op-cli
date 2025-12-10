import fsp from 'fs/promises';

function capitalizeFirstLetter(content) {
    if (typeof content !== 'string' || content.length === 0) {
      return content;
    }
    const firstLetter = content.charAt(0);
    const capitalizedFirstLetter = firstLetter.toUpperCase();
    const restOfString = content.slice(1);
    return capitalizedFirstLetter + restOfString;
}

async function isFileExists(filePath) {
  return await fsp.access(filePath)
      .then(() => true)
      .catch(() => false);
}

const getUmzug = async (directory) => {
  const { default: sequelize } = await import('../../../../app/database/database.js')
  const { Umzug, SequelizeStorage } = await import('umzug')

  const umzug = new Umzug({
    migrations: { glob: directory },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  })

  return umzug
}

export { capitalizeFirstLetter, isFileExists, getUmzug };
