#!/usr/bin/env node
var start = require('./scripts/start.js')
process.env.NODE_ENV = "production"

function generateArgObject(argv) {
    let argObject = {}
    for (let i = 3; i < argv.length; i++) {
        let splits = argv[i].split("=")
        Object.assign(argObject, generateKeyValue(splits, argv[i]))
    }
    return argObject
}
function generateKeyValue(splits, arg) {
    switch (splits.length) {
        case (1):
            return { [arg]: true }
        case (2):
            return { [splits[0]]: splits[1] }
        default:
            return specialCommand(arg)
    }
}

function specialCommand(args) {
    return {}
}
var commands = {
    "start": start
}

var command = process.argv[2]
if (commands[command])
    commands[command](generateArgObject(process.argv))
else
    console.log(`no such command: "${command}"`)
