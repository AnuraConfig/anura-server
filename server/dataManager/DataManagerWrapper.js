import logger from '../utils/logger'
import { getStateManager } from '../stateManager/socket'


//this.stateManager.emitChange(serviceName, environmentName)

export default class DataManagerWrapper {
    constructor(connector, customLogger = logger, stateManager = getStateManager()) {
        this.logger = customLogger
        this.connectorName = connector.getName()
        this.stateManager = stateManager
        this.connector = new connector({ log: this._log })
        this._log("initialize")
    }
    async createService({ name, description, environments }) {
        this._log(`create service ${name}`)
        return this.connector.createService({ name, description, environments })
    }
    async updateService(updatedService, originalName) {
        this._log(`get service, serviceName:${serviceName}`)
        return this.connector.updateService(updatedService, originalName)
    }
    async updateConfig(serviceName, environmentName, data, type = "TEXT") {
        this._log(`update service, serviceName:${originalName}`)
        return this.connector.updateConfig(serviceName, environmentName, data, type)
    }
    async getService(serviceName, raw, lastConfig) {
        this._log(`update config, serviceName:${serviceName}, environmentName:${environmentName}`)
        return this.connector.getService(serviceName, raw, lastConfig)
    }
    async getConfigs(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        return this.connector.getConfigs(serviceName, env, raw)
    }
    async getConfig(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        return this.connector.getConfig(serviceName, env, raw)
    }
    async getAllEnv() {
        this._log(`get all environment`)
        return this.connector.getAllEnv()
    }
    _log = (message, level = "info") => {
        this.logger.log({ message: `${this.connectorName} Manger: ${message} `, level })
    }
}