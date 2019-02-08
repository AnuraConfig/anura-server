import YAML from 'js-yaml'


function isValid(text) {
    const obj = YAML.safeLoad(text)
    return typeof obj === "object"
}

function getObject(text) {
    return YAML.safeLoad(text)
}

export default { isValid, getObject }