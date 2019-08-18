import logger from '../../utils/logger'

export default function (root, args, ctx, info) {
    try {
        const { key, value } = args
        ctx.dataSources.updateGlobalSingleVariable(key, value)
        return {
            success: true
        }
    } catch (e) {
        logger.log({ level: "error", message: e.message })
        return { success: false, error: e.message }
    }

}