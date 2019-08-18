import path from "path"
import fs from "fs"

const logDir = path.join(__dirname, '../log')
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

export default {
    STORE_LOCATION: path.join(__dirname, '../'),
    LOG: {
        LOG_FILE: path.join(__dirname, '../log/logs.log'),
        ERROR_LOG_FILE: path.join(__dirname, '../log/error.log'),
    }
}