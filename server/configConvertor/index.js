import convertJSON from "./convertJSON"
import convertYAML from "./convertYAML"
import convertText from "./convertText"

const typeDic = {
    "JSON": convertJSON,
    "YAML": convertYAML,
    "TEXT": convertText
}

// return false if the text value can't be parse according to the type
function isValid(text, type) {
    const upperType = type.toUpperCase()
    if (typeDic[upperType])
        return typeDic[upperType].isValid(text)
    else
        throw new Error(`No such type ${type}`)
}

function getObject(text, type) {
    const upperType = type.toUpperCase()
    if (typeDic[upperType])
        return typeDic[upperType].getObject(text)
    else
        throw new Error("No such type")
}

export default { isValid, getObject, typeDic }