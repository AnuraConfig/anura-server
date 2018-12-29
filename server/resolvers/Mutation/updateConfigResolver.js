import dataManager from '../../dataManager/index'

export default function (obj, args) {
    try {
        const { serviceId, environmentName, data } = args
        dataManager.updateConfig(serviceId, environmentName, data)
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