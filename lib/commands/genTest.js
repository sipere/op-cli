import fse from 'fs-extra';
import { getPlural  } from '../utils.js';

const genTest = async (testName, pluralName=null) => {
    const finalPluralName = pluralName ? pluralName : getPlural(testName)
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'testTemplate.js'
    const testTemplate = await fse.readFile(sourcePath, 'utf-8')
    let testContent = testTemplate.replace(/routingPath/g, finalPluralName)
    const filePath = `./test/${testName}.spec.js`
    fse.outputFile(filePath, testContent)
    console.log(`Genarated test file: ${filePath}`)
}

export default genTest
