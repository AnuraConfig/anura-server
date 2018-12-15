import fs from 'fs'
import path from 'path'
import uuidv4 from 'uuid/v4'
import * as filesConst from '../../constants/filesConst'
import getSerializer from './Serializer'
import { STORE_LOCATION } from '../../constants/environment'
import { getFileName, getNameFromFile, getConfigVersion } from './helperFunctions'
import { getStateManager } from '../../stateManager/scoket'

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
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
    createConfigFile(dir, data, key) {
        fs.writeFileSync(path.format({ dir, base: getFileName(filesConst.CONFIG_PREFIX + key) }),
            this.serializer.serialize(JSON.parse(data)));
    }
    createEnv(serviceDir, { name, config }) {
        const envDir = path.join(serviceDir, name)
        createDir(envDir)
        this.createInfoFile({ name, lastUpdate: new Date() }, envDir)
        this.createConfigFile(envDir, config.data, 0)
    }
    createService({ name, description, environments }) {
        const serviceId = uuidv4()
        const serviceDirectory = path.join(this.location, serviceId)
        createDir(serviceDirectory)
        this.createInfoFile({ name, description, id: serviceId, lastUpdate: new Date() }, serviceDirectory)
        environments.forEach(this.createEnv.bind(this, serviceDirectory))
    }
    parseFile(dir, base) {
        const infoFile = path.format({ dir, base })
        const data = fs.readFileSync(infoFile)
        return this.serializer.deserialize(data)
    }
    readInfos(source) {
        const isDirectory = source => fs.lstatSync(source).isDirectory()
        const directories = fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
        return directories.map(dir => this.parseFile(dir, getFileName(filesConst.INFO_FILE)))
    }
    getAllServicesInfo() {
        return this.readInfos(this.location)
    }
    getAllEnv() {
        const rootService = this.getAllServicesInfo()
        return rootService.map(service => {
            const dir = path.join(this.location, service.id)
            const environments = this.readInfos(dir)
            return Object.assign({}, service, { environments })
        })
    }
    updateConfig(serviceId, environmentName, data) {
        const dir = path.join(this.location, serviceId, environmentName)
        if (!fs.existsSync(dir)) throw new Error("no such service or environment in service")
        const configs = fs.readdirSync(dir)
        this.createConfigFile(dir, data, configs.length - 1)
        getStateManager().emitChange(serviceId, environmentName)
    }
    createConfigObject(filename, dir) {
        return {
            name: getNameFromFile(filename),
            version: getConfigVersion(filename),
            data: JSON.stringify(this.parseFile(dir, filename))
        }
    }
    getConfigs(serviceId, env) {
        const dir = path.join(this.location, serviceId, env)
        const configs = fs.readdirSync(dir)
            .filter(i => i !== filesConst.INFO_FILE)
            .map(filename => this.createConfigObject(filename, dir))
        const envInfo = this.parseFile(dir, getFileName(filesConst.INFO_FILE))
        envInfo.configs = configs
        return envInfo
    }
    getConfig(serviceId, env) {
        const dir = path.join(this.location, serviceId, env)
        const maxVersion = Math.max(fs.readdirSync(dir)
            .map(getConfigVersion))
        return this.parseFile(dir, getFileName(filesConst.CONFIG_PREFIX + maxVersion))
    }
}