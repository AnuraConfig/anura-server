export default class BasicSerializer {
    serialize(json) {
        return JSON.stringify(json, 4, 'utf8')
    }
    deserialize(json) {
        return JSON.parse(json)
    }
}