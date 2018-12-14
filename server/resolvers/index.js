import service from './Query/serviceResolver';
import configs from './Query/configResolver';
import newService from './Mutation/newServiceResolver';
import { updateConfig } from './Mutation/mutationsResolver';

const resolveFunctions = {
    Query: {
        service,
        configs
    },
    Mutation: {
        newService,
        updateConfig
    }
}
export default resolveFunctions