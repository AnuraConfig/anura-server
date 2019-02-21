import mongoose from 'mongoose';
import { Service, Enviorment, Config } from './schemas';
import configManager from '../../constants/configs'
import logger from '../../utils/logger'

export default class MongoManager {
    constructor(connectionString = configManager.config, customLogger = logger) {
        this.logger = customLogger
        this._log("initialize")
        this._log("THIS CONNECTOR IS BROKEN ON THIS VERSION DON'T USE IT ", "warn")
        this.connectionString = connectionString

        mongoose.connect(this.connectionString)
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
    }

    async createService({ name, description, environments }) {
        this._log(`create service ${name}`)
        let promises = []
        for (let enviorment of environments) {
            promises.push(this._createEnviorment(enviorment))
        }

        let newEnvironments = await Promise.all(promises)
        var service = new Service({
            name: name,
            description: description,
            environments: newEnvironments.map(env => env._id)
        })
        return service.save()
    }

    async updateConfig(serviceId, environmentName, data) {
        this._log(`update config, serviceId:${serviceId}, environmentName:${environmentName}`)
        const service = await this._findService(serviceId, environmentName)
        let enviorment = await Enviorment.findById(service.environments[0].id).exec()
        let newConfig = new Config({
            data: data,
            version: enviorment.configs.length
        })
        newConfig = await newConfig.save()
        enviorment.configs.push(newConfig.id)
        return enviorment.save()
    }

    async getConfigs(serviceId, env) {
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
            configs: service[0].environments[0].configs
        }
    }

    async getConfig(serviceId, env) {
        this._log(`get configs serviceId:${serviceId}, environmentName:${env}`)
        const allConfigs = await this.getConfigs(serviceId, env)
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
    _log(message, level = "info") {
        this.logger.log({ message: `Mongo Manger: ${message} `, level })
    }

    async _createEnviorment({ name, config }) {
        let newConfig = await this._createConfig(config)

        let enviorment = new Enviorment({
            name: name,
            configs: [newConfig._id]
        })

        return enviorment.save()
    }

    async _createConfig({ data, key }) {
        let config = new Config({
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