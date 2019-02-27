import chai from "chai"
import path from "path"
import fs from "fs"
import rimraf from "rimraf"
import FileSystemManager from "../../../../server/dataManager/FileSystem";
import { dataManagerRequestTests } from "./index"
import newService from "./mocks/newService"
import { StateMangerMock } from "./mocks/stateManger"


const expect = chai.expect

describe("FileSystem", function () {
    describe("check requests", function () {
        beforeEach(function () {
            this.filePath = path.join(__dirname, `./mocks/temps_configs_${Math.random()}`) //reduce the probability of conflict 
            fs.mkdirSync(this.filePath)
            this.dataManager = new FileSystemManager(this.filePath, { log: () => { } }, StateMangerMock)
            this.dataManager.createService(newService)
        });

        dataManagerRequestTests()

        afterEach(function () {
            if (fs.existsSync(this.filePath))
                rimraf.sync(this.filePath);
        });
    })
})