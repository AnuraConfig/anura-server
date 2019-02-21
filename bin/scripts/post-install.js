const fs = require("fs")
const path = require("path")


if(process.env.NODE_ENV !== "develop") {
    const { baseDirectory, configFileLocation } = require('./function')

    if (!fs.existsSync(baseDirectory)) {
        fs.mkdirSync(baseDirectory)
    }
    const file = fs.readFileSync(path.join(__dirname, '../../defaultConfig.yaml'))
    fs.writeFileSync(configFileLocation, file)

    console.log("Welcome to Anura")
}