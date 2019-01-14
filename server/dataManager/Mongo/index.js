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
        let service = await Service.findById({ _id: serviceId, "environments.name": environmentName });
        let enviorment = await Enviorment.findById(service._id);

        let config = new Config({data: data, version: environments.configIds.length - 1});
        config = await config.save();

        enviorment.configIds.push(config._id);
        return enviorment.save();
    }

    getConfigs(serviceId, env) {
        console.log('get configs');
    }

    async getConfig(serviceId, env) {
        console.log('get config');
        return Service
            .findById({ _id: serviceId, "environments.name": env })
            .populate({ path: 'environments', populate: { path: 'configs' } })
            .exec();
    }

    async getAllEnv() {
        console.log('get all');
        let a = await Service.find({})
            .populate({ path: 'environments', populate: { path: 'configs' } })
            .exec();
        console.log(JSON.stringify(a, 0, 4));

        return a;
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