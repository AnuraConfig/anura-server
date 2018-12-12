import BasicSerializer from './basicSerializer'
import BsonSerializer from './bsonSerializer'
import { HUMAN_READABLE } from '../../../constants/environment'

export default function getSerializer(...args) {
    if (HUMAN_READABLE) {
        return new BasicSerializer(args)
    }
    return new BsonSerializer(args)
}