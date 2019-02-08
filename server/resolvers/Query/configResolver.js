import dataManager from '../../dataManager'

export function getConfigs(obj, args) {
    return dataManager.manager.getConfigs(args.serviceId, args.environment, args.raw)
}
export function latestConfig(obj, args) {
    return dataManager.manager.getConfig(args.serviceId, args.environment, args.raw)
}