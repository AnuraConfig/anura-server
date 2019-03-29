import chai from "chai"
import _ from "lodash"
import newService from "../mocks/newService"
import { newEnvironment } from "../mocks/testObject"

const { expect, should } = chai
should()

export default function dataManagerRequestTests() {
    it("should load all the services", async function () {
        const serviceEnv = await this.dataManager.getAllEnv()
        expect(serviceEnv).to.have.lengthOf(1)
        expect(serviceEnv[0]).to.have.property("name").equal("TestService")
    })
    it("should load all the environments", async function () {
        const serviceEnv = await this.dataManager.getAllEnv()
        expect(serviceEnv[0]).to.have.property("environments").with.lengthOf(3)
    })
    it("should get a single config with his string object data", async function () {
        const config = await this.dataManager.getConfig("TestService", "yamlConfig")
        const data = { "names": ["hen", "eyal", "ron"] }
        config.should.have.property("data").equal(JSON.stringify(data))
    })
    it("should get a single config with his raw data", async function () {
        const config = await this.dataManager.getConfig("TestService", "yamlConfig", true)
        config.should.have.property("data").equal("names:\n    - hen\n    - eyal\n    - ron")
    })
    it("should update config data", async function () {
        const newConfig = { newConfig: "yey" }
        await this.dataManager.updateConfig("TestService", "prod", JSON.stringify(newConfig), "JSON")
        const config = await this.dataManager.getConfig("TestService", "prod", true)
        expect(newConfig).to.deep.equal(JSON.parse(config.data))
    })
    it("should update config type", async function () {
        const newConfig = { newConfig: "yey" }
        await this.dataManager.updateConfig("TestService", "yamlConfig", JSON.stringify(newConfig), "JSON")
        const config = await this.dataManager.getConfig("TestService", "yamlConfig")
        expect("JSON").to.deep.equal(config.type)
    })
    it("should update config default type", async function () {
        const newConfig = "this is some custom config I cant read"
        await this.dataManager.updateConfig("TestService", "yamlConfig", newConfig)
        const config = await this.dataManager.getConfig("TestService", "yamlConfig")
        expect(JSON.stringify({ value: newConfig })).to.equal(config.data)
    })
    it("should update config default type raw", async function () {
        const newConfig = "this is some custom config I cant read"
        await this.dataManager.updateConfig("TestService", "yamlConfig", newConfig)
        const config = await this.dataManager.getConfig("TestService", "yamlConfig", true)
        expect(newConfig).to.equal(config.data)
    })
    it("should get the list of configs for this service and env", async function () {
        const configs = await this.dataManager.getConfigs("TestService", "yamlConfig")
        const data = { "names": ["hen", "eyal", "ron"] }
        expect(configs.configs[0].data).to.equal(JSON.stringify(data))
        expect(configs.configs[0].version).to.equal(0)
    })
    it("should update the list of configs and return in all configs", async function () {
        const newConfig = "this is some custom config I cant read"
        await this.dataManager.updateConfig("TestService", "yamlConfig", newConfig)
        const configs = await this.dataManager.getConfigs("TestService", "yamlConfig", true)
        expect(configs.configs).lengthOf(2)
        const newConfigReturn = configs.configs.find(i => i.version === 1)
        expect(newConfigReturn.data).to.equal(newConfig)
    })
    it("should add new env to service", async function () {
        const copyService = _.cloneDeep(newService)
        copyService.environments.push(newEnvironment)
        this.dataManager.updateService(copyService, newService.name)
        await this.dataManager.getConfig("TestService", "newEnv")
    })
    it("should change service name", async function () {
        const copyService = _.cloneDeep(newService)
        copyService.name = "new name"
        this.dataManager.updateService(copyService, newService.name)
        await this.dataManager.getService("new name")
    })
    it("should remove env from service", async function () {
        const copyService = _.cloneDeep(newService)
        copyService.environments.push(newEnvironment)
        this.dataManager.updateService(copyService, newService.name)
        await this.dataManager.getConfig("TestService", "newEnv")
    })
}