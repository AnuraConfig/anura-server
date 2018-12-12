import BasicSerializer from './basicSerializer'
import BsonSerializer from './bsonSerializer'

export default function getSerializer(...args) {
    if (process.env.HUMAN_READABLE) {
        return new BasicSerializer(args)
    }
    return new BsonSerializer(args)
}