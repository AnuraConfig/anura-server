export default function (root, args, ctx, info) {
    try {
        const { service, originalName } = args
        ctx.dataSources.updateService(service, originalName)
        return {
            success: true
        };
    } catch (e) {
        return {
            success: false,
            error: e.message
        };
    }

}