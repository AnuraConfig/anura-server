


export default class DataConnectorsAbstract {
    constructor(log, stateManager) {
        this.log = log
        this.stateManager = stateManager
    }
    async createService({ name, description, environments }) {
        throw new Error("Not Implement")
    }
    async updateService(updatedService, originalName) {
        throw new Error("Not Implement")
    }
    async updateConfig(serviceName, environmentName, data, type = "TEXT") {
        throw new Error("Not Implement")
    }
    async getService(serviceName, raw, lastConfig) {
        throw new Error("Not Implement")
    }
    async getConfigs(serviceName, env, raw) {
        throw new Error("Not Implement")
    }
    async getConfig(serviceName, env, raw) {
        throw new Error("Not Implement")
    }
    async getAllEnv() {
        throw new Error("Not Implement")
    }

}