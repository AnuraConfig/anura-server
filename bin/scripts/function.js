const path = require("path")

const homeFolder = process.env.APPDATA ||
    (process.platform === 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local')

const baseDirectory = path.join(homeFolder, 'Anura')
const configFileLocation = path.join(baseDirectory, 'anura-config.yaml')

module.exports = { baseDirectory, configFileLocation }