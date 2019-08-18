import logger from '../../utils/logger'

export default function (root, args, ctx, info) {
    try {
        const { service, originalName } = args
        ctx.dataSources.updateService(service, originalName)
        return {
            success: true
        }
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        return { success: false, error: e.message }
    }

}