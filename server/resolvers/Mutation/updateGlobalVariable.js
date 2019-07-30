export default function (root, args, ctx, info) {
    try {
        const { globalVariable } = args
        ctx.dataSources.updateGlobalVariable(globalVariable)
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