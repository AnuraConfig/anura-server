import mongoose from 'mongoose';
import { Service, Environment, Config } from './schemas';
import configManager from '../../constants/configs'
import configConvertor from '../../configConvertor'
import { validConfigType } from '../common/validation'
import DataConnectorsAbstract from '../common/DataConnectorsAbstract'

function defaultCallback() { }

export default class MongoManager extends DataConnectorsAbstract {

    constructor({ connectionString = configManager.config.MONGO_STORE, log, callback = defaultCallback }) {
        super(log, stateManager)
        this.log("NOT ALL FEATURE WORK IN THIS VERSION READ MORE IN THE DOCS", "warning")
        this.connectionString = connectionString
        mongoose.connect(this.connectionString, { useNewUrlParser: true }, () => callback())
        mongoose.connection.on('error', (e) => this.log('connection error: ' + e))
    }
    static getName = () => "Mongo"

    async createService({ name, description, environments }) {
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
    }


    async updateConfig(serviceName, environmentName, data, type = "TEXT") {
        validConfigType(data, type, this.log)
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
        const allConfigs = await this.getConfigs(serviceName, env, raw)
        return this._processConfig(allConfigs.configs.sort(item => item.version).slice(-1)[0])
    }

    async getAllEnv() {
        this.log(`get all environment  `)
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
        validConfigType(data, type, this.log)
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