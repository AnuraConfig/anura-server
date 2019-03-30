import mongoose from 'mongoose';
import { Service, Environment, Config } from './schemas';
import configManager from '../../constants/configs'
import logger from '../../utils/logger'
import configConvertor from '../../configConvertor'
import { validConfigType } from '../common/validation'
import { getStateManager } from '../../stateManager/socket'

export default class MongoManager extends DataConnectorsAbstract {
    constructor(connectionString = configManager.config.MONGO_STORE, customLogger = logger,
        stateManager = getStateManager(), callback = () => { }) {
        this._log("NOT ALL FEATURE WORK IN THIS VERSION READ MORE IN THE DOCS", "warnning")
        this.logger = customLogger
        this._log("initialize")
        this.connectionString = connectionString
        this.stateManager = stateManager
        mongoose.connect(this.connectionString, { useNewUrlParser: true }, () => callback())
        mongoose.connection.on('error', (e) => this._log('connection error: ' + e))
    }

    async createService({ name, description, environments }) {
        this._log(`create service ${name}`)
        let promises = []
        for (let environment of environments) {
            promises.push(this._createEnvironment(environment))
        }

        let newEnvironments = await Promise.all(promises).catch(e => { throw e })
        var service = new Service({
            name: name,
            description: description,
            environments: newEnvironments.map(env => env._id)
        })
        return service.save()
    }

    async updateService(updatedService, originalName) {
        this._log(`update service, serviceName:${originalName}`)
    }


    async updateConfig(serviceName, environmentName, data, type = "TEXT") {
        this._log(`update config, serviceName:${serviceName}, environmentName:${environmentName}`)
        validConfigType(data, type, this._log)
        const service = await this._findService(serviceName, environmentName)
        let environment = await Environment.findById(service.environments[0].id).exec()
        let newConfig = new Config({
            data,
            type,
            version: environment.configs.length
        })
        newConfig = await newConfig.save()
        environment.configs.push(newConfig._id)
        return environment.save()
    }

    async getService(serviceName, raw, lastConfig) {
        this._log(`get service, serviceName:${serviceName}`)
        const options = lastConfig ? { limit: 1, sort: { version: -1 } } : {}
        const service = await Service
            .findOne({
                name: serviceName
            })
            .populate({
                path: 'environments',
                populate: {
                    path: 'configs',
                    options
                }
            })
            .exec()
        return this._processService(service, raw)
    }

    async getConfigs(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        const service = await Service
            .find({
                name: serviceName
            })
            .populate({
                path: 'environments',
                populate: {
                    path: 'configs'
                },
                match: {
                    name: env
                }
            })
            .exec()
        return {
            name: service[0].environments[0].name,
            configs: this._prosesConfigs(service[0].environments[0].configs, raw)
        }
    }

    async getConfig(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        const allConfigs = await this.getConfigs(serviceName, env, raw)
        return this._processConfig(allConfigs.configs.sort(item => item.version).slice(-1)[0])
    }

    async getAllEnv() {
        this._log(`get all environment  `)
        return Service.find({})
            .populate({
                path: 'environments',
                populate: {
                    path: 'configs'
                }
            })
            .exec()
    }

    //#region privates
    _prosesConfigs(configs, raw) {
        if (raw)
            return configs;
        configs.forEach(config => {
            config.data = JSON.stringify(configConvertor.getObject(config.data, config.type))
        })
        return configs
    }
    _log = (message, level = "info") => {
        this.logger.log({ message: `Mongo Manger: ${message} `, level })
    }

    _processService(service, raw) {
        service.environments = service.environments.map(env => this._processEnvironment(env, raw))
        return service
    }

    _processEnvironment(environment, raw) {
        environment.configs = this._prosesConfigs(environment.configs, raw).map(config => this._processConfig(config))
        return environment
    }

    async _createEnvironment({ name, config }) {
        let newConfig = await this._createConfig(config)
        let environment = new Environment({
            name: name,
            configs: [newConfig._id]
        })

        return environment.save()
    }

    async _createConfig({ data, type, key }) {
        validConfigType(data, type, this._log)
        let config = new Config({
            type,
            data: data,
            version: key || 0
        })
        return config.save()
    }

    async _findService(serviceName, environmentName) {
        return Service
            .findOne({
                name: serviceName
            })
            .populate({
                path: 'environments',
                match: {
                    name: environmentName
                }
            })
            .exec()
    }
    _processConfig(config, raw) {
        delete config.__v
        delete config._id
        return config
    }
    //#endregion
}