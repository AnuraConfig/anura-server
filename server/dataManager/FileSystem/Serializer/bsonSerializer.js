import BSON from 'bson'

export default class BsonSerializer {
    serialize(json) {
        return BSON.serialize(json)
    }
    deserialize(data) {
        console.log(data)
        return BSON.deserialize(data)
    }
}