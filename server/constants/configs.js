import YAML from 'YAML'
import fs from 'fs'
import path from 'path'
import { DEFAULT_CONFIG_LOCATION } from './constants'

const configLocation = path.join(__dirname, '../../', DEFAULT_CONFIG_LOCATION)
const file = fs.readFileSync(configLocation, 'utf8')
const defaultConfig = YAML.parse(file)
let config = defaultConfig

function loadConfig(configs) {
    let configFileObject = {}
    if (config.config_file) {
        const file = fs.readFileSync(config.config_file, 'utf8')
        configFileObject = YAML.parse(file)
    }
    config = Object.assign({}, defaultConfig, configFileObject, configs)
    return config
}

export { loadConfig, config }