import configManager from '../constants/configs'
import { PLUGIN_SRC_DIR } from '../constants/constants'

export default function loadDataManagerPlugins() {
    const plugins = configManager.config.PLUGINS.DATA_MANAGER
    let dataMangers = []
    for (const plugin of plugins) {
        dataMangers.push(require(getPlugin(plugin)).default)
    }
    return dataMangers
}

function getPlugin(plugin) {
    if (isRoute(plugin)) {
        return plugin + PLUGIN_SRC_DIR
    }
    return plugin
}

function isRoute(plugin) {
    return !(plugin.indexOf('/') === -1)
}