import fse from 'fs-extra';
import { capitalizeFirstLetter } from '../utils.js';

const genModel = async (name) => {
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'modelTemplate.js'
    const modelTemplate = await fse.readFile(sourcePath, 'utf-8')
    let model = modelTemplate.replace(/ModelName/g, capitalizeFirstLetter(name))
    model = model.replace('TableBaseName', name)
    const filePath = `./app/models/${name}.js`
    fse.outputFile(filePath, model)
    console.log(`Genarated model file: ${filePath}`)
}

export default genModel
