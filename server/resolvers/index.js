import service from './serviceResolver';
import configs from './configResolver';
import {updateConfig} from './mutationsResolver';

const resolveFunctions = {
    Query: {
        service,
        configs
    },
    Mutation: {
        updateConfig
    }
}
export default resolveFunctions