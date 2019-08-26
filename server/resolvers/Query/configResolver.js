import logger from '../../utils/logger'

export function getConfigs(root, args, ctx, info) {
    try {
        return ctx.dataSources.getConfigs(args.serviceName, args.environment, args.raw)
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        throw e
    }
}
export function latestConfig(root, args, ctx, info) {
    try {
        return ctx.dataSources.getConfig(args.serviceName, args.environment, args.raw, true)
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        throw e
    }
}