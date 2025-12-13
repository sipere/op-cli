import fse from 'fs-extra';
import { capitalizeFirstLetter } from '../utils.js';

const genController = async (name) => {
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'controllerTemplate.js'
    let content = await fse.readFile(sourcePath, 'utf-8')
    content = content.replace(/NameController/g, capitalizeFirstLetter(name) + 'Controller')
    content = content.replace(/ModelName/g, capitalizeFirstLetter(name))
    content = content.replace('modelFileName', name)
    content = content.replace(/thingArray/g, name + 's')
    content = content.replace(/thingObject/g, name)
    const filePath = `./app/controllers/${name}Controller.js`
    fse.outputFile(filePath, content)
    console.log(`Genarated controller file: ${filePath}`)
}

export default genController
