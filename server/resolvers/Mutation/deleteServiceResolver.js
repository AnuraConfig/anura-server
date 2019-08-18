import logger from '../../utils/logger'

export default function (root, args, ctx, info) {
    try {
        const { serviceName } = args
        ctx.dataSources.deleteService(serviceName)
        return {
            success: true
        }
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        return { success: false, error: e.message }
    }

}