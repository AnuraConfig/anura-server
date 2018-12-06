import Configs from "./configsMock"

export default function (obj, args) {
    const { serviceId, environment } = args
    const service = Configs.find(s => s.id === serviceId)
    if (service) {
        return service.environments.find(e => e.name === environment)
    }
    return null
}