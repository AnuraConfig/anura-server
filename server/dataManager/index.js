import FileSystem from './FileSystem'
import { config } from '../constants/configs'
import * as managerTypes from '../constants/managerTypes'

function getDataManager() {
    switch (config.DATA_MANAGER.toUpperCase()) {
        case (managerTypes.FILE_SYSTEM):
            return new FileSystem();
        default:
            return new FileSystem();
    }
}
let dataManager

export function initializeDataManager() {
    dataManager = getDataManager()
    return dataManager
}

export default dataManager