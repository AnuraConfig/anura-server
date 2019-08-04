import service from './Query/serviceResolver'
import services from './Query/servicesResolver'
import { getConfigs, latestConfig } from './Query/configResolver'
import getGlobalVariable from './Query/getGlobalVariable'
import newService from './Mutation/newServiceResolver'
import updateConfig from './Mutation/updateConfigResolver'
import updateService from './Mutation/updateServiceResolver'
import deleteService from './Mutation/deleteServiceResolver'
import updateGlobalVariable from './Mutation/updateGlobalVariable'
import updateGlobalSingleVariable from './Mutation/updateGlobalSingleVariable'

const resolveFunctions = {
    Query: {
        service,
        services,
        getConfigs,
        latestConfig,
        getGlobalVariable
    },
    Mutation: {
        newService,
        deleteService,
        updateConfig,
        updateService,
        updateGlobalVariable,
        updateGlobalSingleVariable
    }
}
export default resolveFunctions