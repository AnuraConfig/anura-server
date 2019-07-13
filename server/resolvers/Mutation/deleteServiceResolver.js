export default function (root, args, ctx, info) {
    try {
        const { serviceName } = args
        ctx.dataSources.deleteService(serviceName)
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