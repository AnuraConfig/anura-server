import FileSystem from './FileSystem'
import configManager from '../constants/configs'
import * as managerTypes from '../constants/managerTypes'
import MongoManager from './Mongo';

class DataManager {
    constructor() {
        this.manager = undefined
    }
    initializeDataManager = () => {
        this.manager = this._getDataManager()
        return this.manager
    }
    _getDataManager = () => {
        switch (configManager.config.DATA_MANAGER.toUpperCase()) {
            case (managerTypes.FILE_SYSTEM):
                return new FileSystem();
            case(managerTypes.MONGO):
                return new MongoManager();
            default:
                return new FileSystem();
        }
    }
}

export default new DataManager()
