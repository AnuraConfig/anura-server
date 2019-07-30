export function getConfigs(root, args, ctx, info) {
    return ctx.dataSources.getConfigs(args.serviceName, args.environment, args.raw)
}
export function latestConfig(root, args, ctx, info) {
    return ctx.dataSources.getConfig(args.serviceName, args.environment, args.raw, true)
}