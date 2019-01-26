const { configFileLocation, baseDirectory } = require('./function')

const init_args = {
    config_file: configFileLocation,
    STORE_LOCATION: baseDirectory
}

module.exports = function start(args) {
    const anuraServer = require('../../lib/server.js')
    anuraServer.startServer(Object.assign(init_args, args))
}