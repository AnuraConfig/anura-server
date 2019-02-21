export default function (root, args, ctx, info) {
    try {
        const { serviceId, environmentName, data, type } = args
        ctx.dataSources.updateConfig(serviceId, environmentName, data, type)
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