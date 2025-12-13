
import { capitalizeFirstLetter, printWarning } from '../utils.js';
import fs from 'fs';

const genModrel = async (modelName) => {
    const filePath = 'app/models/modrels.js';
    await printWarning(filePath);

    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = addImportToContent(fileContent, modelName);
    fileContent = addDBEntryToContent(fileContent, modelName);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ Modrel generated: ${filePath}`);
}

const addImportToContent = (fileContent, modelName) => {
    const modelNameCap = capitalizeFirstLetter(modelName);
    const modelImport = `import ${modelNameCap} from './${modelName.toLowerCase()}.js';`;

    if(fileContent.includes(modelImport)) {
        return fileContent;
    }
    
    const lines = fileContent.split('\n');
    let lastImportIndex = -1;
    for(let i = 0; i<lines.length; i++) {
        if(lines[i].trim().startsWith('import')) {
            lastImportIndex = i;
        }
    }

    if(lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, modelImport);
        fileContent = lines.join('\n');
    }else {
        fileContent = modelImport + '\n' + fileContent;
    }

    return fileContent;
}

const addDBEntryToContent = (fileContent, modelName) => {
    const modelNameCap = capitalizeFirstLetter(modelName);
    const newDBEntry = `db.${modelNameCap} = ${modelNameCap};`;

    const lines = fileContent.split('\n');
    let lastDBEntryIndex = -1;
    for(let i = 0; i<lines.length; i++) {
        if(lines[i].trim().startsWith('db.')) {
            lastDBEntryIndex = i;
        }
    }

    if(lastDBEntryIndex !== -1) {
        lines.splice(lastDBEntryIndex + 1, 0, newDBEntry);
        fileContent = lines.join('\n');
    }else {
        fileContent = newDBEntry + '\n' + fileContent;
    }

    return fileContent;
}

export default genModrel