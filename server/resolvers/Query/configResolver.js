import dataManager from '../../dataManager'

export function getConfigs(obj, args) {
    return dataManager.getConfigs(args.serviceId, args.environment)
}
export function latestConfig(obj, args) {
    return dataManager.getConfig(args.serviceId, args.environment)
}