import assert from "assert"
import configManager from "../../../server/constants/configs"
import path from "path"

describe('configManager', () => {
    describe('#loadConfig()', () => {
        it('should load and return the default config', () => {
            const config = configManager.loadConfig()
            assert(Object.keys(config).length > 0)
        })
        it('should load and store the default config', () => {
            const config = configManager.loadConfig()
            assert.deepEqual(config, configManager.config)
        })
        it('should load custom config', () => {
            const config = configManager.loadConfig({ "CUSTOM_KEY": 6 })
            assert.equal(config.CUSTOM_KEY, 6)
        })
        it('should read and load config file', () => {
            const config = configManager.loadConfig({ config_file: path.join(__dirname, "./files/testConfig.yaml") })
            assert.equal(config.SOME_KEY, "value")
        })
    })
    describe('#subscribeCallback', () => {
        it('should subscribe to changes (or loading) of the config', (done) => {
            configManager.subscribeCallback((config) => {
                assert(Object.keys(config).length > 0)
                done()
            })
            configManager.loadConfig()
        })
    })

})