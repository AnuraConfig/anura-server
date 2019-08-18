export default function (root, args, ctx, info) {
    try {
        ctx.dataSources.createService(args.service)
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