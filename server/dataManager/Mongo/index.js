import mongoose from 'mongoose';
import { Service, Environment, Config } from './schemas';
import configManager from '../../constants/configs'
import logger from '../../utils/logger'
import configConvertor from '../../configConvertor'
import { validConfigType } from '../common/validation'

export default class MongoManager {
    constructor(connectionString = configManager.config.MONGO_STORE, customLogger = logger) {
        this.logger = customLogger
        this._log("initialize")
        this.connectionString = connectionString
        mongoose.connect(this.connectionString, { useNewUrlParser: true })
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
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

    async updateConfig(serviceId, environmentName, data, type) {
        this._log(`update config, serviceId:${serviceId}, environmentName:${environmentName}`)
        validConfigType(data, type, this._log)
        const service = await this._findService(serviceId, environmentName)
        let environment = await Environment.findById(service.environments[0].id).exec()
        let newConfig = new Config({
            data,
            type,
            version: environment.configs.length
        })
        newConfig = await newConfig.save()
        environment.configs.push(newConfig.id)
        return environment.save()
    }

    async getConfigs(serviceId, env, raw) {
        this._log(`get configs serviceId:${serviceId}, environmentName:${env}`)
        const service = await Service
            .find({
                _id: mongoose.Types.ObjectId(serviceId)
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

    async getConfig(serviceId, env, raw) {
        this._log(`get configs serviceId:${serviceId}, environmentName:${env}`)
        const allConfigs = await this.getConfigs(serviceId, env, raw)
        return allConfigs.configs.sort(item => item.version).slice(-1)[0].data
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
        return configs.map(config => {
            config.data = JSON.stringify(configConvertor.getObject(config.data, config.type))
        })
    }
    _log = (message, level = "info") => {
        this.logger.log({ message: `Mongo Manger: ${message} `, level })
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

    async _findService(serviceId, environmentName) {
        return Service
            .findOne({
                _id: mongoose.Types.ObjectId(serviceId)
            })
            .populate({
                path: 'environments',
                match: {
                    name: environmentName
                }
            })
            .exec()
    }

    //#endregion
}