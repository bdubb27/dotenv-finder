const fs = require('fs')

findDotEnvFile = () => {
  let pathIndex
  process.mainModule.paths.forEach((path, index) => {
    path = path.slice(0, -12) + '.env'
    path.replace(/(\s+)/g, '\\$1')
    try {
      fs.readFileSync(path)
      pathIndex = index
    } catch (error) {}
  })
  return process.mainModule.paths[pathIndex].slice(0, -12) + '.env'
}

module.exports = findDotEnvFile
