const fs = require("fs")
const { baseDirectory, configFileLocation } = require('./function')

if (!fs.existsSync(baseDirectory)) {
    fs.mkdirSync(baseDirectory)
}
const file = fs.readFileSync('defaultConfig.yaml')
fs.writeFileSync(configFileLocation, file)

console.log("Welcome to Anura")