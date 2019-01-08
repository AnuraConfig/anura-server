const fs = require("fs")
const path = require("path")

const folder_location = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local')
const anura_dir = path.join(folder_location, 'Anura')

if (!fs.existsSync(anura_dir)) {
    fs.mkdirSync(anura_dir)
}
fs.copyFileSync('defaultConfig.yaml', path.join(anura_dir, 'anura-config.yaml'))

console.log("Welcome to Anura")