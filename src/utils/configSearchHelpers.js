const NAME_MULTIPLAYER = 10;
const DESCRIPTION_MULTIPLAYER = 1;

export function configFilter(text) {
    return function ({ name, discretion }) {
        if (!text) return true
        return (name.indexOf(text) !== -1 || discretion.indexOf(text) !== -1)
    }
}

function getItemScore(text, itemValue) {
    return itemValue.length - itemValue.indexOf(text)
}
function getScore(text, { name, discretion }) {
    return NAME_MULTIPLAYER * getItemScore(text, name) +
        DESCRIPTION_MULTIPLAYER * getItemScore(text, discretion)
}

export function configSort(text) {
    return function (a, b) {
        if (!text) return 0
        return getScore(text, b) - getScore(text, a)
    }
}