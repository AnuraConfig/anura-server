import dataManager from '../../dataManager'

export function getConfigs(obj, args) {
    return dataManager.manager.getConfigs(args.serviceId, args.environment)
}
export function latestConfig(obj, args) {
    return dataManager.manager.getConfig(args.serviceId, args.environment)
}