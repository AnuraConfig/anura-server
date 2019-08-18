export default function (root, args, ctx, info) {
    try {
        const { key, value } = args
        ctx.dataSources.updateGlobalSingleVariable(key, value)
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