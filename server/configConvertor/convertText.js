function isValid(text) {
    return typeof text === "string"
}

function getObject(text) {
    return text
}

export default { isValid, getObject }