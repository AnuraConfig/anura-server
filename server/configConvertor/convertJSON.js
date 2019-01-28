function isValid(text) {
    try {
        JSON.parse(text)
    } catch (e) {
        return false
    }
    return true
}

function getObject(text) {
    return JSON.parse(text)
}

export default { isValid, getObject }