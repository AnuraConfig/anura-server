import fs from 'fs'
import path from 'path'
import * as filesConst from '../../constants/filesConst'
import getSerializer from './Serializer'
import { HUMAN_READABLE, STORE_LOCATION } from '../../constants/environment'
import uuidv4 from 'uuid/v4'

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

function getFileName(baseName) {
    if (HUMAN_READABLE) {
        return baseName + filesConst.JSON_ENDING
    }
    return baseName
}

export default class FileSystemManager {
    constructor(location = STORE_LOCATION, serializer = getSerializer()) {
        this.serializer = serializer
        this.location = path.join(location, filesConst.BASE)
        createDir(this.location)
    }

    createInfoFile(item, dir) {
        fs.writeFileSync(path.format({ dir, base: getFileName(filesConst.INFO_FILE) }), this.serializer.serialize(item));
    }
    createConfigFile(dir, { data }, key) {
        fs.writeFileSync(path.format({ dir, base: getFileName(filesConst.CONFIG_PREFIX + key) }), this.serializer.serialize(data));
    }
    createEnv(serviceDir, { name, config }) {
        const envDir = path.join(serviceDir, name)
        createDir(envDir)
        this.createInfoFile({ id: uuidv4(), name, lastUpdate: new Date() }, envDir)
        this.createConfigFile(envDir, config, 0)
    }

    createService({ name, description, environments }) {
        const serviceDirectory = path.join(this.location, name)
        createDir(serviceDirectory)
        this.createInfoFile({ name, description, id: uuidv4(), lastUpdate: new Date() }, serviceDirectory)
        environments.forEach(this.createEnv.bind(this, serviceDirectory))
    }
    readInfos(source) {
        const isDirectory = source => fs.lstatSync(source).isDirectory()
        const directories = fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
        return directories.map(dir => {
            const infoFile = path.format({ dir, base: getFileName(filesConst.INFO_FILE) })
            const data = fs.readFileSync(infoFile)
            return this.serializer.deserialize(data);
        })
    }
    getAllServicesInfo() {
        return this.readInfos(this.location)
    }
    getAllEnv() {
        const rootService = this.getAllServicesInfo()
        return rootService.map(service => {
            const dir = path.join(this.location, service.name)
            const environments = this.readInfos(dir)
            return Object.assign({}, service, { environments })
        })
    }
}
