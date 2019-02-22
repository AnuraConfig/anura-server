import winston from "winston"
import configManager from "../constants/configs"

const { combine, timestamp, json, simple } = winston.format;

class Logger {
    constructor() {
        this.awaitLogs = []
        configManager.subscribeCallback(this.loadConfig.bind(this))
    }

    log(...args) {
        if (this.logger === undefined)
            this.awaitLogs.push(args)
        else
            this.logger.log(...args)
    }

    loadConfig(config) {
        this.initializeLogger(config)
        for (let configArgs of this.awaitLogs) {
            this.logger.log(...configArgs)
        }
    }

    initializeLogger(config) {
        this.logger = winston.createLogger(this._getLoggerBasicInfo(config));
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({ format: simple() }));
        }
    }

    _getLoggerBasicInfo(config) {
        const configLog = config.LOG
        return {
            level: configLog.LEVEL,
            format: combine(
                timestamp(),
                json()
            ),
            transports: this._getTransports(configLog)
        }
    }

    _getTransports(config) {
        const transports = []
        if (config.ERROR_LOG_FILE)
            transports.push(new winston.transports.File({ filename: config.ERROR_LOG_FILE, level: 'error' }))
        if (config.LOG_FILE)
            transports.push(new winston.transports.File({ filename: config.LOG_FILE }))
        return transports
    }
}

const logger = new Logger();
export default logger