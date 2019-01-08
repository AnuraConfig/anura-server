import YAML from 'yaml'
import fs from 'fs'
import { DEFAULT_CONFIG_LOCATION } from './constants'

const file = fs.readFileSync(DEFAULT_CONFIG_LOCATION, 'utf8')
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