export default function (root, args, ctx, info) {
    return ctx.dataSources.getService(args.serviceName, args.raw)
}