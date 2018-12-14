import dataManager from '../../dataManager'

export default function (obj, args) {
    return dataManager.getConfigs(args.serviceId, args.environment)
}