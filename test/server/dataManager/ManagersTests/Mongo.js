import chai from "chai"
import { Service, Environment, Config } from '../../../../server/dataManager/Mongo/schemas';
import mongoose from 'mongoose';
import MongoManager from "../../../../server/dataManager/Mongo";
import { StateMangerMock } from "./mocks/stateManger"
import dataManagerRequestTests from "./common/dataManagerRequestTests "
import newService from "./mocks/newService"

mongoose.models = {};
mongoose.modelSchemas = {};

const expect = chai.expect

describe("Mongo data manager", function () {
    describe("check requests", function () {
        before(function (done) {
            this.dataManager = new MongoManager("mongodb://localhost:27017/test", { log: () => { } }, StateMangerMock,
                () => {
                    done()
                })
        })
        beforeEach(async function () {
            await this.dataManager.createService(newService)
        });

        dataManagerRequestTests()

        afterEach(async function () {
            await Service.deleteMany({})
            await Environment.deleteMany({})
            await Config.deleteMany({})
        })

    })
})