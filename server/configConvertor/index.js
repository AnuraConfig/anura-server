import convertJSON from "./convertJSON"
import convertYAML from "./convertYAML"
import convertText from "./convertText"

const typeDic = {
    "JSON": convertJSON,
    "YAML": convertYAML,
    "Text": convertText
}

// return false if the text value can't be parse according to the type
function isValid(text, type) {
    return typeDic[type].isValid(text)
}

function getObject(text, type) {
    try {
        return typeDic[type].getObject(text)
    } catch (error) {
        throw new Error("convent failed")
    }
}

export { isValid, getObject }