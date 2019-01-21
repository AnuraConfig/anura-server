
import * as filesConst from '../../constants/filesConst'
import { config } from '../../constants/configs'

export function getFileName(baseName) {
    if (config.HUMAN_READABLE) {
        return baseName + filesConst.JSON_ENDING
    }
    return baseName
}
export function getNameFromFile(filename) {
    if (config.HUMAN_READABLE) {
        filename.split('.').slice(0, -1).join('.')
    }
    return filename
}
export function getConfigVersion(filename) {
    return parseInt(filename.slice(filesConst.CONFIG_PREFIX.length, filename.length))
}