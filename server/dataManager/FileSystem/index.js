import fs from 'fs'
import path from 'path'
import rimraf from "rimraf"
import * as filesConst from '../../constants/filesConst'
import { getFileName, getNameFromFile, getConfigVersion } from './helperFunctions'
import configConvertor from '../../configConvertor'
import configManager from '../../constants/configs'
import { validConfigType, logAndThrow } from '../common/validation'
import DataConnectorsAbstract from '../common/DataConnectorsAbstract'

export default class FileSystemManager extends DataConnectorsAbstract {

    constructor(logger, location = configManager.config.STORE_LOCATION) {
        super()
        this.location = path.join(location, filesConst.BASE)
        this._createDir(this.location)
    }
    static getName = () => "File System"

    createService({ name, description, environments }) {
        const serviceDirectory = path.join(this.location, name)
        this._createDir(serviceDirectory)
        this._createInfoFile({ name, description, lastUpdate: new Date() }, serviceDirectory)
        environments.forEach(this._createEnv.bind(this, serviceDirectory))
    }

    getService(serviceName, raw, lastConfig) {
        const dir = path.join(this.location, serviceName)
        const environments = this._getAllEnvironments(dir, serviceName, raw, lastConfig)
        const serviceInfo = this._parseFile(dir, getFileName(filesConst.INFO_FILE))
        serviceInfo.environments = environments
        return serviceInfo
    }

    updateService(updatedService, originalName) {
        const { name } = updatedService
        const serviceDirectory = path.join(this.location, name)
        if (name !== originalName)
            fs.renameSync(path.join(this.location, originalName), serviceDirectory)
        const environments = this._getAllEnvironments(serviceDirectory, name, false, true)
        this._updateEnvironments(updatedService.environments, environments, serviceDirectory)
        const deprecatedEnv = environments
            .filter(oldEnv => !updatedService.environments.find(newEnv => oldEnv.name === newEnv.name))
        for (let env of deprecatedEnv) {
            rimraf.sync(path.join(serviceDirectory, env.name))
        }
    }

    updateConfig(serviceName, environmentName, data, type = "TEXT") {
        const dir = path.join(this.location, serviceName, environmentName)
        this._validateUpdateConfig(dir, data, type)
        const configs = fs.readdirSync(dir)
        this._createConfigFile(dir, data, type, configs.length - 1)
    }

    getConfigs(serviceName, env, raw, lastConfig) {
        const dir = path.join(this.location, serviceName, env)
        let configs = fs.readdirSync(dir)
            .filter(i => i !== filesConst.INFO_FILE)
            .map(filename => this._createConfigObject(dir, filename, raw))
        if (lastConfig) {
            const maxVersion = Math.max(...configs.map(i => i.version))
            configs = configs.filter(i => parseInt(i.version) === maxVersion)
        }
        const envInfo = this._parseFile(dir, getFileName(filesConst.INFO_FILE))
        envInfo.configs = configs
        return envInfo
    }

    getConfig(serviceName, env, raw) {
        const dir = path.join(this.location, serviceName, env)
        const maxVersion = this._getMaxVersion(fs.readdirSync(dir))
        return Object.assign(
            { version: maxVersion },
            this._createConfigObject(dir, getFileName(filesConst.CONFIG_PREFIX + maxVersion), raw)
        )
    }

    getAllEnv() {
        const rootService = this._getAllServicesInfo()
        return rootService.map(service => {
            const dir = path.join(this.location, service.name)
            const environments = this._readInfos(dir)
            return Object.assign({}, service, { environments })
        })
    }

    //#region privates
    _updateEnvironments(newEnvironments, oldEnvironments, serviceDirectory) {
        for (let environment of newEnvironments) {
            const oldEnv = oldEnvironments.find(i => i.name === environment.name)
            if (!oldEnv) {
                this._createEnv(serviceDirectory, environment)
            } else {
                if (oldEnv.configs[0].data !== environment.config.data) {
                    rimraf.sync(path.join(serviceDirectory, environment.name))
                    this._createEnv(serviceDirectory, environment)
                }
            }
        }
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
    _getAllEnvironments(dir, serviceName, raw = false, lastConfig = false) {
        return fs.readdirSync(dir)
            .filter(i => i !== filesConst.INFO_FILE)
            .map(envName => this.getConfigs(serviceName, envName, raw, lastConfig))
    }
    _getMaxVersion(configs) {
        return Math.max(...configs
            .map(getConfigVersion)
            .filter(i => !isNaN(i)))
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