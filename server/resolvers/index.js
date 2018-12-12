import service from './serviceResolver';
import configs from './configResolver';
import newService from './newServiceResolver';
import { updateConfig } from './mutationsResolver';

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