import service from './Query/serviceResolver';
import { getConfigs, latestConfig } from './Query/configResolver';
import newService from './Mutation/newServiceResolver';
import updateConfig from './Mutation/updateConfigResolver';

const resolveFunctions = {
    Query: {
        service,
        getConfigs,
        latestConfig,
    },
    Mutation: {
        newService,
        updateConfig
    }
}
export default resolveFunctions