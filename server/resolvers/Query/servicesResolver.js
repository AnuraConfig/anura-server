import logger from '../../utils/logger'

export default function (root, args, ctx, info) {
    try {
        return ctx.dataSources.getAllEnv()
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        throw e
    }
}