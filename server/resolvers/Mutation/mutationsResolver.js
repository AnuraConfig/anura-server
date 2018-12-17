import dataManager from '../../dataManager/index'

export default function (obj, args) {
    try {
        const { serviceId, environment, data } = args
        dataManager.updateConfig(serviceId, environment, data)
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