import FileSystem from './FileSystem'
import configManager from '../constants/configs'
import * as managerTypes from '../constants/managerTypes'
import MongoManager from './Mongo';
const config = configManager.config

class DataManager {
    constructor() {
        this.manager = undefined
    }
    getDataManager = () => {
        switch (config.DATA_MANAGER.toUpperCase()) {
            case (managerTypes.FILE_SYSTEM):
                return new FileSystem();
            case(managerTypes.MONGO):
                return new MongoManager();
            default:
                return new FileSystem();
        }
    }
    initializeDataManager = () => {
        this.manager = this.getDataManager()
        return this.manager
    }
}

export default new DataManager()
