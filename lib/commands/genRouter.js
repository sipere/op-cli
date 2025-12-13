import { capitalizeFirstLetter, printWarning } from '../utils.js';
import fs from 'fs';

const genRouter = async (routerName) => {
  console.log('Generating CRUD routes...')
  const filePath = 'app/routes/api.js';
  await printWarning(filePath);
  let fileContent = fs.readFileSync(filePath, 'utf8');
  fileContent = addImportToContent(fileContent, routerName);
  const newFileContent = addRoutingToContent(fileContent, routerName);
  fs.writeFileSync(filePath, newFileContent, 'utf8');
  console.log(`✅ Router generated: ${filePath}`);
}

const addRoutingToContent = (fileContent, routerName) => {
  const newRoutes = getRouting(routerName);
  const exportLine = 'export default router';
  const insertionPointForRoutes = fileContent.lastIndexOf(exportLine);
  if(insertionPointForRoutes !== -1) {
    const beforeExport = fileContent.substring(0, insertionPointForRoutes);
    const afterExport = fileContent.substring(insertionPointForRoutes);
    const newFileContent = beforeExport + newRoutes + '\n' + afterExport;
    return newFileContent;
  }else {
    throw new Error(`${exportLine} not found in ${filePath}`)
  }
}

const addImportToContent = (fileContent, routerName) => {

    const controllerImport = getControllerImport(routerName);

    if(fileContent.includes(controllerImport)) {
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
    lines.splice(lastImportIndex + 1, 0, controllerImport);
    fileContent = lines.join('\n');
  }

  return fileContent;
}

const getRouting = (routerName) => {
  const resourceName = capitalizeFirstLetter(routerName) + 'Controller';
  const routePath = routerName.toLowerCase() + 's';

  return `router.get('/${routePath}', ${resourceName}.index);
router.get('/${routePath}/:id', ${resourceName}.show);
router.post('/${routePath}', ${resourceName}.store);
router.put('/${routePath}/:id', ${resourceName}.update);
router.delete('/${routePath}/:id', ${resourceName}.destroy);
`;

}

const getControllerImport = (routerName) => {
  return `import ${capitalizeFirstLetter(routerName)}Controller` +
  ` from '../controllers/${routerName}Controller.js';`;
}

export default genRouter
