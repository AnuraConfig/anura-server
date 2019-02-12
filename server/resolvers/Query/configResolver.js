export function getConfigs(root, args, ctx, info) {
    return ctx.dataSources.getConfigs(args.serviceId, args.environment, args.raw)
}
export function latestConfig(root, args, ctx, info) {
    return ctx.dataSources.getConfig(args.serviceId, args.environment, args.raw)
}