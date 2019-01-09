const fs = require("fs")
const { baseDirectory, configFileLocation } = require('./function')

if (!fs.existsSync(baseDirectory)) {
    fs.mkdirSync(baseDirectory)
}
fs.copyFileSync('defaultConfig.yaml', configFileLocation)

console.log("Welcome to Anura")