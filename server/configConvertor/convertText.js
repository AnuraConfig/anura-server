function isValid(text) {
    return typeof text === "string"
}

function getObject(text) {
    return { value: text }
}

export default { isValid, getObject }