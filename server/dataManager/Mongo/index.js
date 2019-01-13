import mongoose from 'mongoose';
import { Service, Enviorment, Config } from './schemas';

export default class MongoManager {
    constructor(connectionString) {
        this.connectionString = connectionString;

        mongoose.connect(this.connectionString);
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    }

    async createService({ name, description, environments }) {
        let enviormentIds = [];
        for(let enviorment of environments) {
            let newEnviorment = await this._createEnviorment(enviorment);
            enviormentIds.push(newEnviorment._id);
        }

        var service = new Service({name: name, description: description, enviormentIds: enviormentIds});
        return service.save();
    }

    updateConfig(serviceId, environmentName, data) {

    }

    getConfigs(serviceId, env) {

    }

    getConfig(serviceId, env) {

    }

    getAllEnv() {
        return Service.find({})
            .populate({path: 'enviormentIds', populate: {path: 'configIds'}})
            .exec();
    }

    //#region privates

    async _createEnviorment({ name, config }) {
        let newConfig = await this._createConfig(config);

        let enviorment = new Enviorment({name: name, configIds: [newConfig._id]});
        return enviorment.save();
    }

    async _createConfig({ data, key }) {
        let config = new Config({ data: data, version: key });
        return config.save();
    }

    //#endregion
}