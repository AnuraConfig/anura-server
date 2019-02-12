export default class ManagerMock {
    constructor() {
        this.state = [{
            id: 6
        }]
    }

    async createService({ name, description, environments }) {
    }

    async updateConfig(serviceId, environmentName, data) {
    }

    async getConfigs(serviceId, env) {
    }

    async getConfig(serviceId, env) {
    }

    async getAllEnv() {
        return new Promise((resolve, reject) => {
            resolve(this.state)
        }) 
    }
}