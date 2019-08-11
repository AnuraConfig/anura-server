import _ from 'lodash'
import logger from '../utils/logger'
import { getStateManager } from '../stateManager/socket'
import configManager from '../constants/configs'



export default class DataManagerWrapper {
    constructor(connector, customLogger = logger, stateManager = getStateManager()) {
        this.logger = customLogger
        this.connectorName = connector.getName()
        this.stateManager = stateManager
        this.connector = new connector({ config: configManager.config.DATA_MANAGER_CONFIG, log: this._log, stateManager })
        this._log("initialize")
    }
    async createService({ name, description, environments }) {
        this._log(`create service ${name}`)
        await this.connector.createService({ name, description, environments })
        await this.stateManager.emitChange(name, environments)
    }
    async deleteService(serviceName) {
        this._log(`delete service, serviceName:${serviceName}`)
        await this.connector.deleteService(serviceName)
    }
    async updateService(updatedService, originalName) {
        this._log(`update service, serviceName:${originalName}`)
        await this.connector.updateService(updatedService, originalName)
        //await this.stateManager.emitChange(name,  environments)        
    }
    async updateConfig(serviceName, environmentName, data, type = "TEXT") {
        this._log(`update config, serviceName:${serviceName}, environmentName:${environmentName}`)
        await this.connector.updateConfig(serviceName, environmentName, data, type)
        await this.stateManager.emitChange(serviceName, environmentName)
    }
    async updateGlobalVariable(globalVars) { //todo: change update global var to update only the relevant configs 
        this._log(`update global variable`)
        await this.connector.saveGlobalVariable(JSON.parse(globalVars))
        this._update_all_services()
    }
    async updateGlobalSingleVariable(key, value) {
        this._log(`update global single variable, key:${key} value:${value}`)
        const globalVariable = _.cloneDeep(await this.connector.getGlobalVariable())
        await this.connector.saveGlobalVariable(Object.assign(globalVariable, { [key]: value }))
        this._update_all_services()
    }
    async getGlobalVariable() {
        this._log(`get global variable`)
        return JSON.stringify(await this.connector.getGlobalVariable())
    }
    async getService(serviceName, raw, lastConfig) {
        this._log(`get service, serviceName:${serviceName}`)
        return this.connector.getService(serviceName, raw, lastConfig)
    }
    async getConfig(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        return this.connector.getConfig(serviceName, env, raw)
    }
    async getConfigs(serviceName, env, raw, lastConfig = false) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        return this.connector.getConfigs(serviceName, env, raw, lastConfig)
    }
    async getAllEnv() {
        this._log(`get all environment`)
        return this.connector.getAllEnv()
    }
    _log = (message, level = "info") => {
        this.logger.log({ message: `${this.connectorName} Manger: ${message} `, level })
    }
    _update_all_services = async () => {
        const services = await this.connector.getAllEnv()
        services.forEach(({ name, environments }) => {
            environments.forEach((environments) => {
                this.stateManager.emitChange(name, environments.name)
            })
        })
    }
}