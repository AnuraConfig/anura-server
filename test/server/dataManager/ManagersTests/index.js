import chai from "chai"
import newService from "./mocks/newService"
const { expect, should } = chai
should()

export function dataManagerRequestTests() {
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
        const config = await this.dataManager.getConfig("TestService", "wierd")
        const data = { "names": ["hen", "eyal", "ron"] }
        config.should.have.property("data").equal(JSON.stringify(data))
    })
    it("should get a single config with his raw data", async function () {
        const config = await this.dataManager.getConfig("TestService", "wierd", true)
        config.should.have.property("data").equal("names:\n    - hen\n    - eyal\n    - ron")
    })
}