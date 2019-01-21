import BasicSerializer from './basicSerializer'
import BsonSerializer from './bsonSerializer'
import { config } from '../../../constants/configs'

export default function getSerializer(...args) {
    if (config.HUMAN_READABLE) {
        return new BasicSerializer(args)
    }
    return new BsonSerializer(args)
}