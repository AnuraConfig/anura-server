import FileSystem from './FileSystem'

import managerTypes from '../constants/managerTypes'

export default function getDataManger() {
    switch (process.env.DATA_MANAGER.toUpperCase()) {
        case (managerTypes.FILE_SYSTEM):
            return FileSystem;
        default:
            return FileSystem;
    }
}