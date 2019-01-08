import YAML from 'yaml'
import fs from 'fs'
import { DEFAULT_CONFIG_LOCATION } from './constants'

const file = fs.readFileSync(DEFAULT_CONFIG_LOCATION, 'utf8')
const defaultConfig = YAML.parse(file)
let config = defaultConfig

function loadConfig(configFile, extraConfig) {
    let configFileObject = {}
    if (extraConfig) {
        const file = fs.readFileSync(configFile, 'utf8')
        configFileObject = YAML.parse(file)
    }
    config = Object.assign({}, defaultConfig, configFileObject, extraConfig)
    return config
}

export { loadConfig, config }