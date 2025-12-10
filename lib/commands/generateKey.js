import fse from 'fs-extra'
import { generateApiKey } from 'generate-api-key';

async function startGenerateKey() {
    try {
      const envFile = '.env'
      let content = await fse.readFile(envFile, 'utf8')
      const key = generateApiKey({method: 'bytes', length: 32})
  
      const regex = /^APP_KEY *=.*$/m
      if(regex.test(content)) {
        content = content.replace(regex, `APP_KEY=${key}`)
      }else {
        if(content.trim() !== '') {
          content += `\nAPP_KEY=${key}\n`
        }else {
          content = `APP_KEY=${key}\n`
        }
      }
      fse.writeFile(envFile, content, 'utf8')
    } catch (error) {
      console.error(error)
    }
  }
  
export default startGenerateKey
