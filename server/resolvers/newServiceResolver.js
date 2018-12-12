import dataManager from '../dataManager/index'

export default function (obj, args) {
    try {
        dataManager.createService(args.service)
        return {
            success: true
        };
    } catch (e) {
        return {
            success: true,
            error: e.message
        };
    }

}