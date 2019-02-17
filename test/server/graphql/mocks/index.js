export default class ManagerMock {
    constructor() {
        this.state = [{
            "id": "6",
            "name": "name6",
            "description": "desc6",
            "environments": [
              {
                "name": "env",
                "configs": [{
                    'version':1,
                    'data': '{}',
                    'type': 'json'
                    }
                ]
              }
            ]
          },
          {
            "id": "66",
            "name": "name66",
            "description": null,
            "environments": [
              {
                "name": "env2",
                "configs": [{
                    'version':2,
                    'data': '{a}',
                    'type': 'json'
                    }
                ]
              }
            ]
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