const { log } = require('console')
const path=require('path')

// const filePath='/users/files/index.html'
// console.log(filePath);

// let result=path.basename(filePath)
// console.log(result);

// let result=path.extname(filePath)
// console.log(result);

// let result=path.dirname(filePath)
// console.log(result);

// let result=path.parse(filePath)
// console.log(result);


//Join
// const dirPath='/users/file'
// const fileName='index.html'
// const fullPath=path.join(dirPath,fileName)
// console.log(fullPath);

//Resolve
// const relativePath='./files/index.html'
// const absolutePath=path.resolve(relativePath)
// console.log(absolutePath);

//Normalize
const messyPath='users//files///index.html'
const normalizedPath=path.normalize(messyPath)
console.log(normalizedPath);
