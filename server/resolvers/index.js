import service from './Query/serviceResolver'
import services from './Query/servicesResolver'
import { getConfigs, latestConfig } from './Query/configResolver'
import newService from './Mutation/newServiceResolver'
import updateConfig from './Mutation/updateConfigResolver'
import updateService from './Mutation/updateServiceResolver'
import deleteService from './Mutation/deleteServiceResolver'
import updateGlobalVariable from './Mutation/updateGlobalVariable'

const resolveFunctions = {
    Query: {
        service,
        services,
        getConfigs,
        latestConfig,
    },
    Mutation: {
        newService,
        deleteService,
        updateConfig,
        updateService,
        updateGlobalVariable
    }
}
export default resolveFunctions