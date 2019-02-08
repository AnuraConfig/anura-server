import dataManager from '../../dataManager/index'

export default function (obj, args) {
    try {
        const { serviceId, environmentName, data, type } = args
        dataManager.manager.updateConfig(serviceId, environmentName, data, type)
        return {
            success: true
        };
    } catch (e) {
        return {
            success: false,
            error: e.message
        };
    }

}