import BSON from 'bson'

export default class BsonSerializer {
    serialize(json) {
        return BSON.serialize(json)
    }
    deserialize(json) {
        return BSON.deserialize(json)
    }
}