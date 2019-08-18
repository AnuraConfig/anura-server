import logger from '../../utils/logger'

export default function (root, args, ctx, info) {
    try {
        return ctx.dataSources.getService(args.serviceName, args.raw, args.lastConfig)
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        throw e
    }
}