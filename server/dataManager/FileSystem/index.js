import fs from 'fs'
import path from 'path'
import * as filesConst from '../../constants/filesConst'
import configManager from '../../constants/configs'
import { getFileName, getNameFromFile, getConfigVersion } from './helperFunctions'
import { getStateManager } from '../../stateManager/socket'
import configConvertor from '../../configConvertor'
import { validConfigType, logAndThrow } from '../common/validation'
import logger from '../../utils/logger'

export default class FileSystemManager {
    constructor(location = configManager.config.STORE_LOCATION, customLogger = logger, stateManager = getStateManager()) {
        this.logger = customLogger
        this._log("initialize")
        this.stateManager = stateManager
        this.location = path.join(location, filesConst.BASE)
        this._createDir(this.location)
    }

    createService({ name, description, environments }) {
        this._log(`create service ${name}`)
        const serviceDirectory = path.join(this.location, name)
        this._createDir(serviceDirectory)
        this._createInfoFile({ name, description, lastUpdate: new Date() }, serviceDirectory)
        environments.forEach(this._createEnv.bind(this, serviceDirectory))
    }

    updateConfig(serviceName, environmentName, data, type = "TEXT") {
        this._log(`update config, serviceName:${serviceName}, environmentName:${environmentName}`)
        const dir = path.join(this.location, serviceName, environmentName)
        this._validateUpdateConfig(dir, data, type)
        const configs = fs.readdirSync(dir)
        this._createConfigFile(dir, data, type, configs.length - 1)
        this.stateManager.emitChange(serviceName, environmentName)
    }

    getConfigs(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        const dir = path.join(this.location, serviceName, env)
        const configs = fs.readdirSync(dir)
            .filter(i => i !== filesConst.INFO_FILE)
            .map(filename => this._createConfigObject(dir, filename, raw))
        const envInfo = this._parseFile(dir, getFileName(filesConst.INFO_FILE))
        envInfo.configs = configs
        return envInfo
    }

    getConfig(serviceName, env, raw) {
        this._log(`get configs serviceName:${serviceName}, environmentName:${env}`)
        const dir = path.join(this.location, serviceName, env)
        const maxVersion = Math.max(...fs.readdirSync(dir)
            .map(getConfigVersion)
            .filter(i => !isNaN(i)))
        return Object.assign(
            { version: maxVersion },
            this._createConfigObject(dir, getFileName(filesConst.CONFIG_PREFIX + maxVersion), raw)
        )
    }

    getAllEnv() {
        this._log(`get all environment`)
        const rootService = this._getAllServicesInfo()
        return rootService.map(service => {
            const dir = path.join(this.location, service.name)
            const environments = this._readInfos(dir)
            return Object.assign({}, service, { environments })
        })
    }

    //#region privates
    _log = (message, level = "info") => {
        this.logger.log({ message: `File System Manger: ${message} `, level })
    }

    _createDir(dir) {
        if (!fs.existsSync(dir)) {
            this._log(`create directory, ${dir}`)
            fs.mkdirSync(dir)
        }
    }

    _validateUpdateConfig(dir, data, type) {
        if (!fs.existsSync(dir)) logAndThrow(`no such service or environment in service list`, this._log)
        validConfigType(data, type, this._log)
    }

    _createInfoFile(item, dir) {
        fs.writeFileSync(path.format({ dir, base: getFileName(filesConst.INFO_FILE) }), JSON.stringify(item));
    }
    _createConfigFile(dir, data, type, key) {
        const file = path.format({
            dir,
            base: getFileName(filesConst.CONFIG_PREFIX + key)
        })
        fs.writeFileSync(file, JSON.stringify({ data, type }));
    }
    _createEnv(serviceDir, { name, config }) {
        const envDir = path.join(serviceDir, name)
        validConfigType(config.data, config.type, this._log)
        this._createDir(envDir)
        this._createInfoFile({ name, lastUpdate: new Date() }, envDir)
        this._createConfigFile(envDir, config.data, config.type, 0)
    }
    _createConfigObject(dir, filename, raw) {
        let configFile = Object.assign({
            name: getNameFromFile(filename),
            version: getConfigVersion(filename)
        }, this._parseFile(dir, filename))
        if (raw)
            return configFile
        configFile.data = JSON.stringify(configConvertor.getObject(configFile.data, configFile.type))
        return configFile
    }
    _parseFile(dir, base) {
        const infoFile = path.format({ dir, base })
        const data = fs.readFileSync(infoFile, "utf8")
        return JSON.parse(data)
    }
    _readInfos(source) {
        const isDirectory = source => fs.lstatSync(source).isDirectory()
        const directories = fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
        return directories.map(dir => this._parseFile(dir, getFileName(filesConst.INFO_FILE)))
    }
    _getAllServicesInfo() {
        return this._readInfos(this.location)
    }
    //#endregion
}   