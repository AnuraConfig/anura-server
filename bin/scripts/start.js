const { configFileLocation, baseDirectory } = require('./function')

const init_args = {
    config_file: configFileLocation,
    STORE_LOCATION: baseDirectory
}

module.exports = function start(args) {
    console.log("==============================================")
    console.log("================Starting Anura================")
    console.log("==============================================")
    const anuraServer = require('../../lib/server.js')
    anuraServer.startServer(Object.assign(init_args, args))
}