import YAML from 'yaml'

const defaultConfig = YAML.parse('../../defaultConfig.yaml')
let config = defaultConfig

function loadConfig(configFile, extraConfig) {
    const configFileObject = YAML.parse(configFile)
    config = Object.assign({}, defaultConfig, configFileObject, extraConfig)
    return config
}

export { loadConfig, config }