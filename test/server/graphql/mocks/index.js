export default class MockManager {
    constructor() {
        this.state = {
            
        }
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