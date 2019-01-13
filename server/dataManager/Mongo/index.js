import mongoose from 'mongoose';
import { Service, Enviorment, Config } from './schemas';

export default class MongoManager {
    constructor(connectionString) {
        this.connectionString = connectionString;

        mongoose.connect(this.connectionString);
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    }

    createService({ name, description, environments }) {
        //var service = new Service({name: name, description: description, })
    }

    updateConfig(serviceId, environmentName, data) {

    }

    getConfigs(serviceId, env) {

    }

    getConfig(serviceId, env) {

    }

    getAllEnv() {

    }

    //#region privates

    _createEnviorment({ name, config }) {

    }

    async _createConfig({ data, key }) {
        let config = new Config({ data: data, version: key });
        return await config.save()._id;
    }

    //#endregion
}