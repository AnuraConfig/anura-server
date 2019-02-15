import YAML from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { DEFAULT_CONFIG_LOCATION } from './constants'


class Config {
    constructor() {
        const configLocation = path.join(__dirname, '../../', DEFAULT_CONFIG_LOCATION)
        const file = fs.readFileSync(configLocation, 'utf8')
        const defaultConfig = YAML.safeLoad(file)
        this.config = defaultConfig
        this.callbacks = []
    }

    subscribeCallback(callback) {
        this.callbacks.push(callback)
    }

    activeCallback(config) {
        for (let callback of this.callbacks) {
            callback(config)
        }
    }

    loadConfig(configs) {
        let configFileObject = {}
        console.log(`reading config file at '${configs.config_file}'`)
        if (configs.config_file) {
            const file = fs.readFileSync(configs.config_file, 'utf8')
            configFileObject = YAML.parse(file)
        }
        config = Object.assign({}, defaultConfig, configFileObject, configs)
        this.activeCallback(config)
        return config
    }

}

export default new Config(); 