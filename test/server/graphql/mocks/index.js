export default class ManagerMock {
    async createService({ name, description, environments }) {
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }

    async updateConfig(serviceName, environmentName, data) {
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }

    async getConfigs(serviceName, env) {
      return new Promise((resolve, reject) => {
        resolve({
          "name": "env6",
          "configs": [{
            'version': 0,
            'data': '{test}',
            'type': 'YAML'
          }]
        })
      })
    }

    async getConfig(serviceName, env) {
      return new Promise((resolve, reject) => {
        resolve({})
      })
    }

    async getAllEnv() {
        return new Promise((resolve, reject) => {
            resolve([{
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
            }])
        }) 
    }
}