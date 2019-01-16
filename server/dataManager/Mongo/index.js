import mongoose from 'mongoose';
import { Service, Enviorment, Config } from './schemas';
import { STORE_LOCATION } from '../../constants/environment'

export default class MongoManager {
    constructor(connectionString = STORE_LOCATION) {
        this.connectionString = connectionString;

        mongoose.connect(this.connectionString);
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    }

    async createService({ name, description, environments }) {
        let enviormentIds = [];
        for (let enviorment of environments) {
            let newEnviorment = await this._createEnviorment(enviorment);
            enviormentIds.push(newEnviorment._id);
        }

        var service = new Service({ name: name, description: description, environments: enviormentIds });
        return service.save();
    }

    async updateConfig(serviceId, environmentName, data) {
        // TODO: move to func
        const service = await Service
            .findOne({ _id: mongoose.Types.ObjectId(serviceId) })
            .populate({ path: 'environments', match: { name: environmentName } })
            .exec();
        let enviorment = await Enviorment.findById(service.environments[0].id).exec();
        let newConfig = new Config({data: data, version: enviorment.configs.length});
        newConfig = await newConfig.save();
        enviorment.configs.push(newConfig.id);
        return enviorment.save();
    }

    async getConfigs(serviceId, env) {
        const rawConfigs = await Service
            .find({ _id: mongoose.Types.ObjectId(serviceId) })
            .populate({ path: 'environments', populate: { path: 'configs' }, match: { name: env } })
            .exec();
        return {
            name: rawConfigs[0].environments[0].name, 
            configs: rawConfigs[0].environments[0].configs
        }
    }

    async getConfig(serviceId, env) {
        //TODO: move to mongo query..
        const allConfigs = await this.getConfigs(serviceId, env);
        return allConfigs.configs.sort(item => item.version).slice(-1)[0].data;
    }

    async getAllEnv() {
        return Service.find({})
            .populate({ path: 'environments', populate: { path: 'configs' } })
            .exec();
    }

    //#region privates

    async _createEnviorment({ name, config }) {
        let newConfig = await this._createConfig(config);

        let enviorment = new Enviorment({ name: name, configs: [newConfig._id] });
        return enviorment.save();
    }

    async _createConfig({ data, key }) {
        let config = new Config({ data: data, version: key || 0 });
        return config.save();
    }

    //#endregion
}