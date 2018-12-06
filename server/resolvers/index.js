import service from './serviceResolver';
import configs from './configResolver';

const resolveFunctions = {
    Query: {
        service,
        configs
    }
}
export default resolveFunctions