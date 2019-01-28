export default class BasicSerializer {
    serialize(json) {
        return JSON.stringify(json, null, 4)
    }
    deserialize(json) {
        return JSON.parse(json)
    }
}