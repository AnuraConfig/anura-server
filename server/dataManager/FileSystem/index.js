import fs from 'fs'
import path from 'path'
import filesConst from '../../constants/filesConst'
import getSerializer from './Serializer'

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

function getFileName(baseName) {
    if (process.env.HUMAN_READABLE) {
        return baseName + filesConst.JSON_ENDING
    }
    return baseName
}

export default class FileSystemManager {
    constructor(location, serializer = getSerializer()) {
        this.serializer = serializer
        this.location = path.join(location, filesConst.BASE)
        createDir(this.location)
    }

    createInfoFile(item, path) {
        fs.writeFileSync(path.join(path, getFileName(filesConst.INFO_FILE)), this.serializer.serialize(item));
    }

    createEnv(serviceDir, { id, name, configs }) {
        const envDir = path.join(serviceDir, name)
        createDir(envDir)
        this.createInfoFile({ id, name, lastUpdate: new Date() }, envDir)

    }

    createService({ name, description, id, environments }) {
        const serviceDirectory = path.join(this.location, name)
        createDir(serviceDirectory)
        this.createInfoFile({ name, description, id, lastUpdate: new Date() }, serviceDirectory)
        environments.forEach(this.createEnv.bind(this, serviceDirectory))
    }


}
