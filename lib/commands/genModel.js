import fse from 'fs-extra';
import { capitalizeFirstLetter } from '../utils.js';

const genModel = async (name) => {
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'modelTemplate.js'
    const modelTemplate = await fse.readFile(sourcePath, 'utf-8')
    let model = modelTemplate.replace(/ModelName/g, capitalizeFirstLetter(name))
    model = model.replace('TableBaseName', name)
    fse.outputFile(`./app/models/${name}.js`, model)    
}

export default genModel
