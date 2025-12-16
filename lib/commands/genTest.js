import fse from 'fs-extra';
import { getPlural  } from '../utils.js';

const genTest = async (testName) => {
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'testTemplate.js'
    const testTemplate = await fse.readFile(sourcePath, 'utf-8')
    let testContent = testTemplate.replace(/routingPath/g, getPlural(testName))
    const filePath = `./test/${testName}.spec.js`
    fse.outputFile(filePath, testContent)
    console.log(`Genarated test file: ${filePath}`)
}

export default genTest
