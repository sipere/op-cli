import fse from 'fs-extra';

const genTest = async (testName) => {
    console.log('Generating test...')
    const sourceBase = './node_modules/@sipere/op-cli/templates/'
    const sourcePath = sourceBase + 'testTemplate.js'
    const testTemplate = await fse.readFile(sourcePath, 'utf-8')
    let testContent = testTemplate.replace(/routingPath/g, testName + 's')
    fse.outputFile(`./test/${testName}.spec.js`, testContent)
}

export default genTest
