import FileSystem from './FileSystem'
import MongoManager from './Mongo'
import DataManagerWrapper from './DataManagerWrapper'
import configManager from '../constants/configs'
import * as managerTypes from '../constants/managerTypes'

class DataManager {
    constructor() {
        this.manager = undefined
    }
    initializeDataManager = () => {
        this.manager = new DataManagerWrapper(this._getDataConnector())
        return this.manager
    }
    _getDataConnector = () => {
        switch (configManager.config.DATA_MANAGER.toUpperCase()) {
            case (managerTypes.FILE_SYSTEM):
                return FileSystem
            case (managerTypes.MONGO):
                return MongoManager
            default:
                return FileSystem
        }
    }
}

export default new DataManager()
