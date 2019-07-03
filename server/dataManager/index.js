//import MongoManager from './Mongo'
import DataManagerWrapper from './DataManagerWrapper'
import loadDataManagerPlugins from '../pluginLoader/dataManager'

class DataManager {
    constructor() {
        this.manager = undefined
    }
    initializeDataManager = () => {
        this.manager = new DataManagerWrapper(loadDataManagerPlugins()[0])
        return this.manager
    }
}

export default new DataManager()
