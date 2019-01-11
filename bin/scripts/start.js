const { configFileLocation } = require('./function')

const init_args = {
    config_file: configFileLocation,
    STORE_LOCATION: configFileLocation
}

module.exports = function start(args) {
    var anuraServer = require('../../lib/server.js')
    anuraServer.startServer(Object.assign(init_args, args))
}