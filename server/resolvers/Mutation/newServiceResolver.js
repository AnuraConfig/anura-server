import dataManager from '../../dataManager/index'

export default function (obj, args) {
    try {
        dataManager.manager.createService(args.service)
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