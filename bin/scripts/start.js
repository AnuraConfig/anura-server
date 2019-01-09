const path = require("path")

const folder_location = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local')
const config_file = path.join(folder_location, 'Anura', 'anura-config.yaml')

const init_args = {
    config_file
}

module.exports = function start(args) {
    var anuraServer = require('../../lib/server.js')
    anuraServer.startServer(Object.assign(init_args, args))
}