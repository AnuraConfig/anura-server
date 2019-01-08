import FileSystem from './FileSystem'
import { config } from '../constants/configs'
import * as managerTypes from '../constants/managerTypes'

function getDataManger() {
    switch (config.DATA_MANAGER.toUpperCase()) {
        case (managerTypes.FILE_SYSTEM):
            return new FileSystem();
        default:
            return new FileSystem();
    }
}
export default getDataManger()